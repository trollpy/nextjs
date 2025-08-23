import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  try {
    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
      // Create user in Convex
      await fetchMutation(api.users.create, {
        userId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
        role: 'user', // Default role
      });
    } else if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
      // Update user in Convex
      await fetchMutation(api.users.update, {
        userId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      });
    } else if (eventType === 'user.deleted') {
      const { id } = evt.data;
      
      // Delete user from Convex
      await fetchMutation(api.users.delete, { userId: id });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response('Error occurred', {
      status: 500,
    });
  }

  return NextResponse.json({ success: true });
}
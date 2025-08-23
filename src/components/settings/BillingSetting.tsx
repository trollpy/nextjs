'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Download } from 'lucide-react';

export function BillingSettings() {
  // Mock data - in a real app, this would come from your billing provider
  const subscription = {
    plan: 'Pro',
    status: 'active',
    price: '$29',
    interval: 'month',
    nextBilling: '2024-02-15',
    users: 10,
  };

  const invoices = [
    { id: 'INV-001', date: '2024-01-15', amount: '$29.00', status: 'paid' },
    { id: 'INV-002', date: '2023-12-15', amount: '$29.00', status: 'paid' },
    { id: 'INV-003', date: '2023-11-15', amount: '$29.00', status: 'paid' },
  ];

  const handleManageSubscription = () => {
    // This would open the billing portal
    alert('Redirecting to billing portal...');
  };

  const downloadInvoice = (invoiceId: string) => {
    // This would download the invoice
    alert(`Downloading invoice ${invoiceId}...`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{subscription.plan} Plan</h3>
                <p className="text-muted-foreground">
                  {subscription.price}/{subscription.interval}
                </p>
              </div>
              <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                {subscription.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Users: </span>
                <span className="font-medium">{subscription.users}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Next Billing: </span>
                <span className="font-medium">{subscription.nextBilling}</span>
              </div>
            </div>

            <Button onClick={handleManageSubscription} className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No invoices found.</p>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{invoice.id}</h4>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{invoice.amount}</span>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plan Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Current Plan (Pro)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Unlimited tasks and projects</li>
                <li>• Up to 50 team members</li>
                <li>• Advanced analytics and reporting</li>
                <li>• Custom branding and reports</li>
                <li>• Priority support</li>
                <li>• API access</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Enterprise</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Everything in Pro, plus:</li>
                <li>• Unlimited team members</li>
                <li>• Custom onboarding and training</li>
                <li>• Dedicated account manager</li>
                <li>• SLA guarantees</li>
                <li>• Custom integrations</li>
                <li>• On-premise deployment options</li>
              </ul>
              <Button variant="outline" className="mt-4">
                Contact Sales
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
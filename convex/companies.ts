import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.companyId);
  },
});

export const getByOwner = query({
  args: { ownerId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("companies")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .first();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    logo: v.optional(v.string()),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const companyId = await ctx.db.insert("companies", {
      name: args.name,
      logo: args.logo,
      ownerId: args.ownerId,
      createdAt: Date.now(),
    });
    
    return companyId;
  },
});

export const updateLogo = mutation({
  args: {
    companyId: v.id("companies"),
    logo: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.companyId, { logo: args.logo });
  },
});

export const update = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.companyId, { name: args.name });
  },
});
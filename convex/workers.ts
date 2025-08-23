import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { workerId: v.id("workers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.workerId);
  },
});

export const getByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workers")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workers")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const create = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
    email: v.string(),
    position: v.string(),
    department: v.string(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const workerId = await ctx.db.insert("workers", {
      companyId: args.companyId,
      name: args.name,
      email: args.email,
      position: args.position,
      department: args.department,
      userId: args.userId,
      createdAt: Date.now(),
      isActive: true,
    });
    
    return workerId;
  },
});

export const update = mutation({
  args: {
    workerId: v.id("workers"),
    name: v.string(),
    email: v.string(),
    position: v.string(),
    department: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workerId, {
      name: args.name,
      email: args.email,
      position: args.position,
      department: args.department,
    });
  },
});

export const deactivate = mutation({
  args: { workerId: v.id("workers") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workerId, { isActive: false });
  },
});

export const assignUser = mutation({
  args: {
    workerId: v.id("workers"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workerId, { userId: args.userId });
  },
});
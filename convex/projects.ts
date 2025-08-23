import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) return null;
    
    const manager = await ctx.db.get(project.managerId);
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    return {
      ...project,
      manager,
      tasks,
    };
  },
});

export const getByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .collect();
    
    return await Promise.all(
      projects.map(async (project) => {
        const manager = await ctx.db.get(project.managerId);
        const tasks = await ctx.db
          .query("tasks")
          .withIndex("by_project", (q) => q.eq("projectId", project._id))
          .collect();
        
        return {
          ...project,
          manager,
          taskCount: tasks.length,
          completedTasks: tasks.filter(t => t.status === "completed").length,
        };
      })
    );
  },
});

export const create = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("planning"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("on-hold")
    ),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    managerId: v.id("workers"),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      companyId: args.companyId,
      name: args.name,
      description: args.description,
      status: args.status,
      startDate: args.startDate,
      endDate: args.endDate,
      managerId: args.managerId,
      createdAt: Date.now(),
    });
    
    return projectId;
  },
});

export const update = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("planning"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("on-hold")
    ),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    managerId: v.id("workers"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.projectId, {
      name: args.name,
      description: args.description,
      status: args.status,
      startDate: args.startDate,
      endDate: args.endDate,
      managerId: args.managerId,
    });
  },
});

export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    // First, remove project reference from all tasks
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    await Promise.all(
      tasks.map(task => 
        ctx.db.patch(task._id, { projectId: undefined })
      )
    );
    
    // Then delete the project
    await ctx.db.delete(args.projectId);
  },
});
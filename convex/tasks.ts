import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) return null;
    
    const assignee = await ctx.db.get(task.assigneeId);
    const project = task.projectId ? await ctx.db.get(task.projectId) : null;
    const createdBy = await ctx.db.get(task.createdBy);
    
    return {
      ...task,
      assignee,
      project,
      createdBy,
    };
  },
});

export const getByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .collect();
    
    return await Promise.all(
      tasks.map(async (task) => {
        const assignee = await ctx.db.get(task.assigneeId);
        const project = task.projectId ? await ctx.db.get(task.projectId) : null;
        return { ...task, assignee, project };
      })
    );
  },
});

export const getByAssignee = query({
  args: { assigneeId: v.id("workers") },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_assignee", (q) => q.eq("assigneeId", args.assigneeId))
      .order("desc")
      .collect();
    
    return await Promise.all(
      tasks.map(async (task) => {
        const project = task.projectId ? await ctx.db.get(task.projectId) : null;
        return { ...task, project };
      })
    );
  },
});

export const getByStatus = query({
  args: { 
    companyId: v.id("companies"),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("review"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .filter((q) => q.eq(q.field("status"), args.status))
      .order("desc")
      .collect();
    
    return await Promise.all(
      tasks.map(async (task) => {
        const assignee = await ctx.db.get(task.assigneeId);
        const project = task.projectId ? await ctx.db.get(task.projectId) : null;
        return { ...task, assignee, project };
      })
    );
  },
});

export const create = mutation({
  args: {
    companyId: v.id("companies"),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("review"),
      v.literal("completed")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
    assigneeId: v.id("workers"),
    projectId: v.optional(v.id("projects")),
    dueDate: v.optional(v.number()),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      companyId: args.companyId,
      title: args.title,
      description: args.description,
      status: args.status,
      priority: args.priority,
      assigneeId: args.assigneeId,
      projectId: args.projectId,
      dueDate: args.dueDate,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: args.createdBy,
    });
    
    return taskId;
  },
});

export const update = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("review"),
      v.literal("completed")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
    assigneeId: v.id("workers"),
    projectId: v.optional(v.id("projects")),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      title: args.title,
      description: args.description,
      status: args.status,
      priority: args.priority,
      assigneeId: args.assigneeId,
      projectId: args.projectId,
      dueDate: args.dueDate,
      updatedAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    taskId: v.id("tasks"),
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("review"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const deleteTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId);
  },
});

export const addComment = mutation({
  args: {
    taskId: v.id("tasks"),
    authorId: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("taskComments", {
      taskId: args.taskId,
      authorId: args.authorId,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});

export const getComments = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("taskComments")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .order("asc")
      .collect();
    
    return await Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db.get(comment.authorId);
        return { ...comment, author };
      })
    );
  },
});
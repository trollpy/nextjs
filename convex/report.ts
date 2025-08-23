import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateWeeklyReport = mutation({
  args: {
    companyId: v.id("companies"),
    startDate: v.number(),
    endDate: v.number(),
    generatedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all tasks created or updated in the date range
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .filter((q) => 
        q.and(
          q.gte(q.field("updatedAt"), args.startDate),
          q.lte(q.field("updatedAt"), args.endDate)
        )
      )
      .collect();
    
    // Get all workers
    const workers = await ctx.db
      .query("workers")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
    
    // Calculate statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
    
    // Calculate worker performance
    const workerPerformance = workers.map(worker => {
      const workerTasks = tasks.filter(t => t.assigneeId === worker._id);
      const completed = workerTasks.filter(t => t.status === "completed").length;
      return {
        workerId: worker._id,
        workerName: worker.name,
        totalTasks: workerTasks.length,
        completedTasks: completed,
        completionRate: workerTasks.length > 0 ? (completed / workerTasks.length) * 100 : 0,
      };
    });
    
    // Create report data
    const reportData = {
      period: `Weekly ${new Date(args.startDate).toLocaleDateString()} - ${new Date(args.endDate).toLocaleDateString()}`,
      totalTasks,
      completedTasks,
      inProgressTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      workerPerformance,
      tasksByPriority: {
        urgent: tasks.filter(t => t.priority === "urgent").length,
        high: tasks.filter(t => t.priority === "high").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        low: tasks.filter(t => t.priority === "low").length,
      },
      tasksByStatus: {
        todo: tasks.filter(t => t.status === "todo").length,
        inProgress: tasks.filter(t => t.status === "in-progress").length,
        review: tasks.filter(t => t.status === "review").length,
        completed: tasks.filter(t => t.status === "completed").length,
      },
    };
    
    // Save report
    const reportId = await ctx.db.insert("reports", {
      companyId: args.companyId,
      type: "weekly",
      period: `weekly-${args.startDate}-${args.endDate}`,
      generatedBy: args.generatedBy,
      generatedAt: Date.now(),
      data: reportData,
    });
    
    return reportId;
  },
});

export const generateMonthlyReport = mutation({
  args: {
    companyId: v.id("companies"),
    year: v.number(),
    month: v.number(),
    generatedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const startDate = new Date(args.year, args.month - 1, 1).getTime();
    const endDate = new Date(args.year, args.month, 0).getTime();
    
    // Get all tasks created or updated in the date range
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .filter((q) => 
        q.and(
          q.gte(q.field("updatedAt"), startDate),
          q.lte(q.field("updatedAt"), endDate)
        )
      )
      .collect();
    
    // Get all workers
    const workers = await ctx.db
      .query("workers")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
    
    // Get all projects
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
    
    // Calculate statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
    
    // Calculate worker performance
    const workerPerformance = workers.map(worker => {
      const workerTasks = tasks.filter(t => t.assigneeId === worker._id);
      const completed = workerTasks.filter(t => t.status === "completed").length;
      return {
        workerId: worker._id,
        workerName: worker.name,
        totalTasks: workerTasks.length,
        completedTasks: completed,
        completionRate: workerTasks.length > 0 ? (completed / workerTasks.length) * 100 : 0,
        avgCompletionTime: workerTasks.length > 0 ? 
          workerTasks.reduce((sum, task) => {
            if (task.status === "completed" && task.createdAt && task.updatedAt) {
              return sum + (task.updatedAt - task.createdAt);
            }
            return sum;
          }, 0) / completed : 0,
      };
    });
    
    // Calculate project progress
    const projectProgress = projects.map(project => {
      const projectTasks = tasks.filter(t => t.projectId === project._id);
      const completed = projectTasks.filter(t => t.status === "completed").length;
      return {
        projectId: project._id,
        projectName: project.name,
        totalTasks: projectTasks.length,
        completedTasks: completed,
        completionRate: projectTasks.length > 0 ? (completed / projectTasks.length) * 100 : 0,
      };
    });
    
    // Create report data
    const reportData = {
      period: `Monthly ${args.month}/${args.year}`,
      totalTasks,
      completedTasks,
      inProgressTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      workerPerformance,
      projectProgress,
      tasksByPriority: {
        urgent: tasks.filter(t => t.priority === "urgent").length,
        high: tasks.filter(t => t.priority === "high").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        low: tasks.filter(t => t.priority === "low").length,
      },
      tasksByStatus: {
        todo: tasks.filter(t => t.status === "todo").length,
        inProgress: tasks.filter(t => t.status === "in-progress").length,
        review: tasks.filter(t => t.status === "review").length,
        completed: tasks.filter(t => t.status === "completed").length,
      },
    };
    
    // Save report
    const reportId = await ctx.db.insert("reports", {
      companyId: args.companyId,
      type: "monthly",
      period: `monthly-${args.year}-${args.month}`,
      generatedBy: args.generatedBy,
      generatedAt: Date.now(),
      data: reportData,
    });
    
    return reportId;
  },
});

export const getReports = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reports")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .collect();
  },
});

export const getReport = query({
  args: { reportId: v.id("reports") },
  handler: async (ctx, args) => {
    const report = await ctx.db.get(args.reportId);
    if (!report) return null;
    
    const generatedBy = await ctx.db.get(report.generatedBy);
    return { ...report, generatedBy };
  },
});
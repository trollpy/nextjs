import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define auth tables manually to match what lucia expects
  users: defineTable({
    id: v.string(), // lucia user id
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user"), v.literal("manager")),
    companyId: v.id("companies"),
  })
    .index("byId", ["id"])
    .index("by_email", ["email"])
    .index("by_company", ["companyId"]),

  auth_sessions: defineTable({
    id: v.string(),
    user_id: v.string(),
    expires_at: v.number(),
  })
    .index("byUserId", ["user_id"]),

  auth_keys: defineTable({
    id: v.string(),
    user_id: v.string(),
    hashed_password: v.optional(v.string()),
  })
    .index("byId", ["id"])
    .index("byUserId", ["user_id"]),

  companies: defineTable({
    name: v.string(),
    logo: v.optional(v.string()),
    ownerId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_owner", ["ownerId"]),

  workers: defineTable({
    companyId: v.id("companies"),
    name: v.string(),
    email: v.string(),
    position: v.string(),
    department: v.string(),
    userId: v.optional(v.id("users")),
    createdAt: v.number(),
    isActive: v.boolean(),
  })
    .index("by_company", ["companyId"])
    .index("by_user", ["userId"]),

  projects: defineTable({
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
    createdAt: v.number(),
  })
    .index("by_company", ["companyId"])
    .index("by_manager", ["managerId"]),

  tasks: defineTable({
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
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.id("users"),
  })
    .index("by_company", ["companyId"])
    .index("by_assignee", ["assigneeId"])
    .index("by_project", ["projectId"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"]),

  taskComments: defineTable({
    taskId: v.id("tasks"),
    authorId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  })
    .index("by_task", ["taskId"]),

  taskAttachments: defineTable({
    taskId: v.id("tasks"),
    fileName: v.string(),
    fileUrl: v.string(),
    uploadedBy: v.id("users"),
    uploadedAt: v.number(),
  })
    .index("by_task", ["taskId"]),

  reports: defineTable({
    companyId: v.id("companies"),
    type: v.union(v.literal("weekly"), v.literal("monthly")),
    period: v.string(),
    generatedBy: v.id("users"),
    generatedAt: v.number(),
    data: v.any(),
    pdfUrl: v.optional(v.string()),
  })
    .index("by_company", ["companyId"])
    .index("by_period", ["period"]),

  emailNotifications: defineTable({
    taskId: v.id("tasks"),
    recipientId: v.id("workers"),
    sentAt: v.number(),
    status: v.union(v.literal("sent"), v.literal("failed")),
    messageId: v.optional(v.string()),
  })
    .index("by_task", ["taskId"])
    .index("by_recipient", ["recipientId"]),
});
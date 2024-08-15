
import { mutation } from "./_generated/server";
import { v } from 'convex/values';

// Assuming ctx.db is your database context

export const createTask = mutation({
  args: {
    text: v.string(),
    status: v.boolean(),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert('tasks', { text: args.text, status: args.status });
    return newTaskId;
  },
});

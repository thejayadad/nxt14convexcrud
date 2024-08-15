
import { mutation, query } from "./_generated/server";
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


export const getTask = query({
  handler: async (ctx) => {
    return ctx.db.query("tasks").collect()
  }
})

// export const deleteTask = mutation({
//   args: {
//     taskId: v.string(), // Ensure this is v.string()
//   },
//   handler: async (ctx, args) => {
//     console.log(`Deleting task with args: ${JSON.stringify(args)}`);
//     await ctx.db.delete('tasks', args.taskId); // Use string ID
//   },
// });
'use client'
// pages/index.tsx (or components/Home.js if using that file)

'use client'
import { useState } from "react"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"

export default function Home() {
  const [text, setText] = useState("")
  const [status, setStatus] = useState(false) // Default status is false
  const createTask = useMutation(api.task.createTask)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return; // Prevent adding empty tasks

    try {
      const newTaskId = await createTask({ text, status });
      console.log(`New task added with ID: ${newTaskId}`);
      setText(''); // Clear input field
      setStatus(false); // Reset status
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto max-w-screen-md p-4 w-full items-center justify-center flex flex-col h-screen">
        <h2 className="text-2xl font-bold text-neutral-700">Add Task</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            placeholder="Task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full outline-none"
          />
          <div className="flex items-center">
            <label className="mr-2">Completed</label>
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </div>
          <button
            type="submit"
            className="bg-slate-500 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

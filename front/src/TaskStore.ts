import { create } from 'zustand'
import { createTodo, getTodos, removeTodo, Task, updateTodo } from './Api'


interface TaskStore {
    tasks: Task[]
    loading: boolean,
    error: string | null,
    fetchTasks: () => Promise<void>
    addTask: (newTask: Omit<Task, 'id'>) => Promise<void>
    changeTaskCompleted: (changedTask: Task) => Promise<void>
    deleteTask: (id: number)=>Promise<void>
}

export const useStore = create<TaskStore>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    fetchTasks: async () => {
        set({ loading: true })
        try {
            const fetchedTasks = await getTodos()
            set({ tasks: fetchedTasks })
        } catch (e: any) {
            set({ error: e.toString() })
        } finally {
            set({ loading: false })
        }
    },
    addTask: async (newTask: Omit<Task, 'id'>) => {
        try {
            const createdTask = await createTodo(newTask)
            set({ tasks: [...get().tasks, createdTask] })
        } catch (e) { }
    },
    changeTaskCompleted: async (changedTask: Task) => {
        try {
            const { id, ...rest } = changedTask
            const createdTask = await updateTodo(id, rest)
            const tasks = get().tasks.map((t) => t.id === id ? createdTask : t)
            set({ tasks })
        } catch (e) { }
    },
    deleteTask: async (id: number) => {
        try {
            const deletedTask = await removeTodo(id)
            set({ tasks: get().tasks.filter(v => v.id !== deletedTask.id) })
        } catch (e) { }
    },
}))

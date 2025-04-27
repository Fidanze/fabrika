
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/tasks/',
    timeout: 10000,
})

export type Task = {
    id: number,
    title: string,
    completed: boolean
}

export const createTodo = async (data: Omit<Task, 'id'>): Promise<Task> => {
    const res = await axiosInstance.post('', data)
    return res.data.result
}

export const getTodos = async (): Promise<Task[]> => {
    const res = await axiosInstance.get('')
    return res.data.result.tasks
}

export const updateTodo = async (id: number, data: Partial<Omit<Task, 'id'>>): Promise<Task> => {
    const res = await axiosInstance.patch(`${id}`, data)
    return res.data.result
}

export const removeTodo = async (id: number): Promise<Task> => {
    const res = await axiosInstance.delete(`${id}`)
    return res.data.result
}

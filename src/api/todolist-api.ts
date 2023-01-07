import axios from "axios";

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'f70837cd-3266-40ee-8e3e-f20fa8f9bbe6'
    }
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('/todo-lists')
            .then(res => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
            .then(res => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
            .then(res => res.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
            .then(res => res.data)
    },
}


type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}
type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<GetTaskType>(`/todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, taskData: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, taskData)
            .then(res => res.data)
    }
}
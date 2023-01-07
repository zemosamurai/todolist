import React, {useState} from 'react'
import {taskAPI} from "../api/todolist-api";

export default {
    title: 'API/TaskAPI'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')

    const getTask = () => {
        taskAPI.getTask(todoId)
            .then(res => setState(res.items))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'TodolistId'}
                value={todoId}
                onChange={(e) => {
                    setTodoId(e.currentTarget.value)
                }}
            />
            <button onClick={getTask}>Get Task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [title, setTitle] = useState('')

    const CreateTask = () => {
        taskAPI.createTask(todoId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'TodolistId'}
                value={todoId}
                onChange={(e) => setTodoId(e.currentTarget.value)}
            />
            <input
                placeholder={'Title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={CreateTask}>Create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTask = () => {
        taskAPI.deleteTask(todoId, taskId)
            .then(res => setState(res))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'TodolistId'}
                value={todoId}
                onChange={(e) => setTodoId(e.currentTarget.value)}
            />
            <input
                placeholder={'TaskId'}
                value={taskId}
                onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [title, setTitle] = useState('')

    const taskData = {
        title,
        description: '',
        completed: false,
        status: 0,
        priority: 1,
        startDate: '2022-01-07T12:12:37.507',
        deadline: '2024-01-07T12:12:37.507',
    }


    const updateTask = () => {
        taskAPI.updateTask(todoId, taskId, taskData)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'TodolistId'}
                value={todoId}
                onChange={(e) => setTodoId(e.currentTarget.value)}
            />
            <input
                placeholder={'TaskId'}
                value={taskId}
                onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <input
                placeholder={'Title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTask}>Update task</button>
        </div>
    </div>
}


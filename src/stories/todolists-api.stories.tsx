import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API/TodolistAPI'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => setState(res))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const createTodoList = () => {
        todolistAPI.createTodolist(title)
            .then(res => setState(res))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'Title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={createTodoList}>Create todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')

    const deleteTodoList = () => {
        todolistAPI.deleteTodolist(todoId)
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
            <button onClick={deleteTodoList}>Delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')
    const [title, setTitle] = useState('')

    const updateTodoList = () => {
        todolistAPI.updateTodolist(todoId, title)
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
                placeholder={'New Title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTodoList}>Update todolist</button>
        </div>
    </div>
}


import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: Array<TodolistType> = []

export const todolistReducer = (state= initialState, action: ReducersActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.todoId, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        default: return state
    }
}


type ReducersActionsType = RemoveTodoListACType | AddTodoListACType | ChangeFilterACType | ChangeTodolistTitleACType

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const

}

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todoId: v1()
        }
    } as const

}

type ChangeFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}
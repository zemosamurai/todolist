import {TasksStateType, TodolistType} from "../App";
import {addTodoListAC, TodolistReducer} from "./todolist-reducer";
import {TasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoId)
    expect(idFromTodolists).toBe(action.payload.todoId)
})

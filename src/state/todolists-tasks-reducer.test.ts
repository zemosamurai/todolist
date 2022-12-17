import {TasksStateType, TodolistType} from "../App";
import {addTodoListAC, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todoId)
    expect(idFromTodoLists).toBe(action.payload.todoId)
})

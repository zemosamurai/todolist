import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    TodolistReducer
} from "./todolist-reducer";

test('should be remove todolist', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let startTate: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let endState = TodolistReducer(startTate, removeTodoListAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("What to learn")

})

test('should be added todolist', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = 'What to title'

    let startTate: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let endState = TodolistReducer(startTate, addTodoListAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)

})

test('should be filtered todolist', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newFilter: FilterValuesType = 'completed'

    let startTate: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let endState = TodolistReducer(startTate, changeFilterAC(todolistId2, newFilter))

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newFilter)
})

test('should be change todolist title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = 'NewTitle'

    let startTate: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let endState = TodolistReducer(startTate, changeTodolistTitleAC(todolistId1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe("What to buy")

})
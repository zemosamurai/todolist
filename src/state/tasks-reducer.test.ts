import {v1} from "uuid";
import { TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC} from "./todolist-reducer";

test('should be remove tasks', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskId1 = v1()
    let taskId2 = v1()

    let startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    let endState = TasksReducer(startState, removeTaskAC(taskId1, todolistId1))

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1][0].title).toBe("JS")
})

test('should be added new task', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskId1 = v1()
    let taskId2 = v1()

    let newTitle = 'Hello World'

    let startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    let endState = TasksReducer(startState, addTaskAC(newTitle, todolistId1))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('Hello World')
    expect(endState[todolistId1][1].title).toBe("HTML&CSS")
    expect(endState[todolistId2].length).toBe(2)
})

test('should change task status', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskId1 = v1()
    let taskId2 = v1()


    let startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    let endState = TasksReducer(startState, changeTaskStatusAC(todolistId1, taskId1, false))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe('HTML&CSS')
    expect(endState[todolistId1][0].isDone).toBe(false)
})

test('should be changes task title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskId1 = v1()
    let taskId2 = v1()

    let newTitle = 'Js and Css'

    let startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    let endState = TasksReducer(startState, changeTaskTitleAC(todolistId1, taskId2, newTitle))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe('HTML&CSS')
    expect(endState[todolistId1][1].title).toBe('Js and Css')
    expect(endState[todolistId1][0].isDone).toBe(true)
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodoListAC('new todolist')

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodoListAC('todolistId2')

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})



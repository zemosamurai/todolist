import {v1} from "uuid";
import { TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "./tasks-reducer";

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



import {TasksStateType} from "../AppWithReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: '3', title: 'React', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: '3', title: 'React', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.Completed,
                todoListId: 'todoListId_1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC('todolistId2', 'juce')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].completed).toBe(false)
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2', '2', false)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].completed).toBeFalsy()
    expect(endState['todolistId2'][1].completed).toBeFalsy()
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('todolistId2', '2', 'Hello world')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Hello world')
    expect(endState['todolistId2'].length).toBe(3)
})

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC('new todolist')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})




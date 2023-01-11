import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import {legacy_createStore as createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistReducer} from "../../state/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistReducer,
})

const initialGlobalState = {
    todoLists: [
        {id: 'todoListId_1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todoListId_2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todoListId_1']: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
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
                id: v1(),
                title: "JS & ES6",
                status: TaskStatuses.Completed,
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
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
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
        ['todoListId_2']: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: 'todoListId_2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: "Bread",
                status: TaskStatuses.Completed,
                todoListId: 'todoListId_2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: "Water",
                status: TaskStatuses.New,
                todoListId: 'todoListId_2',
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
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>)


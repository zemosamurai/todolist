import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: false}
        ]
    })

    //
    const removeTask = (taskId: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId] // Находим по id конкретный массив тасок
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter(task => task.id !== taskId) // Результат фильтрации в котором удаляем таску
        const copyTasks = {...tasks} // делаем копию стэйта тасок
        copyTasks[todoListId] = resultOfUpdate // а теперь в копию по id положим новый массив
        setTasks(copyTasks) // засетаем копию

        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
        // результат рефакторинга первого варианта
    }
    const addTask = (title: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]

        const newTask: TaskType = {
            id: v1(),
            title, // title: title
            isDone: false
        }

        const resultOfUpdate: Array<TaskType> = [newTask, ...tasksForUpdate]
        const copyTasks: TasksStateType = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        // setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        const copyTasks: TasksStateType = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        // setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
        // {...tl, filter: filter} сначало делаем копию tl а потом перезатираем св-во filter
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId)) // удаляем Тудулист
        delete tasks[todoListId] // так же удаляем таски этого Тудулиста
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks

        if (filterValue === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }


    const todoListsComponents = todoLists.length
        ? todoLists.map(tl => {
            const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
            return (
                <TodoList
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    filter={tl.filter}

                    addTask={addTask}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTaskStatus={changeTaskStatus}
                />
            )
        })
        : <span>Create your first Todolist!!!</span>


    //GUI:
    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;


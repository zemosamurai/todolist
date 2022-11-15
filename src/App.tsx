import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title, // title: title
            isDone: false
        }

        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
        // {...tl, filter: filter} сначало делаем копию tl а потом перезатираем св-во filter
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
    const addTodoList = (newTitle: string) => {
        let newTodoListId = v1()
        let newTodoList: TodolistType = {id: newTodoListId, title: newTitle, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId)) // удаляем Тудулист
        delete tasks[todoListId] // так же удаляем таски этого Тудулиста
    }
    const editTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: newTitle} :el)})
    }
    const editTodoListTitle = (todoListId: string, newTitle: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, title: newTitle} :el))
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
                    editTaskTitle={editTaskTitle}
                    editTodoListTitle={editTodoListTitle}
                />
            )
        })
        : <span>Create your first Todolist!!!</span>


    //GUI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;


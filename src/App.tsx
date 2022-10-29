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

// Read => part, pagination, filtration, sort

function App() {
    //BLL:
    const TodoListTitle: string = "What to learn"
    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')

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

    const filteredTasks = getFilteredTasks(tasksForTodoList, filter)


    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskId: string) => {
        setTasksForTodoList(tasksForTodoList.filter(task => task.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), // пакет который генирирует id v1()
            title,           // title: title
            isDone: false
        }
        setTasksForTodoList([newTask, ...tasksForTodoList])
    }


    //GUI:
    return (
        <div className="App">
            <TodoList
                title={TodoListTitle}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;


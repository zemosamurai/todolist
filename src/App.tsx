import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    //BLL:
    const TodoListTitle: string = "What to learn"
    const tasksForTodoList: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS & ES6", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    //GUI:
    return (
        <div className="App">
            <TodoList
                title={TodoListTitle}
                tasks={tasksForTodoList}
            />
        </div>
    );
}

export default App;


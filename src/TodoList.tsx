import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        }
        setTitle('')
    }

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()


    const tasksList = props.tasks.length
        ? <ul>
            {props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })
            }</ul>
        : <span>Your lis is empty</span>


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onKeyDownEnterAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={onClickHandlerCreator('all')}>All</button>
                <button onClick={onClickHandlerCreator('active')}>Active</button>
                <button onClick={onClickHandlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
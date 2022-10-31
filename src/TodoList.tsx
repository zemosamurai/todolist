import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle('')
    }

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()


    const tasksList = props.tasks.length
        ? <ul>
            {props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
                return (
                    <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatus}
                        />
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
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: 'red'}}>Title is required</div>}
            </div>
            {tasksList}
            <div>
                <button className={props.filter === 'all' ? 'btnActive' : ''}
                        onClick={onClickHandlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'btnActive' : ''}
                        onClick={onClickHandlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btnActive' : ''}
                        onClick={onClickHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
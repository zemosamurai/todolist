import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const tasksJSXItemList = props.tasks.length
        ? <ul>
            {props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
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

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }

        setTitle('')
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const removeTodoList = () => props.removeTodoList(props.todoListId)


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
            {tasksJSXItemList}
            <div>
                <button className={props.filter === 'all' ? 'btnActive' : ''}
                        onClick={onClickFilterHandlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'btnActive' : ''}
                        onClick={onClickFilterHandlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btnActive' : ''}
                        onClick={onClickFilterHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
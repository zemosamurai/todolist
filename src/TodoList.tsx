import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    editTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    editTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemList = props.tasks.length
        ? <ul>
            {props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                const editTaskTitle = (newTitle: string) => {
                    props.editTaskTitle(props.todoListId, task.id, newTitle)
                }

                return (
                    <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatus}
                        />
                        <EditableSpan title={task.title} callBack={editTaskTitle}/>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })
            }</ul>
        : <span>Your lis is empty</span>

    const onClickFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const addTask = (newTitle: string) => {
        props.addTask(newTitle, props.todoListId)
    }
    const editTodoListTile = (newTitle: string) => {
        props.editTodoListTitle(props.todoListId, newTitle)
    }

    return (
        <div>
            <h3>
                 <EditableSpan title={props.title} callBack={editTodoListTile}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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



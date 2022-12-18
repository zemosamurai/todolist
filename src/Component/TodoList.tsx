import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {AddItemForm} from "./AddItemForm";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (todoListId: string, filter: FilterValuesType) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const onClickFilterHandler = (filter: FilterValuesType) => {
        props.changeTodoListFilter(props.todoListId, filter)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const onAddTask = (newTitle: string) => {
        props.addTask(props.todoListId, newTitle)
    }
    const onChangeTodoListTile = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={onChangeTodoListTile}/>
                <IconButton onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={onAddTask}/>
            <ul>
                {props.tasks.map((task) => {
                    const onRemoveTask = () => {
                        props.removeTask(props.todoListId, task.id)
                    }
                    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)
                    }
                    const onChangeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.todoListId, task.id, newTitle)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <Checkbox
                                checked={task.isDone}
                                onChange={onChangeTaskStatus}
                                size='small'
                                color='primary'
                            />
                            <EditableSpan title={task.title} changeTitle={onChangeTaskTitle}/>
                            <button onClick={onRemoveTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    onClick={() => onClickFilterHandler('all')}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    size="small"
                >All</Button>
                <Button
                    onClick={() => onClickFilterHandler('active')}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    size="small"
                >Active</Button>
                <Button
                    onClick={() => onClickFilterHandler('completed')}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    size="small"
                >Completed</Button>
            </div>
        </div>
    );
};


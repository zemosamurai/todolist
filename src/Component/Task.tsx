import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../AppWithRedux";

type TaskPropsType = {
    todoListId: string
    task: TaskType
    removeTask: (todoListId: string, taskId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
}

export const Task = memo((props: TaskPropsType) => {
    const onRemoveTask = () => {
        props.removeTask(props.todoListId, props.task.id)
    }
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListId, props.task.id, e.currentTarget.checked)
    }
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todoListId, props.task.id, newTitle)
    },[props.changeTaskTitle, props.todoListId, props.task.id])

    return (
        <li className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox
                checked={props.task.isDone}
                onChange={onChangeTaskStatus}
                size='small'
                color='primary'
            />
            <EditableSpan title={props.task.title} changeTitle={onChangeTaskTitle}/>
            <button onClick={onRemoveTask}>x</button>
        </li>
    )
})


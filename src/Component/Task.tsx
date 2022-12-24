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

export const Task = memo(({todoListId, task, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {

    const onRemoveTask = () => removeTask(todoListId, task.id)
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListId, task.id, e.currentTarget.checked)
    }
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todoListId, task.id, newTitle)
    }, [changeTaskTitle, todoListId, task.id])

    return (
        <li className={task.isDone ? 'isDone' : ''}>
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
})


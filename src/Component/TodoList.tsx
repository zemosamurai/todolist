import React, {memo, useCallback} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";


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

export const TodoList = memo((props: TodoListPropsType) => {
    console.log('TodoList')
    const onClickFilterHandler = useCallback((filter: FilterValuesType) => {
        props.changeTodoListFilter(props.todoListId, filter)
    }, [props.changeTodoListFilter, props.todoListId])
    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todoListId)
    }, [props.removeTodoList, props.todoListId])
    const onAddTask = useCallback((newTitle: string) => {
        props.addTask(props.todoListId, newTitle)
    }, [props.addTask, props.todoListId])
    const onChangeTodoListTile = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }, [props.changeTodoListTitle, props.todoListId])

    let filteredTasks = props.tasks
    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter(el => el.isDone)
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
                {
                    filteredTasks.map((el) => <Task
                        key={el.id}
                        todoListId={props.todoListId}
                        task={el}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                    />)
                }
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
})



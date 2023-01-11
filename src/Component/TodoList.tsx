import React, {memo, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";
import {TaskType} from "../api/todolist-api";
import {FilterValuesType} from "../state/todolist-reducer";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, completed: boolean) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (todoListId: string, filter: FilterValuesType) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const TodoList = memo((props: TodoListPropsType) => {
    const {
        todoListId, title, tasks, filter, removeTask, addTask, changeTaskTitle,
        changeTaskStatus, removeTodoList, changeTodoListFilter, changeTodoListTitle
    } = props

    const onClickFilterHandler = useCallback((filter: FilterValuesType) => {
        changeTodoListFilter(todoListId, filter)
    }, [changeTodoListFilter, todoListId])
    const onRemoveTodoList = useCallback(() => {
        removeTodoList(todoListId)
    }, [removeTodoList, todoListId])
    const onAddTask = useCallback((newTitle: string) => {
        addTask(todoListId, newTitle)
    }, [addTask, todoListId])
    const onChangeTodoListTile = useCallback((newTitle: string) => {
        changeTodoListTitle(todoListId, newTitle)
    }, [changeTodoListTitle, todoListId])

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(el => !el.completed)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(el => el.completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={onChangeTodoListTile}/>
                <IconButton onClick={onRemoveTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={onAddTask}/>
            <ul>
                {
                    filteredTasks.map((el) => <Task
                        key={el.id}
                        todoListId={todoListId}
                        task={el}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTask={removeTask}
                    />)
                }
            </ul>
            <div>
                <Button
                    onClick={() => onClickFilterHandler('all')}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size="small"
                >All</Button>
                <Button
                    onClick={() => onClickFilterHandler('active')}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    size="small"
                >Active</Button>
                <Button
                    onClick={() => onClickFilterHandler('completed')}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    size="small"
                >Completed</Button>
            </div>
        </div>
    );
})



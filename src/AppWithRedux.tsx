import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./Component/TodoList";
import {AddItemForm} from "./Component/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolist-api";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [])
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [])
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, completed: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, completed))
    }, [])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
    }, [])

    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }, [])
    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [])
    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoListId, newTitle))
    }, [])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '30px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoLists.map(el => {
                        let filteredTasks = tasks[el.id]

                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: '15px'}}>
                                    <TodoList
                                        todoListId={el.id}
                                        title={el.title}
                                        tasks={filteredTasks}
                                        filter={el.filter}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        removeTodoList={removeTodoList}
                                        changeTodoListFilter={changeTodoListFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


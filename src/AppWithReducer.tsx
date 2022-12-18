import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./Component/TodoList";
import {v1} from "uuid";
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
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function AppWithReducer() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: false}
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))

    }
    const addTask = (todoListId: string, title: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todoListId, taskId, isDone))
    }
    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchTasks(changeTaskTitleAC(todoListId,taskId, newTitle))
    }

    const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatchTodoLists(changeTodoListFilterAC(todoListId, filter))
    }
    const addTodoList = (newTitle: string) => {
        let action = addTodoListAC(newTitle)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const removeTodoList = (todoListId: string) => {
        dispatchTodoLists(removeTodoListAC(todoListId))
        dispatchTasks(removeTodoListAC(todoListId))
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatchTodoLists(changeTodolistTitleAC(todoListId, newTitle))
    }


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

                        if (el.filter === 'active') {
                            filteredTasks = filteredTasks.filter(el => !el.isDone)
                        }
                        if (el.filter === 'completed') {
                            filteredTasks = filteredTasks.filter(el => el.isDone)
                        }
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

export default AppWithReducer;


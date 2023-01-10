import React, {useState} from 'react';
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
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolist-reducer";


export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: "JS & ES6",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                todoListId: todoListId_1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            }
        ],
        [todoListId_2]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: "Bread",
                status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: "Water",
                status: TaskStatuses.New,
                todoListId: todoListId_2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: false
            }
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }
    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            status: TaskStatuses.New,
            todoListId: todoListId,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: '',
            completed: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (todoListId: string, taskId: string, completed: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, completed: completed} : t)
        })
    }
    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const addTodoList = (newTitle: string) => {
        let newTodoListId = v1()
        let newTodoList: TodolistDomainType = {
            id: newTodoListId,
            title: newTitle,
            filter: 'all',
            addedDate: '',
            order: 0
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, title: newTitle} : el))
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
                            filteredTasks = filteredTasks.filter(el => !el.completed)
                        }
                        if (el.filter === 'completed') {
                            filteredTasks = filteredTasks.filter(el => el.completed)
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

export default App;


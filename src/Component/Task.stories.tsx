import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    },

} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
export const TaskStorycompleted = Template.bind({});
TaskStorycompleted.args = {
    task: {
        id: '1', title: 'css', status: TaskStatuses.Completed,
        todoListId: 'todoListId_1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        completed: true
    },
    todoListId: 'todoId1',
};

export const TaskStoryNotcompleted = Template.bind({});
TaskStoryNotcompleted.args = {
    task: {
        id: '2', title: 'js', status: TaskStatuses.Completed,
        todoListId: 'todoListId_1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        completed: true
    },
    todoListId: 'todoId2',
};

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({
        id: '2', title: 'css', status: TaskStatuses.Completed,
        todoListId: 'todoListId_1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        completed: true
    })
    const removeTask = () => setTask({} as TaskType)
    const changeTaskStatus = () => {
        setTask({...task, completed: !task.completed})
    }
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => setTask({...task, title})
    return <Task
        task={task}
        todoListId={'todoId1'}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
    />
};

export const TaskStoryBase = Template1.bind({});


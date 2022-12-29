import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskType} from "../AppWithRedux";

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
export const TaskStoryIsDone = Template.bind({});
TaskStoryIsDone.args = {
    task: {id: '1', title: 'css', isDone: true},
    todoListId: 'todoId1',
};

export const TaskStoryNotIsDone = Template.bind({});
TaskStoryNotIsDone.args = {
    task: {id: '2', title: 'js', isDone: false},
    todoListId: 'todoId2',
};

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '2', isDone: false, title: 'css'})
    const removeTask = () => setTask({} as TaskType)
    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
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


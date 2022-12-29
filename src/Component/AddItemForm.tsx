import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
export const AddItemForm = memo(({addItem}: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAddTask = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        if (e.key === 'Enter') {
            onAddTask()
        }
    }
    return (
        <div>
            <TextField
                size='small'
                label={error ? 'enter correct value' : 'enter title'}
                color={error ? 'error' : 'primary'}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <Button
                style={{maxWidth: '40px', maxHeight: '40px', minHeight: '40px', minWidth: '40px'}}
                variant='contained'
                onClick={onAddTask}
            >+</Button>
        </div>
    )
})
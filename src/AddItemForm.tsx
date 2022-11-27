import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle('')
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddTask}
                // className={error ? 'error' : ''}
                label={error ? 'enter correct value' : "enter your title"}
                variant="outlined"
                color={error ? 'error' : 'primary'}
                size='small'
            />
            <Button
                onClick={onClickAddTask}
                variant='contained'
                color='primary'
                style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
            >+</Button>
        </div>
    )
}
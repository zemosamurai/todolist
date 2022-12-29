import React, {ChangeEvent, memo, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan = memo(({title, changeTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const onViewMode = () => {
        setEditMode(false)
        changeTitle(value.trim())
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return editMode
        ? <input value={value} onChange={onChangeHandler} onBlur={onViewMode} autoFocus/>
        : <span onDoubleClick={onEditMode}>{title}</span>
})
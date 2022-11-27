import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => {
        setEditMode(false)
        props.callBack(title)
    }

    return editMode
        ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}
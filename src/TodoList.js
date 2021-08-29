import React, { useEffect, useRef, useState } from "react"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"

export const TodoList = ({data, deleteItem}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [curentItemID, setCurrentItemID] = useState("")
    const [newText, setNewText] = useState("")

    const showInput = (id) => {
        setCurrentItemID(id)
        setIsEditing(true)
    }
    
    const editItem = (id) => {
        const specificItem = data.find(item => item.id === id)
        specificItem.text = newText
        console.log(specificItem.text)
    }

    return <section className="todo-list">  
        {data.map((item,) => {
            const {id, title, text} = item
            return <div key={id} className="todo-item">
                <header className="item-header">
                    <h1 className="title">{title}</h1>
                    <div className="btns">
                        <button className="edit-btn" 
                            onClick={() => showInput(id)} >
                            <AiFillEdit />
                        </button>
                        <button className="delete-btn" 
                            onClick={() => deleteItem(id)}>
                            <AiFillDelete />
                        </button>
                    </div>
                </header>
                {isEditing && id===curentItemID ? 
                            (<form onSubmit={() => editItem(id)}>
                                <input value={text} 
                                    onChange={(e) => setNewText(e.target.value)} />
                                <button type="submit">Save</button>
                            </form>) 
                          : (<p className="text">{text}</p>)}
            </div>
        })}
    </section>
}


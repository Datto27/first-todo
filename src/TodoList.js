import React, { useEffect, useRef, useState } from "react"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import { useGlobalContext } from "./context"

export const TodoList = ({data, deleteItem}) => {
    const {editItem, isEditing, setIsEditing,
            isActive, setIsActive} = useGlobalContext()
    const [curentItemID, setCurrentItemID] = useState("")
    const [selectItemID, setSelectItemID] = useState("")
    const [newText, setNewText] = useState("")
    const textHeightRef = useRef(null)
    // se function achvenebs mxolod axali inputis form-s da moaqvs curent itemis value(text)
    const showInput = (id) => {
        setCurrentItemID(id)
        setIsEditing(!isEditing)
        // send a new text to context
        const specificItem = data.find(item => item.id === id)
        setNewText(specificItem.text)
    }

    useEffect(() => {
        // console.log(todoItemRef.current.getBoundingClientRect().height)
    }, [isEditing])

    return <section className="todo-list">
        {data.map((item,) => {
            const {id, title, text} = item
            return <div key={id} className="todo-item">
                    <header className="item-header">
                        <h1 className="title"
                            onClick={() => setSelectItemID(selectItemID ? null:id)}>
                                {title}</h1>
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
                    {<div className={`item-content ${selectItemID===id && "show-text"}`} 
                        ref={textHeightRef}>
                        {isEditing && id===curentItemID ? 
                                    (<form onSubmit={() => editItem(id, newText)}>
                                        <textarea className="new-input" value={newText} 
                                            onChange={(e) => setNewText(e.target.value)}></textarea>
                                        <button className="save-btn" type="submit">
                                            Save
                                        </button>
                                    </form>)
                                    : (<p className="text">{text}</p>)
                        }
                    </div>}
                    {console.log(selectItemID, id)}
                    
                    {/* pirvel rigshi amotsmebs aris tu ara todo item actiuri, id-is sashualebit ( achvenebs <p> an "" )
                        shemdeg amotsmebs editi chartulia tu ara shesabamisi itemistvis
                        tu chartulia achvenebs <form>-s tu ara da <p>-s */}
                    {/* {isActive && id===curentItemID ? isEditing && id===curentItemID ? 
                                (<form onSubmit={() => editItem(id, newText)}>
                                    <textarea className="new-input" value={newText} 
                                        onChange={(e) => setNewText(e.target.value)}></textarea>
                                    <button className="save-btn" type="submit">
                                        Save
                                    </button>
                                </form>) 
                                :(<p className="text">{text}</p>)
                            : ""
                    } */}
            </div>
        })}
    </section>
}


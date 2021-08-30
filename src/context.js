import React, { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const  AppProvider = ({ children }) => {
    const getData = () => {
        const localData = localStorage.getItem("myData")
        return localData ? JSON.parse(localData) : []
    }
    const [data, setData] = useState(getData)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [isActive, setIsActive] = useState(false)

    // itemis daediteba
    const editItem = (id, newText) => {
        const specificItem = data.find(item => item.id === id)
        specificItem.text = newText
        // console.log(specificItem.text)
        setData([...data])
        setIsEditing(false)
        setIsActive(false)
    }

    return (
        <AppContext.Provider value={{
            getData,
            data, setData,
            title, setTitle,
            text, setText,
            editItem,
            isEditing, setIsEditing,
            isActive, setIsActive
        }} >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

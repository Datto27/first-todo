import React, { useState, useEffect } from "react";
import { TodoList } from "./TodoList";

const getData = () => {
  const localData = localStorage.getItem("myData")
  return localData ? JSON.parse(localData) : []
}

function App() {
  const [data, setData] = useState(getData)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    setData([...data, {id: new Date().getTime().toString(), 
                      title, text}])
    setTitle('')
    setText("")
  }
  // delete item. aq imitomaa, rom setData gamovikheno
  const deleteItem = (id) => {
    const newData = data.filter(item => item.id !== id)
    localStorage.setItem("myData", [...newData])
    setData(newData)
  }
  // set data for local storage
  useEffect(() => {
    // use local storage
    localStorage.setItem("myData", JSON.stringify(data))
    console.log(data)
  }, [data])

  return (
    <main className="main-section">
      <form className="todo-form" onSubmit={handleSubmit} >
        <input className="title-input" placeholder="title" value={title} 
          onChange={(e) => setTitle(e.target.value)}/>
        <textarea className="text-input" placeholder="text..." value={text}
          onChange={(e) => setText(e.target.value)}></textarea>
        <button type="submit" className="add-btn">Add</button>
      </form>
      <TodoList data={data} deleteItem={deleteItem} />
    </main>
  );
}

export default App;
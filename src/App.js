import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import { TodoList } from "./TodoList";
import logo from "./yourNote.svg"

function App() {
  const {data, setData,
        title, setTitle,
        text, setText} = useGlobalContext()
  
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
    // console.log(data)
  }, [data])

  return (
    <main className="main-section">
      <img className="main-title" src={logo} alt="logo" />
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
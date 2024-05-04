import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider( {children} ) {

    const {
        Item: todos, 
        saveItem: saveTodos,
        loading,
        error
      } = useLocalStorage("TODOS_V1",[]);
    
      const [searchValue, setSearchValue] = React.useState('');
      
      const [openModal, setOpenModal] = React.useState(false);
    
      const completedTodos = todos.filter(todo => !!todo.completed).length;
      const totalTodos = todos.length;
    
      const filteredTodos = todos.filter((todo) => { 
        return todo.text.toLowerCase().includes(searchValue.toLowerCase())
    
      });
    
      const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => todo.text === text)
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
      }
      const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => todo.text === text)
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
      }
      const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
          text,
          completed: false
        });
        saveTodos(newTodos);
      }

    return (
        <TodoContext.Provider value={
          {
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            filteredTodos,
            setSearchValue,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo
          }
        }>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider };

// const todos = [
//   {text: 'Levantarme', completed: false},
//   {text: 'Hacer oficio', completed: false},
//   {text: 'Revisar correo', completed: false},
//   {text: 'Asistir a una reunion', completed: false},
//   {text: 'Almorzar', completed: false},
//   {text: 'Mirar por la ventana', completed: false},
//   {text: 'Descansar', completed: false},
//   {text: 'Estudiar', completed: false},
//   {text: 'Estudiar 2.0', completed: false}
// ]
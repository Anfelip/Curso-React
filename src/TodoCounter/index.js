import React from 'react';
import './TodoCounter.css'
import { TodoContext } from '../TodoContext';
function TodoCounter() {
    const {
        completedTodos: completed,
        totalTodos: total
    } = React.useContext(TodoContext);
    return(
        <h1 className='TodoCounter'>
            Has completado <span>{completed}</span> de <span>{total}</span> To Do
        </h1>
    );
}
export {TodoCounter};
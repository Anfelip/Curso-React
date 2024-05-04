import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoList } from '../TodoList';
import { TodoSearch } from '../TodoSearch';
import {TodoCounter} from '../TodoCounter';
import {TodosLoading} from '../TodosLoading';
import {TodosError} from '../TodosError';
import {EmptyTodos} from '../EmptyTodos';
import React from 'react';
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import {TodoForm} from '../TodoForm'


function AppUI () {

  const {
    loading,
    error,
    filteredTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TodoCounter/>
      <TodoSearch/>
        <TodoList>
          {loading && (
            <>
              <TodosLoading/>
              <TodosLoading/>
              <TodosLoading/>
              <TodosLoading/>
            </>
          )}
          {error && <TodosError/>}
          {(!loading && filteredTodos.length === 0) && <EmptyTodos/>}

          {filteredTodos.map(todo => (
            <TodoItem 
              key = {todo.text} 
              text = {todo.text}
              completed = {todo.completed}
              onComplete = {() => completeTodo(todo.text)}
              onDelete = {() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>
      <CreateTodoButton
        setOpenModal = {setOpenModal}
      />
      {openModal && (
        <Modal>
          <TodoForm/>
        </Modal>
      )}
    </React.Fragment>
  );
}

export {AppUI};
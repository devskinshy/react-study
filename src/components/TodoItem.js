import React from 'react';

const TodoItem = ({todo, onToggle, onRemove}) => {
  const onChecked = e => {
    onToggle(todo.id)
  }
  const onDelete = e => {
    onRemove(todo.id);
  }
  return (
    <div>
      <input type='checkbox' checked={todo.done} onClick={onChecked} readOnly={true}/>
      <span>{todo.text}</span>
      <button onClick={onDelete}>delete</button>
    </div>
  );
};

export default TodoItem;

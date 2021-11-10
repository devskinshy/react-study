import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useCallback, useReducer, useRef, useState } from 'react';

const createBulkTodos = () => {
  const arr = [];
  for(let id = 1, limit = 2500; id <= limit; id ++) {
    arr.push({
      id,
      text: `할 일 ${id}`,
      checked: false,
    })
  }

  return arr;
}

const TodoReducer = (todos, action) => {
  switch (action.type) {
    case 'INSERT':
      // return [...todos, action.todo];
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo);
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos);
  const [todos, dispatch] = useReducer(TodoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    // setTodos(todos => todos.concat(todo));
    dispatch({type: 'INSERT', todo});
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    // setTodos(todos => todos.filter(todo => todo.id !== id));
    dispatch({type: 'REMOVE', id});
  }, []);

  const onToggle = useCallback(id => {
    // setTodos(todos => todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo));
    dispatch({type: 'TOGGLE', id});
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  )
}

export default App;

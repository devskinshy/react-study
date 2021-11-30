import React, { useCallback } from 'react';
import Todos from '../components/Todos';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import useActions from '../lib/useActions';

const TodosContainer = () => {
  const {input, todos} = useSelector(({ todos: {input, todos} }) => ({input,todos}));

  // const dispatch = useDispatch();
  // const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  // const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
  // const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
  // const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  )

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

// const mapStateToProps = ({ todos }) => ({
//   input: todos.input,
//   todos: todos.todos
// })
//
// const mapDispatchToProps = {
//   changeInput,
//   insert,
//   toggle,
//   remove
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);
export default React.memo(TodosContainer);

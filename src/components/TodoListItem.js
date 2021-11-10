import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from 'react-icons/md';
import './TodoListItem.scss';
import cn from 'classnames';
import React, { useCallback } from 'react';

const TodoListItem = ({todo, onRemove, onToggle, style}) => {
  const {id, text, checked} = todo;

  const onClick = useCallback(() => {
    onRemove(id);
  }, [onRemove, id]);

  const onChecked = useCallback(() => {
    onToggle(id);
  }, [onToggle, id]);

  return (
    <div className="TodoListItem-virtualized" style={style}>
    <div className="TodoListItem">
      <div className={cn("checkbox", {checked})} onClick={onChecked}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank/>}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={onClick}>
        <MdRemoveCircleOutline/>
      </div>
    </div>
    </div>
  )
}

export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo
);

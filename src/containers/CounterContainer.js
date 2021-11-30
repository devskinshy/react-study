import React from 'react';
import { useSelector } from 'react-redux';
import Counter from '../components/Counter';
import useActions from '../lib/useActions';
import { decreaseAsync, increaseAsync } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);

  const [onIncrease, onDecrease] = useActions(
    [increaseAsync, decreaseAsync],
    []
  );

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
  );
};

export default React.memo(CounterContainer);

import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { connect, useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../modules/counter';
import useActions from '../lib/useActions';
// import { bindActionCreators } from 'redux';

const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);

  // const dispatch = useDispatch();
  // const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  // const onDecrease = useCallback(()  => dispatch(decrease()), [dispatch]);

  const [onIncrease, onDecrease] = useActions(
    [increase, decrease],
    []
  ) ;

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
  );
};

// const mapStateToProps = state => ({
//   number: state.counter.number,
// });

// const mapDispatchToProps = dispatch => ({
//   increase: () => {
//     // console.log('increase')
//     dispatch(increase());
//   },
//   decrease: () => {
//     // console.log('decrease')
//     dispatch(decrease());
//   }
// })
// const mapDispatchToProps = dispatch => bindActionCreators({
//   increase,
//   decrease,
// }, dispatch);
// const mapDispatchToProps = {
//   increase,
//   decrease,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
export default React.memo(CounterContainer);

import { combineActions, createActions, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  number: 0
};

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// export const increase = () => ({type: INCREASE});
// export const decrease = () => ({type: DECREASE});

// const counter = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1
//       };
//     case DECREASE:
//       return {
//         number: state.number -1
//       };
//     default:
//       return state;
//   }
// }

// export const increase = createAction(INCREASE);
// export const decrease = createAction(DECREASE);

// const counter = handleActions(
//   {
//     [INCREASE]: (state, action) => ({number: state.number + 1}),
//     [DECREASE]: (state, action) => ({number: state.number - 1})
//   },
//   initialState
// )

export const {counter: {increase, decrease}} = createActions({
  [INCREASE]: () => 1,
  [DECREASE]: () => -1
})

const counter = handleActions(
  {
    // [INCREASE]: (state, action) => produce(state, draft => {
    //   draft.number++;
    // }),
    // [DECREASE]: (state, action) => produce(state, draft => {
    //   draft.number--;
    // }),
    [combineActions(increase, decrease)] : (state, { payload }) => produce(state, draft => {
      draft.number += payload;
    }),
  },
  initialState
)

export default counter;

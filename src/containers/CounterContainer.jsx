import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Counter from "../components/Counter";
import {
  increase,
  decrease,
  setDiff,
  decreaseCountAsyncThunk,
} from "../modules/counter";

function CounterContainer() {
  const { number, diff } = useSelector((state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));

  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = () => dispatch(setDiff());
  const onDecreaseAsyncThunk = () => dispatch(decreaseCountAsyncThunk());

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
      onDecreaseAsyncThunk={onDecreaseAsyncThunk}
    />
  );
}

export default CounterContainer;

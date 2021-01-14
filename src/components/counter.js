import React from "react";

const Counter = ({
  number,
  diff,
  onIncrease,
  onDecrease,
  onSetDiff,
  onDecreaseAsyncThunk,
}) => {
  const onChange = (e) => {
    onSetDiff(parseInt(e.target.value, 10));
  };
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
        <button onClick={onDecreaseAsyncThunk}>--</button>
      </div>
    </div>
  );
};

export default Counter;

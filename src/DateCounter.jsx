import { useReducer } from "react";

function reduce(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "set":
      return { ...state, count: action.payLoad };
    case "setStep":
      return { ...state, step: action.payLoad };
    case "rest":
      return { step: 1, count: 0 };
    default:
      throw new Error("welp");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initinalState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reduce, initinalState);
  const { count, step } = state;

  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2022");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "set", payLoad: +e.target.value });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payLoad: +e.target.value });
  };

  const reset = function () {
    dispatch({ type: "rest" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

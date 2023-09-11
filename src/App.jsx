// import React from 'react'
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Body from "./Body";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextBtn from "./NextBtn";
import Progress from "./Progress";
// import DateCounter from "./DateCounter";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reduce(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payLoad, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "gameStart":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("bruh");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reduce,
    initialState
  );
  const numQuestion = questions.length;
  const sumOfThePoints = questions.reduce((prev, cur) => {
    return prev + cur.points;
  }, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:6969/questions");
        const data = await res.json();
        dispatch({ type: "dataRecived", payLoad: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Body>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress numQuestion={numQuestion} index={index} points={points} sumOfThePoints={sumOfThePoints} answer={answer}/>
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextBtn dispatch={dispatch} answer={answer} />
          </>
        )}
      </Body>
    </div>
  );
}

export default App;

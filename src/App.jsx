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
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
// import DateCounter from "./DateCounter";

const SECS_PER_QUESTIONS = 15

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemining: null,
};

function reduce(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
        points: 0,
        index: 0,
        
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "gameStart":
      return { ...state, status: "active", secondsRemining: state.questions.length * SECS_PER_QUESTIONS };
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
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        points: 0,
        index: 0,
        answer: null,
        secondsRemining: initialState.secondsRemining,
      };
    case "interval":
      return {
        ...state,
        secondsRemining: state.secondsRemining - 1,
        status: state.secondsRemining <= 0 ? "finish" : state.status,
      };
    default:
      throw new Error("bruh");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemining },
    dispatch,
  ] = useReducer(reduce, initialState);
  const numQuestion = questions.length;
  const sumOfThePoints = questions.reduce((prev, cur) => {
    return prev + cur.points;
  }, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/questions");
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
            <Progress
              numQuestion={numQuestion}
              index={index}
              points={points}
              sumOfThePoints={sumOfThePoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemining={secondsRemining} />
              <NextBtn
                dispatch={dispatch}
                numQuestion={numQuestion}
                answer={answer}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            sumOfThePoints={sumOfThePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Body>
    </div>
  );
}

export default App;

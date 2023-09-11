/* eslint-disable react/prop-types */

import Options from "./option";

function Questions({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
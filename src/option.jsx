/* eslint-disable react/prop-types */

function Options({ questions, dispatch, answer }) {
  const isAnswered = answer !== null;

  return (
    <div>
      <div className="options">
        {questions.options.map((el, i) => {
          return (
            <button
              disabled={isAnswered}
              key={el}
              className={`btn btn-option ${answer === i ? "answer" : ""} ${
                isAnswered
                  ? i === questions.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              onClick={() => dispatch({ type: "newAnswer", payLoad: i })}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Options;

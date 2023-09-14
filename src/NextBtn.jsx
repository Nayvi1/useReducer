/* eslint-disable react/prop-types */

function NextBtn({ dispatch, answer, numQuestion, index }) {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        numQuestion <= index + 1
          ? dispatch({ type: "finish" })
          : dispatch({ type: "nextQuestion",  })
      }
    >
      { numQuestion <= index + 1 ? "Finish" : "Next"}
    </button>
  );
}

export default NextBtn;

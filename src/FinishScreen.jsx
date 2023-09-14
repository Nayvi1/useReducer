/* eslint-disable react/prop-types */
function FinishScreen({ points, sumOfThePoints, highscore, dispatch }) {

    const percentage = (points / sumOfThePoints) * 100

  return (
    <>
    
    <p className="result">
      you scored <strong>{points}</strong> out of {sumOfThePoints} ({Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(highscore : {highscore})</p>
    <button className="btn btn-ui" onClick={()=>{dispatch({type: "restart"})}}>Restart</button>
    </>
  );
}

export default FinishScreen;

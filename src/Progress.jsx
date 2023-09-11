/* eslint-disable react/prop-types */
function Progress({index, numQuestion, points, sumOfThePoints, answer}) {
  return (
    <header className="progress">
        <progress max={numQuestion} value={index + Number(answer !== null) }/>
        <p>question <strong>{index + 1}</strong> / {numQuestion}</p>
        <p>points: <strong>{points}</strong> / {sumOfThePoints}</p>
    </header>
  )
}

export default Progress
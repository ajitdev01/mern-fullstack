import { useEffect, useRef, useState } from "react";

function AiGui() {
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);
  const alarmRef = useRef(new Audio("/src/Songs/TumBin01.mp3"));

  /* TIMER */
  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          alarmRef.current.play();
          alert("Session Finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running]);

  /* HANDLERS */

  const startPause = () => {
    setRunning((prev) => !prev);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(minutes * 60);
  };

  const changeMinutes = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 120) {
      setMinutes(value);
      setTimeLeft(value * 60);
    }
  };

  /* FORMAT TIME */

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  /* PROGRESS */

  const totalSeconds = minutes * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div
        className="card p-4 text-center shadow-lg"
        style={{ width: "380px", borderRadius: "18px" }}
      >
        <h3 className="mb-3 fw-bold">Pomodoro Timer</h3>

        <h1 className="display-3 fw-bold">{formatTime(timeLeft)}</h1>

        <div className="progress my-3" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-danger"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Minutes</label>
          <input
            type="number"
            className="form-control text-center"
            value={minutes}
            onChange={changeMinutes}
            disabled={running}
          />
        </div>

        <div className="d-grid gap-2">
          <button
            className={`btn btn-lg ${
              running ? "btn-warning" : "btn-success"
            }`}
            onClick={startPause}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiGui;
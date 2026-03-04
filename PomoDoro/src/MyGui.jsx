import { useEffect, useRef } from "react";
import { useState } from "react";

function MyGui() {
  const [status, setStatus] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25)
  const alarm = useRef(new Audio(""))

  const handlePomo = () => {
    // setStatus((prev) => !prev);
    if (status) {
      setStatus(false)
    } else {
      setStatus(true)
    }
  };

  useEffect(() => {
    let interval = null;

    if (status && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
        console.log(timeLeft)
      }, 1000);
    } else if (timeLeft === 0) {
      setStatus(false)
      alarm.current.play()
      alert("Time UP")
    }
    return () => clearInterval(interval)
  }, [timeLeft, status])


  const formetTime = (seconds) =>{
    const min = Math.floor(seconds/60)
    const sec = (  seconds % 60 )
    const time  = ` ${min.toString().padStart(2,0)} : ${sec.toString().padStart(2,0)}`
    return time
  }


  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg rounded-4 p-4 text-center" style={{ maxWidth: "420px", width: "100%" }}>

        {/* Title */}
        <h4 className="fw-semibold text-secondary mb-3">
          Pomodoro Timer
        </h4>

        {/* Timer */}
        <h1
          className="fw-bold display-3 mb-4 text-dark"
          style={{ letterSpacing: "2px" }}
        >
         {
          formetTime(timeLeft)
         }
        </h1>

        {/* Status Badge */}
        <span
          className={`badge mb-4 px-3 py-2 ${status ? "bg-danger" : "bg-success"
            }`}
        >
          {status ? "Running" : "Stopped"}
        </span>

        {/* Action Button */}
        <div className="d-grid">
          <button
            onClick={handlePomo}
            className={`btn btn-lg fw-semibold ${status ? "btn-danger" : "btn-success"
              }`}
          >
            {status ? "Stop Session" : "Start Session"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyGui;

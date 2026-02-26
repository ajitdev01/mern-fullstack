import React, { useState, useEffect } from "react";

// Browser check
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function Voice() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#111827");

  useEffect(() => {
    handleListen();
  }, [isListening]);

  useEffect(() => {
    if (!text) return;
    const command = text.toLowerCase();

    const sites = {
      google: "https://google.com",
      youtube: "https://youtube.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    };

    for (let key in sites) {
      if (command.includes(`open ${key}`)) {
        window.open(sites[key], "_blank");
      }
    }

    // more commands here...
  }, [text]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        if (isListening) mic.start();
      };
    } else {
      mic.stop();
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setText(transcript);
    };

    // mic.onerror = (e) => console.log(e.error);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-all duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-xl w-full bg-gray-900/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Voice Assistant
        </h1>

        <div className="flex flex-col items-center gap-4">
          {/* Status */}
          <p
            className={`text-lg font-medium ${
              isListening ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isListening ? "Listening..." : "Press Start to Speak"}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsListening((prev) => !prev)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg 
                ${
                  isListening
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
              `}
            >
              {isListening ? "Stop" : "Start"}
            </button>

            <button
              onClick={() => setText("")}
              className="px-6 py-3 rounded-xl font-semibold bg-gray-700 hover:bg-gray-600 text-white shadow-lg transition-all duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Output Box */}
        <div className="mt-6 bg-gray-800 rounded-xl p-4 min-h-[120px] text-gray-200 border border-gray-700">
          {text || "Your speech text will appear here..."}
        </div>
      </div>
    </div>
  );
}

export default Voice;

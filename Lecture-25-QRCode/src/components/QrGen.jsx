import { useState } from "react";
import QRCode from "react-qr-code";

function QrGen() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          QR Code Generator
        </h1>

        <p className="text-gray-500 mb-6 text-sm">
          Enter any text or URL to generate a QR code
        </p>

        <input
          type="text"
          placeholder="Enter text or URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <div className="mt-8 flex justify-center">
          {text !== "" && (
            <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
              <QRCode
                size={256}
                value={text}
                className="w-48 h-48"
              />
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default QrGen;
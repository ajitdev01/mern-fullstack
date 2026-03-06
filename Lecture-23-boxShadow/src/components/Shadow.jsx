import { useState } from "react";

function Shadow() {
  const [hori, setHori] = useState(5);
  const [vert, setVert] = useState(5);
  const [blur, setBlur] = useState(5);
  const [spread, setSpread] = useState(5);
  const [color, setColor] = useState("#563d7c");
  const [inset, setInset] = useState(false);

  let boxShadowValue = `${inset ? "inset" : ""} ${hori}px ${vert}px ${blur}px ${spread}px ${color}`;

  const copyCode = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadowValue};`);
    alert("CSS Copied");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Box Shadow Generator
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Controls */}
          <div className="space-y-6">

            <div>
              <label className="font-medium">
                Horizontal [{hori}px]
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={hori}
                onChange={(e) => setHori(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium">
                Vertical [{vert}px]
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={vert}
                onChange={(e) => setVert(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium">
                Blur [{blur}px]
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium">
                Spread [{spread}px]
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={spread}
                onChange={(e) => setSpread(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="font-medium block mb-2">
                Shadow Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-10 border rounded cursor-pointer"
              />
            </div>

            {/* Inset Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
              />
              <span className="font-medium">Inset Shadow</span>
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center bg-slate-50 rounded-xl p-10">
            <div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "white",
                boxShadow: boxShadowValue,
              }}
              className="rounded-lg border"
            ></div>
          </div>
        </div>

        {/* CSS Output */}
        <div
          onClick={copyCode}
          className="mt-8 bg-black text-green-400 text-center p-4 rounded-lg cursor-pointer font-mono"
        >
          box-shadow: {boxShadowValue};
        </div>
      </div>
    </div>
  );
}

export default Shadow;
import { useState } from 'react';

function JsonFormmeter() {
    const [jsonInput, setJsonInput] = useState("");

    const handleFormat = () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsedData, null, 2));
        } catch (e) {
            alert("Invalid JSON data");
        }
    };

    const handleMinify = () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsedData));
        } catch (e) {
            alert("Invalid JSON data");
        }
    };

    const handleCopy = () => {
        if (!jsonInput) return;
        navigator.clipboard.writeText(jsonInput);
        // You could use a toast notification here for a better UX
        alert("Copied to clipboard!");
    };

    const handleClear = () => setJsonInput("");

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                        JSON <span className="text-indigo-600">Formatter</span>
                    </h1>
                    <p className="mt-2 text-slate-500">Clean, minify, and validate your JSON data instantly.</p>
                </header>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-t-xl border-x border-t border-slate-200 flex flex-wrap gap-3 justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleFormat}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm"
                        >
                            Beautify
                        </button>
                        <button
                            onClick={handleMinify}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-all shadow-sm"
                        >
                            Minify
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium rounded-lg transition-all"
                        >
                            Copy
                        </button>
                        <button
                            onClick={handleClear}
                            className="px-4 py-2 border border-red-100 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-all"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Text Area */}
                <div className="relative">
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder="Paste your JSON here..."
                        className="w-full h-[60vh] p-6 font-mono text-sm bg-white border border-slate-200 rounded-b-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none shadow-inner transition-all"
                        spellCheck="false"
                    />
                </div>

                {/* Footer Info */}
                <footer className="mt-4 text-center text-xs text-slate-400">
                    Format: JSON.stringify(data, null, 2) • No data is sent to a server.
                </footer>
            </div>
        </div>
    );
}

export default JsonFormmeter;
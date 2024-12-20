import React, { useState } from "react";
import axios from "axios";

const WritingAssistant = () => {
    const [text, setText] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (action) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8000/ai-assistant/${action}`, { text });
            setOutput(response.data.output);
        } catch (error) {
            console.error(error);
            setOutput("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">AI Writing Assistant</h1>
            <textarea
                className="w-full p-2 border rounded mb-4"
                rows="5"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="flex gap-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSubmit("summarize")}
                >
                    Summarize
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSubmit("correct")}
                >
                    Correct Grammar
                </button>
                <button
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSubmit("generate")}
                >
                    Generate Text
                </button>
            </div>
            {loading && <p className="text-gray-500 mt-4">Processing...</p>}
            {output && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h2 className="text-xl font-bold">Output:</h2>
                    <p>{output}</p>
                </div>
            )}
        </div>
    );
};

export default WritingAssistant;

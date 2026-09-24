import { useState } from "react";

function App() {
    const [status, setStatus] = useState("");

    async function checkBackend() {
        const response = await fetch("http://localhost:5000/api/health");
        const data = await response.json();

        setStatus(data.status);
    }

    return (
        <div>
            <button onClick={checkBackend}>
                Check Backend
            </button>

            <p>Backend status: {status}</p>
        </div>
    );
}

export default App;
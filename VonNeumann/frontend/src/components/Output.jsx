import React, { useState } from "react";
import "../styles/Output.css";

export default function Output({results}) {
    // output of code will be added as list elements
    const [activeTab, setActiveTab] = useState("OUTPUT");

    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    const processedResults = results.map(el => {
        return (
            <li className="result-row">{el}</li>
        )
    })

    return (
        <div id="output">
            <ul id="output-tooltip">
            <li
                className={activeTab === "OUTPUT" ? "active" : ""}
                onClick={() => handleClick("OUTPUT")}
            >
                OUTPUT
            </li>
            <li
                className={activeTab === "TERMINAL" ? "active" : ""}
                onClick={() => handleClick("TERMINAL")}
            >
                TERMINAL
            </li>
        </ul>
            <ul id="output-results">
                {processedResults}
            </ul>
        </div>
    )
}
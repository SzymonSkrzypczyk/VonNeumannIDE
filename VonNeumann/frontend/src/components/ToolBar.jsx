import React from "react";
import "../styles/Toolbar.css";
import playIcon from "../assets/images/play.png";
import stopIcon from "../assets/images/stop.png";
import saveIcon from "../assets/images/save.png";

export default function Toolbar(){
    const playClicked = (e) => {
        console.log("Play clicked");
    }

    const stopClicked = (e) => {
        console.log("Stop clicked");
    }

    const saveClicked = (e) => {
        console.log("Save clicked");
    }

    return (
        <nav id="toolbar-container">
            <h3>Von Neumann IDE</h3>

            <div id="toolbar-icons">
                <img id="play-button" src={playIcon} className="toolbar-image" onClick={playClicked}></img>
                <img id="stop-button" src={stopIcon} className="toolbar-image" onClick={stopClicked}></img>
                <img id="save-button" src={saveIcon} className="toolbar-image" onClick={saveClicked}></img>
            </div>
        </nav>
    )
}
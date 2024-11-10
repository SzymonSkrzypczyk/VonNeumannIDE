import React, { useState } from "react";
import "../styles/Toolbar.css";
import logo from "../assets/images/logo.png";
import playIcon from "../assets/images/play.png";
import stopIcon from "../assets/images/stop.png";
import saveIcon from "../assets/images/save.png";

export default function Toolbar(){
    const [playing, setPlaying] = useState(false);
    const [stopped, setStopped] = useState(false);

    const playClicked = (e) => {
        if (stopped){
            setPlaying(true);
            setStopped(false);
        } else{
            setPlaying(true);
        }
    }

    const stopClicked = (e) => {
        if (playing){
            setPlaying(false);
            setStopped(true);
        }
    }

    const saveClicked = (e) => {
        console.log("Save clicked");
    }
    /*<img id="logo" src={logo} />*/
    return (
        <nav id="toolbar-container">
            <img id="logo" src={logo} />

            <div id="toolbar-icons">
                <img id="play-button" src={playIcon} className={`toolbar-image ${playing == true? "clicked": ""}`} onClick={playClicked}></img>
                <img id="stop-button" src={stopIcon} className={`toolbar-image ${stopped == true? "clicked": ""}`} onClick={stopClicked}></img>
                <img id="save-button" src={saveIcon} className="toolbar-image" onClick={saveClicked}></img>
            </div>
        </nav>
    )
}
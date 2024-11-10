import React from "react";
import "../styles/FilesBar.css";
import dotsImage from "../assets/images/dots.png";
import addIcon from "../assets/images/plus.png";


export default function FilesBar({files}){
    // sending over what file has been created upwards needs to be added !
    // files' names will be sent over
    const renameFile = () => {
        console.log("Rename");
    }

    const addFile = () => {
        console.log("Add file");
    }

    const filesPanels = files.map(element => {return (
        <div className="file-panel" key={element}>
            <h4>{element}</h4>
            <img onClick={renameFile} src={dotsImage} id="dots-image" />
        </div>
    )});
    return (
        <div id="filesbar-container">
            {filesPanels}
            <img id="add-button" src={addIcon} onClick={addFile}/>
        </div>
    )
}
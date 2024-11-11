import React, { useState, useEffect } from "react";
import "../styles/FilesBar.css";
import dotsImage from "../assets/images/dots.png";
import addIcon from "../assets/images/plus.png";
import { v4 as uuidv4 } from "uuid";

export default function FilesBar({ files, updateFiles }) {
    const [activeFileTab, setActiveFileTab] = useState(null); // Track the active file tab
    const [activeFileOptionsId, setActiveFileOptionsId] = useState(null); // Track the active file options menu
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [fade, setFade] = useState(false);

    // Close the options menu if the user clicks outside the file-panel
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.file-panel')) {
                setActiveFileTab(null); // Close active tab if clicked outside
                setActiveFileOptionsId(null); // Close options menu if clicked outside
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Handle click to select a file as active
    const handleFileClick = (fileId) => {
        setActiveFileTab(activeFileTab === fileId ? null : fileId); // Toggle active state
    };

    // Handle options menu click (open on file click)
    const optionsClicked = (event, fileId) => {
        event.stopPropagation(); // Prevent event from propagating to the file click
        const { clientX, clientY } = event;
        setMenuPosition({ x: clientX, y: clientY });
        setActiveFileOptionsId(activeFileOptionsId === fileId ? null : fileId); // Toggle options visibility
    };

    // Handle option click (Rename/Delete)
    const handleOptionClick = (option, fileId) => {
        if (option === "Rename") {
            const updatedFiles = files.map((file) =>
                file.id === fileId ? { ...file, name: "renamedName" } : file
            );
            updateFiles(updatedFiles);
        } else if (option === "Delete") {
            const updatedFiles = files.filter((file) => file.id !== fileId);
            updateFiles(updatedFiles);
        }
        setActiveFileOptionsId(null); // Close options menu after action
        setActiveFileTab(null); // Close active tab after action
    };

    // Add a new file
    const addFile = () => {
        const newFile = { id: uuidv4(), name: "newName" };
        updateFiles([...files, newFile]);
        setFade(true);
    };

    return (
        <div id="filesbar-container">
            {files.map((file) => (
                <div
                    className={`file-panel ${activeFileTab === file.id ? "active" : ""}`}
                    key={file.id}
                    onClick={() => handleFileClick(file.id)} // Set the file as active on click
                >
                    <h4>{file.name}</h4>
                    <img
                        onClick={(event) => optionsClicked(event, file.id)} // Show options only for the clicked file
                        src={dotsImage}
                        id="dots-image"
                        alt="Options"
                    />
                </div>
            ))}
            <img
                id="add-button"
                className={fade ? "fade" : ""}
                src={addIcon}
                alt="Add File"
                onClick={addFile}
                onAnimationEnd={() => setFade(false)}
            />

            {/* Show options only for the active file */}
            {activeFileOptionsId && (
                <ul
                    className="floating-options-list"
                    style={{
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`,
                    }}
                >
                    <li onClick={() => handleOptionClick("Rename", activeFileOptionsId)}>Rename</li>
                    <li onClick={() => handleOptionClick("Delete", activeFileOptionsId)}>Delete</li>
                </ul>
            )}
        </div>
    );
}

import React, { useState, useEffect } from "react";
import "../styles/FilesBar.css";
import addIcon from "../assets/images/plus.png";
import { v4 as uuidv4 } from "uuid";
import FilePanel from "./FilePanel"; // Import the new FilePanel component

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

  // Handle option click (Rename/Delete)
  const handleOptionClick = (option, fileId, newName) => {
    if (option === "Rename") {
      const updatedFiles = files.map((file) =>
        file.id === fileId ? { ...file, name: newName } : file
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
        <FilePanel
          key={file.id}
          file={file}
          activeFileTab={activeFileTab}
          setActiveFileTab={setActiveFileTab}
          activeFileOptionsId={activeFileOptionsId}
          setActiveFileOptionsId={setActiveFileOptionsId}
          handleOptionClick={handleOptionClick}
          menuPosition={setMenuPosition}
        />
      ))}
      <img
        id="add-button"
        className={fade ? "fade" : ""}
        src={addIcon}
        alt="Add File"
        onClick={addFile}
        onAnimationEnd={() => setFade(false)}
      />
    </div>
  );
}

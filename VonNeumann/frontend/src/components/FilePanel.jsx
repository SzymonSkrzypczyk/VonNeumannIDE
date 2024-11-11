import React, { useState } from "react";
import "../styles/FilesBar.css";
import "../styles/FilePanel.css";
import dotsImage from "../assets/images/dots.png";

export default function FilePanel({
  file,
  activeFileTab,
  setActiveFileTab,
  activeFileOptionsId,
  setActiveFileOptionsId,
  handleOptionClick,
  setMenuPosition,
  menuPosition
}) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);

  // Handle click to select a file as active
  const handleFileClick = () => {
    setActiveFileTab(activeFileTab === file.id ? null : file.id); // Toggle active state
  };

  // Handle options menu click (open on file click)
  const optionsClicked = (event) => {
    event.stopPropagation(); // Prevent event from propagating to the file click
    const { clientX, clientY } = event;
    setActiveFileOptionsId(activeFileOptionsId === file.id ? null : file.id); // Toggle options visibility
    // Update position for options menu
    setMenuPosition({ x: clientX, y: clientY });
  };

  // Handle renaming the file
  const handleRenameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleRenameSubmit = () => {
    handleOptionClick("Rename", file.id, newName);
    setIsRenaming(false);
  };

  return (
    <div
      className={`file-panel ${activeFileTab === file.id ? "active" : ""}`}
      key={file.id}
      onClick={handleFileClick} // Set the file as active on click
    >
      {isRenaming ? (
        <input
          type="text"
          id="rename-input"
          value={newName}
          onChange={handleRenameChange}
          onBlur={handleRenameSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRenameSubmit(); // Submit rename on Enter key
            }
          }}
          autoFocus
        />
      ) : (
        <h4>{file.name}</h4>
      )}

      <img
        onClick={optionsClicked} // Show options only for the clicked file
        src={dotsImage}
        id="dots-image"
        alt="Options"
      />
      {activeFileOptionsId === file.id && (
        <ul
          className="floating-options-list"
          style={{
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
          }}
        >
          <li
            onClick={() => {
              setIsRenaming(true); // Enable renaming input
            }}
          >
            Rename
          </li>
          <li onClick={() => handleOptionClick("Delete", file.id)}>Delete</li>
        </ul>
      )}
    </div>
  );
}

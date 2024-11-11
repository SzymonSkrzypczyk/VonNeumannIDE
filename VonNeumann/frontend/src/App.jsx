import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import Toolbar from './components/ToolBar';
import FilesBar from './components/FilesBar';
import Output from './components/Output';
import Editor from '@monaco-editor/react';
import { v4 as uuidv4 } from "uuid";
import { Greet } from "../wailsjs/go/main/App";


function App() {
    const [files, setFiles] = useState([
        { id: uuidv4(), name: "file1.txt" },
        { id: uuidv4(), name: "file2.js" },
        { id: uuidv4(), name: "file3.css" },
    ]);

    const updateFiles = (newFiles) => {
        setFiles(newFiles);
        console.log("Updated files:", newFiles);
    };

    return (
        <div id="App">
            <Toolbar />
            <FilesBar files={files} updateFiles={updateFiles} />
            <Editor
                height="55vh"
                defaultValue="// some comment"
                theme="vs-dark"
            />
            <Output results={["line1", "line2"]}/>
        </div>
    )
}

export default App

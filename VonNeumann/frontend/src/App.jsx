import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import Toolbar from './components/ToolBar';
import FilesBar from './components/FilesBar';
import Output from './components/Output';
import Editor from '@monaco-editor/react';
import { Greet } from "../wailsjs/go/main/App";

function App() {
    const testFiles = ["file1", "file2", "file3"];
    return (
        <div id="App">
            <Toolbar />
            <FilesBar files={testFiles} />
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

import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import Toolbar from './components/ToolBar';
import FilesBar from './components/FilesBar';
import {Greet} from "../wailsjs/go/main/App";

function App() {
    const testFiles = ["file1", "file2", "file3"];
    return (
        <div id="App">
            <Toolbar />
            <FilesBar files={testFiles} />
        </div>
    )
}

export default App

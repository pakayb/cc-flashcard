import React from 'react';
import {BrowserRouter as Router,
        Route,
        Link,
        Switch
        } from "react-router-dom";
import './App.css';
import {db, storage} from './firebase'
import {useCollectionData, useCollectionDataOnce} from "react-firebase-hooks/firestore";
import Nav from "./NavBar/Nav";

function App() {

  return (
    <div className="App">
      <Nav/>
    </div>
  );
}

export default App;

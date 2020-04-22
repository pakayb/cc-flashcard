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
import Admin from "./Admin/Admin";
import Game from "./Game/Game";
import Learn from "./Learn/Learn";

function App() {

  return (
    <Router>
      <div className="App">
      <Nav/>
      <Switch>
          <Route path='/learn' exact component={Learn}/>
          <Route path='/game' exact component={Game}/>
          <Route path='/admin' exact component={Admin}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;

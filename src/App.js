import React from 'react';
import './App.css';
import {db} from './firebase'

function App() {
  console.log(db.collection('employees'));
  return (
    <div className="App">

    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Button } from "reactstrap";
import { Alert } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Button color="danger">Danger!</Button>
      <Button color="danger">Danger!</Button>

      <Alert color="primary">
        This is a primary alert — check it out!
      </Alert>
      <Alert color="secondary">
        This is a secondary alert — check it out!
      </Alert>
      <Alert color="success">
        This is a success alert — check it out!
      </Alert>
      <Alert color="danger">
        This is a danger alert — check it out!
      </Alert>
      <Alert color="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert color="info">
        This is a info alert — check it out!
      </Alert>
      <Alert color="light">
        This is a light alert — check it out!
      </Alert>
     
    </div>
  );
}

export default App;

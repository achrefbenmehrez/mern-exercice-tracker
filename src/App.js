import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom"; 

import Navbar from "./components/Navbar";
import ExercicesList from "./components/ExercicesList.js";
import EditExercice from "./components/EditExercice";
import CreateExercice from "./components/CreateExercice.js";
import CreateUser from "./components/CreateUser.js";


function App() {
  return (
    <Router>
        <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercicesList} />
        <Route path="/edit/:id" exact component={EditExercice} />
        <Route path="/create" exact component={CreateExercice} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

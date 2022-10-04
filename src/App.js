import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import UserState from './context/user/UserState';
import AlertState from './context/Alert/AlertState';

function App() {
  return (
    <>
      <UserState>
        <NoteState>
          <AlertState>
            <Router>
              <Nav mode="dark" title="iNotebook" searchBar={false} />
              <Alert />
              <div className="container my-3">
                <Routes>
                  <Route exact path="/home" element={<Home />}>
                  </Route>
                  <Route exact path="/about" element={<About />}>
                  </Route>
                  <Route exact path="/" element={<Login />}>
                  </Route>
                  <Route exact path="/signup" element={<Signup />}>
                  </Route>
                </Routes>
              </div>
            </Router>
          </AlertState>
        </NoteState>
      </UserState>
    </>
  );
}

export default App;

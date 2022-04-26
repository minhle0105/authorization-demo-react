import './App.css';
import {useState} from "react";
import {SignIn} from "../SignIn/SignIn";
import {SignUp} from "../SignUp/SignUp";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [username1, setUsername1] = useState('');
    const [password1, setPassword1] = useState('');

    const [username2, setUsername2] = useState('');
    const [password2, setPassword2] = useState('');

    const HOST = "http://localhost:3001";

    const handleSignIn = (e) => {
        e.preventDefault();
        Axios.post(HOST + '/sign-in', {
            username: username1,
            password: password1
        }).then(() => {
            setUsername1('');
            setPassword1('');
            console.log("Sign In successfully");
        })
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        Axios.post(HOST + '/sign-up', {
            username: username2,
            password: password2
        }).then(() => {
            setUsername2('');
            setPassword2('');
            console.log("Sign Up successfully")
        }).catch(() => {
            console.log("Failed to Sign Up");
        })
    }

    return (
        <div className="container">
            <SignIn userName={username1} setUsername={setUsername1} password={password1} setPassword={setPassword1} handleSignIn={handleSignIn} />
            <SignUp userName={username2} setUsername={setUsername2} password={password2} setPassword={setPassword2} handleSignUp={handleSignUp} />
        </div>
    );
}

export default App;

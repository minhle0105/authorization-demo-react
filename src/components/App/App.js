import './App.css';
import {useEffect, useState} from "react";
import {SignIn} from "../SignIn/SignIn";
import {SignUp} from "../SignUp/SignUp";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

function App() {

    const [username1, setUsername1] = useState('');
    const [password1, setPassword1] = useState('');

    const [username2, setUsername2] = useState('');
    const [password2, setPassword2] = useState('');

    const [content, setContent] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const HOST = "http://localhost:3001";

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(HOST + '/sign-in')
            .then((response) => {
                setIsLoggedIn(response.data.loggedIn);
                if (isLoggedIn) {
                    setContent(response.data.user[0].username);
                }
            })
    }, []);

    const handleCheckAuthenticatedStatus = () => {
        Axios.get(HOST + '/isAuthenticated', {
            headers: {
                "x-access-token": localStorage.getItem("jwtToken")
            }
        })
            .then((response) => {
                console.log(response);
            })
    }


    const handleSignIn = (e) => {
        e.preventDefault();
        Axios.post(HOST + '/sign-in', {
            username: username1,
            password: password1
        }).then((response) => {
            setUsername1('');
            setPassword1('');
            if (response.data.auth) {
                setContent(response.data.message);
                setIsLoggedIn(true);
                localStorage.setItem("jwtToken", response.data.token);
            } else {
                setIsLoggedIn(false);
            }
        }).catch((response) => {
            setUsername1('');
            setPassword1('');
            setContent(response.response.data.message)
            setIsLoggedIn(false);
        })
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        Axios.post(HOST + '/sign-up', {
            username: username2,
            password: password2
        }).then((response) => {
            setUsername2('');
            setPassword2('');
            setContent(response.data.message)
        }).catch((response) => {
            setUsername2('');
            setPassword2('');
            setContent(response.response.data.message)
        })
    }

    return (
        <div className="container">
            <SignIn userName={username1} setUsername={setUsername1} password={password1} setPassword={setPassword1}
                    handleSignIn={handleSignIn}/>
            <SignUp userName={username2} setUsername={setUsername2} password={password2} setPassword={setPassword2}
                    handleSignUp={handleSignUp}/>
            <h1 style={{textAlign: "center"}}>{content}</h1>
            {isLoggedIn ?
                <Button variant="primary" onClick={handleCheckAuthenticatedStatus}>Check authenticated</Button> : null}
        </div>
    );
}

export default App;

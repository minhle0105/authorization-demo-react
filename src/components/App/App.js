import './App.css';
import {useState} from "react";
import {SignIn} from "../SignIn/SignIn";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import {Home} from "../../Home/Home";
import {useEffect} from 'react'

function App() {

    const [token, setToken] = useState(sessionStorage.getItem('jwtToken') ? sessionStorage.getItem('jwtToken') : '');

    const [role, setRole] = useState('');

    const [isAuthorized, setIsAuthorized] = useState(false)

    const HOST = "http://localhost:3001";
    useEffect(() => {
        if (token) {
            Axios.get(HOST + '/sign-in')
                .then((response) => {
                    if (response.data.loggedIn) {
                        setIsAuthorized(true);
                    }
                })
        }


    }, [token]);

    Axios.defaults.withCredentials = true;
    if (isAuthorized) {
        return <Home isAuthorized={isAuthorized} role={role}/>;
    }


    return (
        <div className="container">
            <Routes>
                <Route path="/home" element={<Home isAuthorized={isAuthorized} role={role}/>}/>
                <Route path="/sign-in" element={<SignIn setToken={setToken} setRole={setRole}/>}/>

            </Routes>
        </div>
    );
}

export default App;

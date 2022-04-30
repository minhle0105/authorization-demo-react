import './App.css';
import {useState} from "react";
import {SignIn} from "../SignIn/SignIn";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from "react-router-dom";
import {Home} from "../Home/Home";
import {useEffect} from 'react'
import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Admin} from "../Admin/Admin";
import {Moderator} from "../Moderator/Moderator";

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
        return <Home isAuthorized={isAuthorized} role={role} setRole={setRole} />;
    }


    return (
        <div className="container">
            <Navigation />
            <Routes>
                <Route path="/home" element={<Home isAuthorized={isAuthorized} role={role} setRole={setRole}/>}/>
                <Route path="/sign-in" element={<SignIn setToken={setToken} setRole={setRole}/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/moderator" element={<Moderator/>}/>
            </Routes>
        </div>
    );
}

const Navigation = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink as={Link} to="/home">Home</NavLink>
                    <NavLink as={Link} to="/sign-in" >Sign In</NavLink>
                    <NavLink as={Link} to="/admin" >Admin</NavLink>
                    <NavLink as={Link} to="/moderator" >Moderator</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default App;

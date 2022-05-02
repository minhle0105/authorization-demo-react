import './App.css';
import {useState} from "react";
import {SignIn} from "../SignIn/SignIn";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from "react-router-dom";
import {Home} from "../Home/Home";
import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Admin} from "../Admin/Admin";
import {Moderator} from "../Moderator/Moderator";
import {ProtectedRoute} from "../ProtecteRoute/ProtectedRoute";
import {SignUp} from "../SignUp/SignUp";

function App() {

    const [token, setToken] = useState(sessionStorage.getItem('jwtToken') ? sessionStorage.getItem('jwtToken') : '');

    const [role, setRole] = useState('');

    const HOST = "http://localhost:3001";

    Axios.defaults.withCredentials = true;

    return (
        <div className="container">
            <Navigation />
            <Routes>
                <Route index element={<Home/>} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/sign-in" element={
                    <ProtectedRoute redirectPath={'/' + role} isAllowed={!token || !role }>
                        <SignIn role={role} setToken={setToken} setRole={setRole}/>
                    </ProtectedRoute>
                }/>
                <Route path="/sign-up" element={
                    <ProtectedRoute redirectPath="/sign-in" isAllowed={token && role === 'admin'}>
                        <SignUp jwtToken={token} host={HOST} />
                    </ProtectedRoute>
                }/>
                <Route path="/admin" element={
                    <ProtectedRoute redirectPath="/home" isAllowed={token && role === 'admin'}>
                        <Admin setToken={setToken} setRole={setRole}/>
                    </ProtectedRoute>
                }/>
                <Route path="/moderator" element={
                    <ProtectedRoute redirectPath="/home" isAllowed={token && role === 'moderator'}>
                        <Moderator setToken={setToken} setRole={setRole}/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </div>
    );
}

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Brand as={Link} to="/home">The Ton</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink as={Link} to="/home">Home</NavLink>
                        <NavLink as={Link} to="/sign-in">Sign In</NavLink>
                        <NavLink as={Link} to="/sign-up">Sign Up</NavLink>
                        <NavLink as={Link} to="/admin">Admin</NavLink>
                        <NavLink as={Link} to="/moderator" >Moderator</NavLink>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default App;

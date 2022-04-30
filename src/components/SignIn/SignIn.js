import {Button, Form} from "react-bootstrap";
import Axios from "axios";
import {useState} from "react";
import {Navigate} from "react-router-dom";

export const SignIn = ({role, setToken, setRole}) => {
    const HOST = "http://localhost:3001";
    const [username1, setUsername1] = useState('');
    const [password1, setPassword1] = useState('');
    const [content, setContent] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                sessionStorage.setItem("jwtToken", response.data.token);
                setRole(response.data.result[0].role);
                setToken(sessionStorage.getItem("jwtToken"));
            } else {
                setContent(response.data.message);
                setIsLoggedIn(false);
            }
        }).catch((error) => {
            setUsername1('');
            setPassword1('');
            setContent(error.response.data.message)
            setIsLoggedIn(false);
        })
    }
    if (isLoggedIn) {
        const redirectPath = "/" + role;
        return <Navigate to={redirectPath} replace />;
    }

    return (
        <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" value={username1} onChange={(e) => {
                    setUsername1(e.target.value);
                }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" value={password1} onChange={(e) => {
                    setPassword1(e.target.value);
                }}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
            {content ? <h1>{content}</h1> : null}
        </Form>

    )
}

// SignIn.propTypes = {
//     setToken: PropTypes.func.isRequired
// }

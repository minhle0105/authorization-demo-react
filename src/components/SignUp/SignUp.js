import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import Axios from "axios";

export const SignUp = ({host}) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSignUp = (e) => {
        e.preventDefault();
        Axios.post(host + "/sign-up", {
            username: username,
            password: password
        }).then((response) => {
            if (response.status === 201) {
                setMessage('Successfully Registered');
            }
            else {
                setMessage(response.data.message);
            }
        }).catch((error) => {
            console.log(error.response)
            setMessage(error.response.data.message);
        })
    }

    return (
        <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="formBasicEmail1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
            {message ? <h3>{message}</h3> : null}
        </Form>
    )
}

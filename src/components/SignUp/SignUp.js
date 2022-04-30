import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import Axios from "axios";

export const SignUp = ({host}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        Axios.get(host + "/roles")
            .then((response) => {
                let arr = [];
                for (let i = 0; i < response.data.length; i++) {
                    arr.push(response.data[i].role);
                }
                setRoles(arr);
            })
    }, [host])

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!username || !password || !role) {
            setMessage("Input field cannot be empty");
        }
        else {
            Axios.post(host + "/sign-up", {
                username: username,
                password: password,
                role: role
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

    }

    return (
        <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="formBasicEmail1">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
                <select required style={{width: "100%"}} id="role" onChange={(e) => {
                    setRole(e.target.value);
                }}>
                    <option defaultChecked value="">Select Role</option>
                    {roles.map((value, key) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Register New Admin
            </Button>
            {message ? <h3>{message}</h3> : null}
        </Form>
    )
}

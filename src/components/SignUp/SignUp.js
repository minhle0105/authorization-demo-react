import {Button, Form} from "react-bootstrap";

export const SignUp = ({userName, setUsername, password, setPassword, handleSignUp}) => {
    return (
        <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="formBasicEmail1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={userName} onChange={(e) => {
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
        </Form>
    )
}

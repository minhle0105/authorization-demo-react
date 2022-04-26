import {Button, Form} from "react-bootstrap";

export const SignIn = ({userName, setUsername, password, setPassword, handleSignIn}) => {
    return (
        <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={userName} onChange={(e) => {
                    setUsername(e.target.value);
                }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
        </Form>
    )
}

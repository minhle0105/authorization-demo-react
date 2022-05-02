import {Button} from "react-bootstrap";

export const Moderator = ({setRole, setToken, handleSignOut}) => {
    return (
        <div>
            <h1>MODERATOR PAGE</h1>
            <Button onClick={() => {
                handleSignOut();
                sessionStorage.removeItem("jwtToken");
                setToken('');
                setRole('');
            }}>Sign Out </Button>
        </div>
    )
}

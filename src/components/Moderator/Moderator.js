import {Button} from "react-bootstrap";

export const Moderator = ({setRole, setToken}) => {
    return (
        <div>
            <h1>MODERATOR PAGE</h1>
            <Button onClick={() => {
                sessionStorage.removeItem("jwtToken");
                setToken('');
                setRole('');
            }}>Sign Out </Button>
        </div>
    )
}

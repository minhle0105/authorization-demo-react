import {Button} from "react-bootstrap";

export const Admin = ({setToken, setRole}) => {
    return (
        <div>
            <h1>ADMIN PAGE</h1>
            <Button onClick={() => {
                sessionStorage.removeItem("jwtToken");
                setToken('');
                setRole('');
            }}>Sign Out </Button>
        </div>
    )
}

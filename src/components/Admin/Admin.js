import {Button} from "react-bootstrap";

export const Admin = ({handleSignOut}) => {

    return (
        <div>
            <h1>ADMIN PAGE</h1>
            <Button onClick={() => {
                handleSignOut();
            }}>Sign Out </Button>
        </div>
    )
}

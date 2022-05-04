import {Button} from "react-bootstrap";

export const Moderator = ({handleSignOut}) => {
    return (
        <div>
            <h1>MODERATOR PAGE</h1>
            <Button onClick={() => {
                handleSignOut();
            }}>Sign Out </Button>
        </div>
    )
}

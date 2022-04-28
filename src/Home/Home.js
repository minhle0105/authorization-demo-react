import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {Button} from "react-bootstrap";

export const Home = ({role, isAuthorized}) => {
    const navigate = useNavigate();
    const HOST = "http://localhost:3001";
    useEffect(() => {
        Axios.get(HOST + '/sign-in')
            .then((response) => {
                if (response.data.loggedIn) {
                    console.log("ABC")
                }
            })
    }, []);

    return (
        <div>
            {isAuthorized ?
                <div>
                    <h1>Welcome {role}</h1>
                    <Button onClick={() => {
                        sessionStorage.removeItem('jwtToken')
                        window.location.href = '/home';
                    }}>Log Out</Button>
                </div>
                :
                <div>
                    <h1>Home page for users</h1>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        navigate("/sign-in");
                    }
                    }>Admin</Button>
                </div>
            }

        </div>

    )
}

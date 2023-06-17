import { useNavigate } from "react-router-dom";
import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";


export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.login(credentials);
        if (success) {
            navigate("/private");
        } else {
            alert("Login failed");
        }
    };

    return (
        <>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword5" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="inputPassword5"
                    aria-labelledby="passwordHelpBlock"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and
                    numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
            </button>
        </>
    );
};

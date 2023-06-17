import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const SignUp = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.signup({ email, password });
        console.log(success)
        if (success) {

            navigate("/private");
        } else {
            alert("Signup failed");
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Welcome! Sign up, please</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        required
                    />
                </div>
                <label htmlFor="inputPassword5" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="inputPassword5"
                    className="form-control"
                    aria-labelledby="passwordHelpBlock"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

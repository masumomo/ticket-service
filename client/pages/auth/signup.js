import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hook/useRequest";

const SingUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/users/signup",
        method: "post",
        body: { email, password },
        onSuccess: () => Router.push("/")
    });

    const onSubmit = async event => {
        event.preventDefault();

        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                >
                </input>
            </div>

            <div className="form-group">
                <label>password</label>
                <input
                    type="password"
                    className="form-control"
                    onChange={e => setPassword(e.target.value)}>
                </input>
            </div>
            {errors}
            <button className="btn btn-primary">Sing Up</button>
        </form >
    );
};

export default SingUp;

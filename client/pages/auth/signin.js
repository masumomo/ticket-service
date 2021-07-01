import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hook/useRequest";

const SingIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/users/signin",
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
            <h1>Sign In</h1>
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
            <button className="btn btn-primary">Sing In</button>
        </form >
    );
};

export default SingIn;

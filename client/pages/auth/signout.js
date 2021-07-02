import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hook/useRequest";

const SingOut = () => {
    const { doRequest } = useRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => Router.push("/")
    });

    useEffect(() => {
        doRequest();
    }, []);

    return (
        <div >
            Signing you out...
        </div>

    );
};

export default SingOut;

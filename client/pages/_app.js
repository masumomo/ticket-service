import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "./auth/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser}>header</Header>
            <Component {...pageProps} />
        </div >);

};

AppComponent.getInitialProps = async (appContent) => {
    const client = buildClient(appContent.ctx);
    const { data } = await client.get("/api/users/currentuser");
    let pageProps = {};
    if (appContent.Component.getInitialProps) {
        pageProps = await appContent.Component.getInitialProps(appContent.ctx);
    }
    return data;
};

export default AppComponent;

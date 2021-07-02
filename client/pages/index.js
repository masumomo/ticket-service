import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
    console.log('currentUser :>> ', currentUser);
    return currentUser ? (
        <h1>You are sign in as {currentUser.email}</h1>
    ) : (
        <h1>You are Not sign in</h1>
    );
};

LandingPage.getInitialProps = async context => {
    console.log('LANDING PAGE!');

    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    console.log('data.currentUser :>> ', data.currentUser);
    return data;
};

export default LandingPage;

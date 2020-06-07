import React from 'react';

const AuthContext = React.createContext({});

function AuthContextProvider({ children }) {
    let [user, setUser] = React.useState({ info: {}, roles: [], permissions: [] });
    React.useEffect(() => {
        /* instance.get('/customs/auth', { params: { url } }).then(({ data }) => {
            setUser({ info: data.userinfo, roles: data.roles, permissions: data.permissions });
        }); */
        setUser(sessionStorage.getItem('user'));
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };

import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: f=>f,
    logout: f=>f,
    isAuthentificated: false
})
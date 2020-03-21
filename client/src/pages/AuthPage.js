import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import 'materialize-css';


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, errors, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    useEffect(() => {
        message(errors);
        console.log(errors);
        clearError();
    }, [errors, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const loginHandler = async () => {
        try{
            const res = await request('/api/auth/login', 'POST', {...form});
            console.log(res);
            auth.login(res.token, res.userId);
        }catch(e) {
        }
    }

    const registerHandler = async () => {
        try{
            const res = await request('/api/auth/register', 'POST', {...form});
            message(res.message);
        }catch(e) {
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
            <div className="card blue darken-3">
                <div className="card-content white-text">
                    <span className="card-title">Auth</span>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="email"
                                type="email"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input
                            name="password"
                            type="password"
                            onChange={changeHandler}
                        />
                        <label htmlFor="password">Password</label>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button
                        className="btn waves-effect waves-light" 
                        type="submit" 
                        onClick={loginHandler}
                        disabled={loading}
                        >Login
                    </button>
                    <button
                        className="btn waves-effect waves-light" 
                        style={{ float: 'right' }} 
                        type="submit" 
                        disabled={loading}
                        onClick={registerHandler}
                    >Register
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
    
}
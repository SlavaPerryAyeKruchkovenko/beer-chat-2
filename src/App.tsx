import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.sass';
import AuthPage from "@Pages/authPage/AuthPage";
import ChatPage from "@Pages/chatPage/ChatPage";
import {useDispatch} from "react-redux";
import ErrorPage from "@Pages/errorPage/ErrorPage";
import MainPage from "@Pages/MainPage/MainPage";
import {setToken} from "@Helpers/toolkitRedux/toolkitReducer";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(setToken(token));
        } else {
            navigate("/auth")
        }
    }, [dispatch, navigate]);

    return (
        <Routes>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path={"/"} element={<MainPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
    );
}

export default App;

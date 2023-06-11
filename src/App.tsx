import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.sass';
import AuthPage from "@Pages/authPage/AuthPage";
import ChatPage from "@Pages/chatPage/ChatPage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@Helpers/toolkitRedux";

function App() {
    const appState = useSelector((state: RootState) => state.toolkit);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        navigate("/auth")

        /*const token = localStorage.getItem("token");
        if(token){
            dispatch(setToken(token));
        }
        else {
            navigate("/auth")
        }*/
    }, [dispatch, navigate])
    useEffect(() => {
        if (appState.token) {
            navigate("/chat")
        }
    }, [appState.token, navigate])
    return (
        <Routes>
            <Route path="*" element={<div>error</div>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
    );
}

export default App;

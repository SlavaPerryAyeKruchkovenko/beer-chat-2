import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.sass';
import AuthPage from "@Pages/authPage/AuthPage";
import ChatPage from "@Pages/chatPage/ChatPage";

function App() {
    return (
        <Routes>
            <Route path="*" element={<div>error</div>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
    );
}

export default App;

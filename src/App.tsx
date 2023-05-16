import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.sass';
import AuthPage from "@Pages/authPage/AuthPage";

function App() {
    return (
        <Routes>
            <Route path="*" element={<div>error</div>}/>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
    );
}

export default App;

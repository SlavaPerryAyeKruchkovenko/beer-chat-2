import React from "react";
import ReactDOM from 'react-dom/client';
import App from './src/App';
import {BrowserRouter} from 'react-router-dom';
import "@Styles/reset200802.css";
import {Provider} from "react-redux";
import {store} from "./src/helpers/toolkitRedux";

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
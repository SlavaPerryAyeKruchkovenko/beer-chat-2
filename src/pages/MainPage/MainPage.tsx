import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@Helpers/toolkitRedux";
import "./MainPage.css";
import beer from "@Assets/images/beer.png";
import beerProfile from "@Assets/images/bear-visual.jpg"

const MainPage = () => {
    const token = useSelector((state: RootState) => state.toolkit.token);
    const getBtns = () => {
        return token ? <li><a href="/chat">Messenger</a></li> : <li><a href="/auth">Sign In</a></li>
    }
    return (
        <div className={"main-page"}>
            <header className={"main-header"}>
                <nav className={"nav-bar"}>
                    <div className="nav-bar-title">
                        <img src={beer} alt="beer"/>
                        <h1 className="nav-bar-title-text">Beer Chat</h1>
                    </div>

                    <ul className="auth">
                        {getBtns()}
                    </ul>
                </nav>
            </header>
            <main className="main">
                <section className="main-body">
                    <div className="main-content">
                        <div className="main-content-text">
                            <h1>Beer-to-Beer Meeting for flex</h1>
                            <h2 className="sub-title">Improves the efficiency of beer consumption</h2>
                        </div>
                        <img src={beerProfile} className="example" alt="beer chat"/>
                    </div>
                    <h2 className="another-information">
                        Beer is<span className="gray"> helper </span>
                        for communicate
                        <span className="gray"> between </span>peoples
                    </h2>
                    <div className="another-information">
                        <a className="red-border another-information-button" href="/chat">
                            Get Started
                        </a>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default MainPage
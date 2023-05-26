import React from "react";
import "./AuthPage.sass";
import beachImage from "@Assets/images/beach-back.jpg";
import {X} from "react-feather";

const AuthPage = () => {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [isLogin, setIsLogin] = React.useState(true)

    const loginSubmit = React.useCallback((e: any) => {
        e.preventDefault();
    }, []);
    const registerSubmit = React.useCallback((e: any) => {
        e.preventDefault();
    }, []);
    const authStyle = {
        backgroundImage: `url(${beachImage})`
    }
    return (
        <div className={"auth-page"} style={authStyle}>
            <div className={"auth-page-container"}>
                {isLogin ? (<form className={"login-page-form"} onSubmit={loginSubmit}>
                    <div className={"title"}>LOGIN</div>
                    <div className={"form-item " + (login.length && "form-item-focus")}>
                        <label htmlFor={"login"}>Login</label>
                        <input
                            required={true}
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            type={"text"}
                            name={"login"}
                            minLength={5}
                            maxLength={24}
                            id={"login"}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"form-item " + (password.length && "form-item-focus")}>
                        <label htmlFor={"password"}>Password</label>
                        <input
                            required={true}
                            type={"password"}
                            name={"password"}
                            id={"password"}
                            minLength={8}
                            maxLength={24}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"submit-btn login"}>
                        <button type={"submit"}>
                            <span>SUBMIT</span>
                        </button>
                    </div>
                    <a href="#" className="pass-forgot">Forgot your password?</a>
                    <div className="material-button alt-2" onClick={() => setIsLogin(false)}>
                        <span className="shape"/>
                    </div>
                </form>) : (<form className={"register-page-form"} onSubmit={registerSubmit}>
                    <div className={"header"}>
                        <div className={"title"}>REGISTER</div>
                        <X className={"close"}
                           onClick={() => setIsLogin(true)}
                        />
                    </div>
                    <div className={"form-item " + (login.length && "form-item-focus")}>
                        <label htmlFor={"registration-login"}>Login</label>
                        <input
                            required={true}
                            minLength={5}
                            maxLength={24}
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            type={"text"}
                            name={"registration-login"}
                            id={"registration-login"}
                        />
                        <span className={"spin"}/>
                    </div>
                    <div className={"form-item " + (name.length && "form-item-focus")}>
                        <label htmlFor={"registration-name"}>Name</label>
                        <input
                            required={true}
                            minLength={1}
                            maxLength={24}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type={"text"}
                            name={"registration-name"}
                            id={"registration-name"}
                        />
                        <span className={"spin"}/>
                    </div>
                    <div className={"form-item " + (password.length && "form-item-focus")}>
                        <label htmlFor={"registration-password"}>Password</label>
                        <input
                            required={true}
                            minLength={5}
                            maxLength={24}
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name={"registration-password"}
                            id={"registration-password"}
                        />
                        <span className={"spin"}/>
                    </div>
                    <div className={"form-item " + (repeatPassword.length && "form-item-focus")}>
                        <label htmlFor={"repeat-password"}>Repeat Password</label>
                        <input
                            required={true}
                            minLength={5}
                            maxLength={24}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            type="password"
                            name={"repeat-password"}
                            id={"repeat-password"}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"submit-btn register"}>
                        <button type={"submit"}><span>REGISTER</span></button>
                    </div>
                </form>)}
            </div>
        </div>
    );
}
export default AuthPage
import React from "react";
import "./AuthPage.sass";
import beachImage from "@Assets/images/beach-back.jpg";

const AuthPage = () => {
    /*
    * $(function() {

   $(".alt-2").click(function() {
      if (!$(this).hasClass('material-button')) {
         $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
         })

         setTimeout(function() {
            $(".overbox").css({
               "overflow": "initial"
            })
         }, 600)

         $(this).animate({
            "width": "140px",
            "height": "140px"
         }, 500, function() {
            $(".box").removeClass("back");

            $(this).removeClass('active')
         });

         $(".overbox .title").fadeOut(300);
         $(".overbox .input").fadeOut(300);
         $(".overbox .button").fadeOut(300);

         $(".alt-2").addClass('material-buton');
      }

   })

   $(".material-button").click(function() {

      if ($(this).hasClass('material-button')) {
         setTimeout(function() {
            $(".overbox").css({
               "overflow": "hidden"
            })
            $(".box").addClass("back");
         }, 200)
         $(this).addClass('active').animate({
            "width": "700px",
            "height": "700px"
         });

         setTimeout(function() {
            $(".shape").css({
               "width": "50%",
               "height": "50%",
               "transform": "rotate(45deg)"
            })

            $(".overbox .title").fadeIn(300);
            $(".overbox .input").fadeIn(300);
            $(".overbox .button").fadeIn(300);
         }, 700)

         $(this).removeClass('material-button');

      }

      if ($(".alt-2").hasClass('material-buton')) {
         $(".alt-2").removeClass('material-buton');
         $(".alt-2").addClass('material-button');
      }

   });

});
    * */
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onInputFocus = React.useCallback((e: any) => {
        e.target.parentNode.classList.add("form-item-focus");
    }, []);
    const onBlur = React.useCallback((e: any) => {
        if (e.target.value === "") {
            e.target.parentNode.classList.remove("form-item-focus");
        }
    }, []);
    const loginSubmit = React.useCallback((e: any) => {
        e.preventDefault();
    }, [])
    const authStyle = {
        backgroundImage: `url(${beachImage})`
    }
    return (
        <div className={"auth-page"} style={authStyle}>
            <div className={"auth-page-container"}>
                <form className={"login-page-form"}>
                    <div className={"title"}>LOGIN</div>
                    <div className={"form-item"}>
                        <label htmlFor={"login"}>Login</label>
                        <input
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            type={"text"}
                            name={"login"}
                            id={"login"}
                            onFocus={onInputFocus}
                            onBlur={onBlur}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"form-item"}>
                        <label htmlFor={"password"}>Password</label>
                        <input
                            type={"password"}
                            name={"password"}
                            id={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={onInputFocus}
                            onBlur={onBlur}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"submit-btn login"}>
                        <button type={"submit"} onClick={loginSubmit}>
                            <span>SUBMIT</span>
                        </button>
                    </div>
                    <a href="#" className="pass-forgot">Forgot your password?</a>
                </form>
                <form className={"register-page-form"}>
                    <div className="material-button alt-2"><span className="shape"/></div>
                    <div className={"title"}>REGISTER</div>
                    <div className={"form-item"}>
                        <label htmlFor={"registration-login"}>Login</label>
                        <input type={"text"} name={"registration-login"} id={"registration-login"}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"form-item"}>
                        <label htmlFor={"registration-password"}>Password</label>
                        <input type="password" name={"registration-password"} id={"registration-password"}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"form-item"}>
                        <label htmlFor={"repeat-password"}>Repeat Password</label>
                        <input type="password" name={"repeat-password"} id={"repeat-password"}/>
                        <span className={"spin"}/>
                    </div>
                    <div className={"submit-btn"}>
                        <button><span>NEXT</span></button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AuthPage
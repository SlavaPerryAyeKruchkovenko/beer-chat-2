import React from "react";
import User from "@Models/User";
import generateAvatar from "@Helpers/avatarGenerate";
import "./UserComponent.sass";

const UserComponent = ({user, selectUser}: { user: User, selectUser: (user: User) => void }) => {
    const avatar = generateAvatar(user.login, user.name);
    return (<div className={"user-component"} onClick={()=>selectUser(user)}>
        <img src={avatar} alt={"user"} className={"user-image"}/>
        <div className={"user-info"}>
            <span className={"name"}>{user.name}</span>
            <span className={"description"}>{user.login}</span>
        </div>
    </div>)
}
export default UserComponent
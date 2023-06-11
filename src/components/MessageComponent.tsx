import React from "react"
import Message from "@Models/Message";
import generateAvatar from "@Helpers/avatarGenerate";
import "./MessageComponent.sass";
import {useSelector} from "react-redux";
import {RootState} from "@Helpers/toolkitRedux";

const MessageComponent = ({message}: { message: Message }) => {
    const userMe = useSelector((state: RootState) => state.toolkit.user);
    const avatarUrl = message.user ? generateAvatar(message.user?.Login, message.user?.Name) : ""

    return (
        <div className={"message-block " + (userMe?.Id === message.userId && "my-message")}>
            <div className={"message-component"}>
                <div className={"person-avatar"}>
                    <img className={"avatar-image"} src={avatarUrl} alt={"avatar"}/>
                </div>
                <div className={"person-text"}>
                    <span className={"message-text"}>{message.text}</span>
                </div>
            </div>
        </div>
    )
}
export default MessageComponent
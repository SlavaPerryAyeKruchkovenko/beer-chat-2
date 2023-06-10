import React, {useEffect, useState} from "react"
import "./ChatPage.sass"
// @ts-ignore
import {FilePlus, Search} from 'feather-icons-react';
import User from "@Models/User";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [users, setUsers] = useState<User[]>([])
    const getUserProfile = (user: User) => {
        const avatarUrl = `https://www.gravatar.com/avatar/${user.Login}?d=https://ui-avatars.com/api/${user.Name}/128/random`
        return <div className={"user-profile"} id={user.Id} key={user.Id} onClick={() => selectUser(user)}>
            <img src={avatarUrl} alt={"image"} className={"user-image"}/>
            <div className={"info-bloc"}>
                <span>{user.Name}</span>
                <span className={"login-user"}>{user.Login}</span>
            </div>
        </div>
    }
    const getHeader = () => {
        if (selectedUser) {
            const avatarUrl = `https://www.gravatar.com/avatar/${selectedUser.Login}?d=https://ui-avatars.com/api/${selectedUser.Name}/128/random`
            return <>
                <img src={avatarUrl} alt={"image"} className={"user-image"}/>
                <div className={"info-bloc"}>
                    <span>{selectedUser.Name}</span>
                    <span className={"description"}>{selectedUser.Login}</span>
                </div>
            </>
        }
    }
    const sendMessage = (e: any) => {
        e.preventDefault()
    }
    const selectUser = (user: User) => {
        setSelectedUser(user);
    }
    useEffect(() => {
        setUsers([{Id: "1", Name: "Danil", Login: "not_lizard"}, {Id: "2", Name: "Nad9", Login: "baikal"}])
    }, [])
    return <div className={"chat-page"}>
        <div className={"user-column"}>
            <div className={"search-bar"}>
                <input type={"text"} maxLength={30}/>
                <Search className={"search"}/>
            </div>
            <ul className={"user-block"}>
                {users.map(getUserProfile)}
            </ul>
        </div>
        <div className={"chat-block"}>
            <div className={"chat-header"}>
                {getHeader()}
            </div>
            <div className={"messenger"}>

            </div>
            <form className={"messenger-input"} onSubmit={sendMessage}>
                <textarea className={"text-input"} placeholder={"type your message"}/>
                <div className={"send-panel"}>
                    <FilePlus className={"icon"}/>
                    <button type={"submit"} className={"send"}>Send</button>
                </div>
            </form>
        </div>
    </div>
}
export default ChatPage
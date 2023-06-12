import ChatPortal from "@Portals/ChatPortal/ChatPortal"
import React, {useEffect, useState} from "react"
import "./ChatModal.sass";
import {useSelector} from "react-redux";
import {RootState} from "@Helpers/toolkitRedux";
import User from "@Models/User";
import UserComponent from "@Components/UserComponent/UserComponent";
import apiManager from "@Helpers/apiManager";
import generateAvatar from "@Helpers/avatarGenerate";

const ChatModal = ({
                       onClose,
                       onConfirm
                   }: { onClose?: () => void, onConfirm: (title: string, users: User[]) => void }) => {
    const token = useSelector((state: RootState) => state.toolkit.token);
    const [title, setTitle] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [searchText, setSearchText] = useState("")
    const userMe = useSelector((state: RootState) => state.toolkit.user);
    const selectUser = (user: User) => {
        setSearchText("")
        setUsers(value => value.filter(x => x.id !== user.id))
        setSelectedUsers(value => [...value, user]);
    }
    const unSelectedUser = (user: User) => {
        setUsers(value => [...value, user])
        setSelectedUsers(value => value.filter(x => x.id !== user.id));
    }
    const getSelectedUser = (user: User) => {
        const avatarUrl = generateAvatar(user.login, user.name);
        return <div className={"selected-user"} key={"selected" + user.id} onClick={() => unSelectedUser(user)}>
            <img src={avatarUrl} alt={"avatar"} className={"avatar"}/>
            <span className={"name"}>{user.name}</span>
        </div>
    }
    const submitForm = (e: any) => {
        e.preventDefault()
        if (userMe) {
            onConfirm(title, [...selectedUsers, userMe])
        }
    }
    useEffect(() => {
        if (token) {
            apiManager.getAllUsers(token).then(res => {
                if (res.data) {
                    const resUsers = res.data as User[]
                    setUsers(resUsers.filter(x=>!x.isBan))
                }
            })
        }
    }, [token]);
    useEffect(() => {
        if (searchText) {
            setSearchedUsers(users.filter(x => x.name.includes(searchText)));
        } else {
            setSearchedUsers(users)
        }
    }, [searchText, users]);

    return <ChatPortal>
        <div className={"chat-modal-block"}>
            <div className={"chat-modal"}>
                <h1 className={"chat-title"}>Create chat</h1>
                <form className={"modal-body"} onSubmit={submitForm}>
                    <p className={"title-input"}>
                        <label htmlFor={"chat-title"}>
                            Title
                            <input
                                name={"chat-title"}
                                className={"chat-title"}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </label>
                    </p>
                    <div className={"user-block"}>
                        <label htmlFor={"user-title"}>Search user
                            <input
                                name={"user-title"}
                                value={searchText}
                                className={"chat-title"}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </label>
                        <div className={"search-users"}>
                            {searchedUsers.map(x => <UserComponent user={x} selectUser={selectUser} key={x.id}/>)}
                        </div>
                        <div className={"selected-users"}>
                            {selectedUsers.map(getSelectedUser)}
                        </div>
                    </div>
                    <div className={"btn-block"}>
                        <button className={"cancel"} type={"reset"} onClick={onClose}>Cancel</button>
                        <button className={"save-chat"} type={"submit"}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </ChatPortal>
}
export default ChatModal
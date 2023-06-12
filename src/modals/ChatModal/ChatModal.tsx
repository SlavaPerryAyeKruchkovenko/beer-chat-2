import ChatPortal from "@Portals/ChatPortal/ChatPortal"
import React, {useEffect, useState} from "react"
import "./ChatModal.sass";
import {useSelector} from "react-redux";
import {RootState} from "@Helpers/toolkitRedux";
import User from "@Models/User";
import UserComponent from "@Components/UserComponent/UserComponent";

const ChatModal = ({onClose}: { onClose?: () => void }) => {
    const token = useSelector((state: RootState) => state.toolkit.token);
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        if (token) {
            /*apiManager.getAllUsers(token).then(res => {
                if (res.data) {
                    console.log("all users", res.data);
                }
            })*/
        }
    }, [token]);
    useEffect(() => {
        setUsers([{
            id: '1',
            name: 'slava',
            login: "slava228"
        }, {
            id: '2',
            name: 'danil',
            login: "danil228"
        }, {
            id: '3',
            name: 'timur',
            login: "timur228"
        }])
    }, [])
    return <ChatPortal>
        <div className={"chat-modal-block"}>
            <div className={"chat-modal"}>
                <h1 className={"chat-title"}>Create chat</h1>
                <form className={"modal-body"}>
                    <p className={"title-input"}>
                        <label htmlFor={"chat-title"}>Title<input name={"chat-title"} className={"chat-title"}/></label>
                    </p>
                    <div className={"user-block"}>
                        <label htmlFor={"user-title"}>Search user
                            <input name={"user-title"} className={"chat-title"}/>
                        </label>
                        <div className={"search-users"}>
                            {users.map(x => <UserComponent user={x}/>)}
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
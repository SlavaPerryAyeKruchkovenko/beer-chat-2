import React, {useEffect, useState} from "react"
import "./ChatPage.sass"
// @ts-ignore
import {FilePlus, Search} from 'feather-icons-react';
import apiManager from "@Helpers/apiManager";
import {joinRoom} from "@Helpers/socketManager";
import {useSelector} from "react-redux";
import {RootState} from "@Helpers/toolkitRedux";
import {useNavigate} from "react-router-dom";
import Chat from "@Models/Chat";
import {HubConnection} from "@aspnet/signalr";

const ChatPage = () => {
    const [chats, setChats] = useState<Chat[]>([])
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined)
    const [message, setMessage] = useState("");
    const [connection, setConnection] = useState<HubConnection | undefined>(undefined)
    const token = useSelector((state: RootState) => state.toolkit.token);
    const navigate = useNavigate();
    const userMe = useSelector((state: RootState) => state.toolkit.user);

    const getChatProfile = (chat: Chat) => {
        const avatarUrl = `https://www.gravatar.com/avatar/${chat.title}?d=https://ui-avatars.com/api/${chat.title}/128/random`
        return <div className={"user-profile"} id={chat.id} key={chat.id} onClick={() => selectChat(chat)}>
            <img src={avatarUrl} alt={"image"} className={"user-image"}/>
            <div className={"info-bloc"}>
                <span>{chat.title}</span>
            </div>
        </div>
    }
    const getHeader = () => {
        if (selectedChat) {
            const avatarUrl = `https://www.gravatar.com/avatar/${selectedChat.title}?d=https://ui-avatars.com/api/${selectedChat.title}/128/random`
            return <>
                <img src={avatarUrl} alt={"image"} className={"user-image"}/>
                <div className={"info-bloc"}>
                    <span>{selectedChat.title}</span>
                </div>
            </>
        }
    }
    const selectChat = (chat: Chat) => {
        if (userMe) {
            setSelectedChat(chat);
            const connect = joinRoom(userMe.Id)

            connect.start().then(() => {
                console.log('SignalR Connected')
                setConnection(connect)
            }).catch(err => console.error('SignalR Connection Error: ', err));
        }
    }

    const sendMessage = async (e: any) => {
        e.preventDefault()
        if (selectedChat && connection) {
            const chatId = selectedChat.id
            await connection.invoke("SendMessage", {chatId, message});
        }
    }
    useEffect(() => {
        if(connection){
            connection.on("SendMessage", (message) => {
                console.log("message from back", message);
            });
            connection.onclose(() => {
                console.log("connection close")
            });
        }
    }, [connection])

    useEffect(() => {
        console.log("current user", userMe)
        if (userMe && token) {
            apiManager.getAllChats(userMe.Id, token).then(res => {
                if (res.data) {
                    console.log("chat from back", res.data)
                    console.log("chat after cast", res.data as Chat[])
                    setChats(res.data as Chat[])
                }
            }).catch(e => {
                console.log("get all chat error", e)
            })
        }
    }, [navigate, token, userMe]);

    /*useEffect(() => {
        if (token) {
            apiManager.getAllUsers(token).then(res => {
                if (res.data) {
                    console.log("all users", res.data);
                }
            }).catch(e => {
                console.log("get all user error", e)
            })
        }
    }, [token]);*/
    return <div className={"chat-page"}>
        <div className={"user-column"}>
            <div className={"search-bar"}>
                <input type={"text"} maxLength={30}/>
                <Search className={"search"}/>
            </div>
            <ul className={"chats-block"}>
                {chats.map(getChatProfile)}
            </ul>
        </div>
        <div className={"chat-block"}>
            <div className={"chat-header"}>
                {getHeader()}
            </div>
            <div className={"messenger"}>

            </div>
            <form className={"messenger-input"} onSubmit={sendMessage}>
                <textarea
                    className={"text-input"}
                    placeholder={"type your message"}
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                />
                <div className={"send-panel"}>
                    <FilePlus className={"icon"}/>
                    <button type={"submit"} className={"send"}>Send</button>
                </div>
            </form>
        </div>
    </div>
}
export default ChatPage
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
import Message from "@Models/Message";

const ChatPage = () => {
    const [chats, setChats] = useState<Chat[]>([])
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined)
    const [message, setMessage] = useState("");
    const [messages,setMessages] = useState<Message[]>([])
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
        if (connection) {
            setMessages([])
            connection.stop().then(() => console.log("close"))
        }
        setSelectedChat(chat);
        const connect = joinRoom(chat.id)
        console.log(connect)
        connect.start().then(() => {
            console.log('SignalR Connected')
            setConnection(connect)
            if(token){
                apiManager.getAllChatMessage(token,chat.id).then(res => {
                    if(res.data){
                        console.log(res.data)
                    }
                })
            }
        }).catch(err => console.error('SignalR Connection Error: ', err));
    }

    const sendMessage = async (e: any) => {
        e.preventDefault()
        if (userMe && token && selectedChat) {
            const val = {
                id: "1",
                text: message,
                userId: userMe.Id,
                chatroomId: selectedChat.id
            }
            apiManager.sendMessage(token, val).then(res => {
                if (res.data) {
                    setMessage("")
                }
            })
        }
    }

    useEffect(() => {
        if (connection) {
            connection.on("SendMessage", (message) => {
                console.log("message from back", message);
            });
            connection.onclose(() => {
                console.log("connection close")
            });
        }
    }, [connection])

    useEffect(() => {
        if (userMe && token) {
            apiManager.getAllChats(userMe.Id, token).then(res => {
                if (res.data) {
                    setChats(res.data as Chat[])
                }
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
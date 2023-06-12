import React, {useEffect, useState} from "react"
import "./ChatPage.sass"
// @ts-ignore
import {FilePlus, Search} from 'feather-icons-react';
import apiManager from "@Helpers/apiManager";
import {joinRoom} from "@Helpers/socketManager";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@Helpers/toolkitRedux";
import {useNavigate} from "react-router-dom";
import Chat from "@Models/Chat";
import {HubConnection} from "@aspnet/signalr";
import Message from "@Models/Message";
import MessageComponent from "@Components/MessageComponent/MessageComponent";
import generateAvatar from "@Helpers/avatarGenerate";
import ChatModal from "@Modals/ChatModal/ChatModal";
import User from "@Models/User";
import {removeToken, removeUser} from "@Helpers/toolkitRedux/toolkitReducer";

const ChatPage = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [searchChats, setSearchChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [connection, setConnection] = useState<HubConnection | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>("");
    const [modal, setModal] = useState<JSX.Element | undefined>(undefined);

    const token = useSelector((state: RootState) => state.toolkit.token);
    const navigate = useNavigate();
    const userMe = useSelector((state: RootState) => state.toolkit.user);
    const dispatch = useDispatch();

    const getChatProfile = (chat: Chat) => {
        const avatarUrl = generateAvatar(chat.title, chat.title);
        return <div className={"user-profile"} id={chat.id} key={chat.id} onClick={() => selectChat(chat)}>
            <img src={avatarUrl} alt={"image"} className={"user-image"}/>
            <div className={"info-bloc"}>
                <span>{chat.title}</span>
            </div>
        </div>
    }
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(removeToken());
        dispatch(removeUser());
        navigate("/auth");
        if (token) {
            apiManager.logout(token).then(res => {
                console.log("logout from back", res)
            })
        }
    }
    const getHeader = () => {
        if (selectedChat) {
            const avatarUrl = generateAvatar("selectedChat.title", "selectedChat.title");
            return <>
                <div className={"header"}>
                    <img src={avatarUrl} alt={"image"} className={"user-image"}/>
                    <div className={"info-bloc"}>
                        <span>{"selectedChat.title"}</span>
                    </div>
                </div>
                <button className={"logout"} onClick={logout}>logout</button>
            </>
        } else {
            return <>
                <div/>
                <button className={"logout"} onClick={logout}>logout</button>
            </>
        }
    }
    const selectChat = (chat: Chat) => {
        if (connection) {
            setMessages([]);
            connection.stop().then(() => console.log("close"))
        }
        setSelectedChat(chat);
        const connect = joinRoom(chat.id)
        connect.start().then(() => {
            setConnection(connect)
            if (token) {
                apiManager.getAllChatMessage(token, chat.id).then(res => {
                    if (res.data) {
                        setMessages(res.data as Message[])
                    }
                })
            }
        }).catch(err => console.error('SignalR Connection Error: ', err));
    }
    const openChatModal = () => {
        setModal(<ChatModal onClose={() => setModal(undefined)} onConfirm={createChat}/>)
    }
    const createChat = (title: string, users: User[]) => {
        if (token) {
            apiManager.createChat(token, title, users).then(res => {
                if (res.data) {
                    setChats(value => [...value, res.data as Chat])
                    setModal(undefined);
                }
            })
        }
    }
    const enterPress = async (e: any) => {
        if (e.key === "Enter") {
            await sendMessage(e)
        }
    }
    const sendMessage = async (e: any) => {
        e.preventDefault()
        if (userMe && token && selectedChat) {
            const val = {
                id: "1",
                text: message,
                userId: userMe.id,
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
                setMessages(value => [...value, message as Message])
            });
            connection.onclose(() => {
                console.log("connection close")
            });
        }
    }, [connection])

    useEffect(() => {
        if (userMe && token) {
            apiManager.getAllChats(userMe.id, token).then(res => {
                if (res.data) {
                    setChats(res.data as Chat[])
                }
            })
        }
    }, [navigate, token, userMe]);
    useEffect(() => {
        setSearchChats(chats.filter(x => x.title.includes(searchText)));
    }, [chats, searchText]);

    useEffect(() => {
        console.log("token",token)
        if (!token) {
            navigate("/auth")
        }
    }, [navigate, token]);

    return <div className={"chat-page"}>
        <div className={"chat-column"}>
            <div className={"search-bar"}>
                <input
                    type={"text"}
                    maxLength={30}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}/>
                <Search className={"search"}/>
            </div>
            <div className={"create-chat-block"}>
                <button className={"create-chat-btn"} onClick={openChatModal}>Create chat</button>
            </div>
            <ul className={"chats-block"}>
                {searchChats.filter(x => !x.isDelete).map(getChatProfile)}
            </ul>
        </div>
        <div className={"chat-block"}>
            <div className={"chat-header"}>
                {getHeader()}
            </div>
            <div className={"messenger"}>
                {messages.map(x => <MessageComponent message={x} key={x.id}/>)}
            </div>
            <form className={"messenger-input"} onSubmit={sendMessage}>
                <textarea
                    onKeyPress={enterPress}
                    className={"text-input"}
                    placeholder={"type your message"}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <div className={"send-panel"}>
                    <FilePlus className={"icon"}/>
                    <button type={"submit"} className={"send"}>Send</button>
                </div>
                {modal}
            </form>
        </div>
    </div>
}
export default ChatPage
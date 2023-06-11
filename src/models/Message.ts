import User from "@Models/User";

interface Message {
    id: string,
    text: string,
    userId: string,
    chatroomId: string
    user?: User
}

export default Message
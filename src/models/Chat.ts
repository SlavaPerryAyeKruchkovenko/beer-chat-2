import chatRoomUser from "@Models/ChatRoomUser";
import Message from "@Models/Message";

interface Chat{
    id: string,
    title: string,
    isDelete: boolean
    messages: Message[],
    chatRoomUsers: chatRoomUser[]
}
export default Chat
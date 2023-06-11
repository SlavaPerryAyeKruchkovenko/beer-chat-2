import {HubConnectionBuilder} from '@aspnet/signalr';
import {apiUrl} from "@Helpers/constants";

export const joinRoom = (chatId: string) => {
    return new HubConnectionBuilder()
        .withUrl(apiUrl + `socket?chatId=${chatId}`)
        .build();
}

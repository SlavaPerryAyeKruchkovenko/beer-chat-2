import {HubConnectionBuilder} from '@aspnet/signalr';
import {apiUrl} from "@Helpers/constants";

export const joinRoom = (userId: string) => {
    return new HubConnectionBuilder()
        .withUrl(apiUrl + `socket?userId=${userId}`)
        .build();
}

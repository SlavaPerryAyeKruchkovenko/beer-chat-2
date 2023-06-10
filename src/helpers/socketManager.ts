import { HubConnectionBuilder } from '@aspnet/signalr';
import apiManager from "@Helpers/apiManager";
import {apiUrl} from "@Helpers/constants";

export const connection = new HubConnectionBuilder()
    .withUrl(apiUrl+'chat')
    .build();

export const startSignalRConnection = () => {
    connection.start()
        .then(() => console.log('SignalR Connected'))
        .catch(err => console.error('SignalR Connection Error: ', err));
}

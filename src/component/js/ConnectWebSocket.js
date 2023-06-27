import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_BASE_URL } from '../../config/host-config';

let ws = null;

export const setWebSocket = () => {
    const sock = new SockJS(API_BASE_URL + '/contents/chat/live');
    ws = Stomp.over(sock);
};

export const getWebSocket = () => {
    return {
        ws
    };
};
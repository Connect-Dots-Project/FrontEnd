import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let ws = null;

export const setWebSocket = () => {
    const sock = new SockJS('http://13.209.61.63/contents/chat/live');
    ws = Stomp.over(sock);
};

export const getWebSocket = () => {
    return {
        ws
    };
};
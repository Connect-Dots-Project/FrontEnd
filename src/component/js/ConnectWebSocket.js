import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let ws = null;

export const setWebSocket = () => {
    const sock = new SockJS('http://localhost:8181/contents/chat/live');
    ws = Stomp.over(sock);
};

export const getWebSocket = () => {
    return {
        ws
    };
};
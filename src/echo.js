import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;

const echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001', // Port 6001 là port mặc định cho Laravel Echo Server
});

export default echo;
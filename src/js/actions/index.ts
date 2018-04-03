export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';

export const sendMessage = text => ({
    type: SEND_MESSAGE,
    text,
});

export const recieveMessage = message => ({
    type: RECIEVE_MESSAGE,
    message,
})

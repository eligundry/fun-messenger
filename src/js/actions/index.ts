export const SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessage = text => ({
    type: SEND_MESSAGE,
    text,
});

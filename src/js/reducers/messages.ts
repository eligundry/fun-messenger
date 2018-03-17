const messages = (state = [], action) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            debugger;
            return [
                ...state,
                {}
            ];
        default:
            return state;
    }
}

export default messages;

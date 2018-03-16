import * as React from 'react';

import { Message, MessageProps } from './Message';

export interface ThreadProps {
    messages?: MessageProps[],
}

export class Thread extends React.Component<ThreadProps, {}> {
    private renderMessage(message: MessageProps, idx: number) {
        return (
            <Message
                text={message.text}
                key={idx.toString()}
            />
        );
    }

    render() {
        const messages = this.props.messages.map(this.renderMessage);

        return (
            <div>
                {messages}
            </div>
        );
    }
}

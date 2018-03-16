import * as React from 'react';

import { Message, MessageProps } from './Message';

export interface ThreadProps {
    messages?: MessageProps[],
}

export class Thread extends React.Component<ThreadProps, {}> {
    private renderMessage(message: MessageProps, idx: number) {
        return (
            <Message
                key={message.id.toString()}
                {...message}
            />
        );
    }

    render() {
        const messages = this.props.messages.map(this.renderMessage);

        return (
            <div className="thread">
                {messages}
            </div>
        );
    }
}

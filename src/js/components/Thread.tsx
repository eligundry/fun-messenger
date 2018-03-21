import * as React from 'react';

import { Message, MessageProps } from './Message';

export interface ThreadProps extends React.Props<Thread> {
    messages?: MessageProps[],
}

export const Thread: React.SFC<ThreadProps> = (props) => {
    const messages = props.messages.map((message: MessageProps) =>{
        return (
            <Message
                key={message.id.toString()}
                {...message}
            />
        );
    });

    return (
        <div className="thread">
            {messages}
        </div>
    );
}

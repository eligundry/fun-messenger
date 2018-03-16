import * as React from 'react';

export interface MessageProps {
    text: string,
}

export class Message extends React.Component<MessageProps, {}> {
    render() {
        return (
            <div>
                {this.props.text}
            </div>
        );
    }
}

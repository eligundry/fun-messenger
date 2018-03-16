import * as React from 'react';

export interface MessageProps {
    id: number,
    text: string,
}

export class Message extends React.Component<MessageProps, {}> {
    render() {
        return (
            <div className="message">
                {this.props.text}
            </div>
        );
    }
}

import * as React from 'react';

import { Thread, ThreadProps } from './Thread';

export interface MessengerProps {
    thread?: ThreadProps,
}

export class Messenger extends React.Component<MessengerProps, {}> {
    render() {
        return (
            <div>
                <Thread messages={this.props.thread.messages} />
            </div>
        );
    }
}

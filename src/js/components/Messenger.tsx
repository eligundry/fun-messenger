import * as React from 'react';

import { Composer } from './Composer';
import { Thread, ThreadProps } from './Thread';

export interface MessengerProps {
    thread?: ThreadProps,
}

export class Messenger extends React.Component<MessengerProps, {}> {
    render() {
        return (
            <main className="messenger">
                <Thread messages={this.props.thread.messages} />
                <Composer />
            </main>
        );
    }
}

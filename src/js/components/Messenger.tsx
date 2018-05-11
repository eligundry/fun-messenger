import * as React from 'react';

import { Composer } from './Composer';
import { Thread, ThreadProps } from './Thread';

export interface MessengerProps extends React.Props<Messenger> {
  threads?: ThreadProps[];
}

export class Messenger extends React.Component<MessengerProps, {}> {
  render() {
    const threads = this.props.threads.map((thread: ThreadProps) => {
      return (
        <Thread
          key={thread.id}
          {...thread}
        />
      );
    });

    return (
      <main className="messenger">
        {threads}
      </main>
    );
  }
}

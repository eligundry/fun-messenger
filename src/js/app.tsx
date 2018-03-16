import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Messenger } from './components/Messenger';
import { ThreadProps } from './components/Thread';

const testThread: ThreadProps = {
    messages: [
        {
            id: 1,
            text: "Hello world!"
        },
        {
            id: 2,
            text: "Hello back!"
        }
    ]
};

const App = () => (
    <Messenger thread={testThread} />
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

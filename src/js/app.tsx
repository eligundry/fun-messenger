import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Messenger } from './components/Messenger';
import { ThreadProps } from './components/Thread';

const testThread: ThreadProps = {
    messages: [
        {
            text: "Hello world!"
        },
        {
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

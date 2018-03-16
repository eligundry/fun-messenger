import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider></MuiThemeProvider>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

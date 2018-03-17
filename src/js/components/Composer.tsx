import * as React from 'react';

interface ComposerProps {
    placeholder?: string,
}

interface ComposerState {
    value: string = '',
}

export class Composer extends React.Component<ComposerProps, ComposerState> {
    readonly defaultPlaceholder = 'Compse your message...';

    updateMessage(event) {
        this.setState({
            value: event.target.value,
        });

        event.preventDefault();
    }

    handleSubmit(event) {
        // @TODO Send the message
        event.preventDefault();
    }

    render() {
        const handleSubmit = this.handleSubmit.bind(this);
        const updateMessage = this.updateMessage.bind(this);
        const value = this.state ? this.state.value : '';
        const placeholder = this.props ? this.props.placeholder : this.defaultPlaceholder;

        return (
            <form className="composer" onSubmit={handleSubmit}>
                <textarea placeholder={placeholder} value={value} onChange={updateMessage}></textarea>
                <button onClick={handleSubmit}>Send</button>
            </form>
        )
    }
}

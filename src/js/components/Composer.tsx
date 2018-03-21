import * as React from 'react';

interface ComposerProps extends React.Props<Composer> {
    placeholder?: string,
    value?: string,
    onSubmit()?: void,
}

export const Composer: React.SFC<ComposerProps> = (props: ComposerProps) => {
    const { onSubmit, placeholder, text } = props;
    const handleSubmit = () => { onSubmit(); };

    return (
        <form className="composer" onSubmit={handleSubmit}>
            <textarea placeholder={placeholder} value={text}></textarea>
            <button onClick={handleSubmit}>Send</button>
        </form>
    );
};

export default Composer;

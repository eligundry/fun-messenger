import * as React from 'react';
import { connect } from 'react-redux';

import { sendMessageData } from '../actions/messages/send';

interface ComposerProps extends React.Props<Composer> {
  placeholder?: string;
  value?: string;
  onChange(): void;
  sendMessage(): Promise;
  threadID: string;
}

export const Composer: React.SFC<ComposerProps> = (props: ComposerProps) => {
  const { placeholder, value, onChange, threadID } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    props.sendMessage(threadID, value);
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <textarea placeholder={placeholder} value={value} onChange={onChange} />
      <button type="submit" onClick={handleSubmit}>Send</button>
    </form>
  );
};

const mapStateToProps = () => {};
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage(threadID, text) {
      return dispatch(sendMessageData(threadID, text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Composer);

import * as React from 'react';

export interface MessageProps extends React.Props<Message> {
  id: string,
  text: string,
}

export const Message: React.SFC<MessageProps> = (props) => {
  return (
    <div className="message">
      {props.text}
    </div>
  );
};

export default Message

import * as React from 'react';

export const Message: React.SFC<MessageProps> = (props: MessageProps) => {
  return (
    <div className="message">
      {props.text}
    </div>
  );
};

export interface MessageProps extends React.Props<Message> {
  id: string;
  text: string;
}

export default Message;

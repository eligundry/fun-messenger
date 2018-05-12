export enum MESSAGE {
  MESSAGE_SENDING = 'MESSAGE_SENDING',
  MESSAGE_SENT = 'MESSAGE_SENT',
  MESSAGE_SENDING_HAS_FAILED = 'MESSAGE_SENDING_HAS_FAILED',
}

export interface MessageResponse {
  id: string;
  text: string;
}

const faker = require('faker');

import { threads, initialState, ThreadState } from '../threads';
import { THREAD, ThreadResponse } from '../../actions/threads';

const createThreadResponse = (): ThreadResponse => {
  const messageCount = faker.random.number(10);
  let messages = [];

  for (let i = 0; i < messageCount; i++) {
    messages.push({
      id: faker.random.uuid(),
      text: faker.lorem.lines(),
    });
  }

  return {
    id: faker.random.uuid(),
    title: faker.company.bs(),
    messages: messages,
  };
};

const createThreadsResponse = (count: number = 2): ThreadResponse[] => {
  let threads = [];

  for (let i = 0; i < count; i++) {
    threads.push(createThreadResponse());
  }

  return threads;
};

const transformResponseToState = (threadResponse: any): ThreadState => {
  if (threadResponse instanceof Array) {
    return threadResponse.reduce((threads: ThreadState, thread: ThreadResponse) => {
      threads[thread.id] = Object.assign({}, thread);
      threads[thread.id].messages = thread.messages.map((message: MessageResponse) => message.id)
      return threads;
    }, {})
  }

  const newThread = Object.assign({}, threadResponse);
  newThread.messages = threadResponse.messages.map(message => message.id);

  return { [newThread.id]: newThread };
};

describe('threads reducer', () => {
  it('should return the default state', () => {
    expect(threads(undefined, {})).toBe(initialState);
  });

  it('should create a new thread', () => {
    const threadResponse: ThreadResponse = createThreadResponse();

    expect(threads(undefined, {
      type: THREAD.THREAD_CREATED,
      thread: threadResponse,
    })).toEqual(transformResponseToState(threadResponse));
  });

  it('should fetch a single thread', () => {
    const threadResponse: ThreadResponse = createThreadResponse();

    expect(threads(undefined, {
      type: THREAD.THREAD_FETCHED,
      thread: threadResponse,
    })).toEqual(transformResponseToState(threadResponse));
  });

  it('should fetch multiple threads', () => {
    const threadsResponse = createThreadsResponse(3);

    expect(threads(undefined, {
      type: THREAD.THREADS_FETCHED,
      threads: threadsResponse,
    })).toEqual(transformResponseToState(threadsResponse));
  });
});

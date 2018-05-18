import * as React from 'react';

import { ThreadListItem } from './ThreadListItem';

const ThreadList = ({ threads }) => {
  const threadListItems = threads.map(thread => {
    return (
      <ThreadListItem
        key={thread.id}
        {...thread}
      />
    )
  })

  return (
    <div className='thread-list'>
      {threadListItems}
    </div>
  )
};

// BossMessages.tsx

import initialMessages from '@/mockdata/MockMessages';
import React, { useState } from 'react';

export interface Message {
  id: number;
  text: string;
};

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  
  return (
    <div>
      <h1>Boss Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};


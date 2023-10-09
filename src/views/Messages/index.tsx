import initialMessages from "@/mockdata/MockMessages";
import { useState } from "react";

export interface Message {
  kid: number;
  postTime: Date;
  mid: number;
  text: string;
};

const Announcements = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return (
    <div>
      <h2>Boss Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.kid}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;

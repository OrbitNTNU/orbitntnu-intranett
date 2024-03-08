import initialMessages from "@/mockdata/MockMessages";

export interface Message {
  kid: number;
  postTime: Date;
  mid: number;
  text: string;
};

const Announcements = () => {

  return (
    <div>
      <h2>Boss Messages</h2>
      <ul>
        {initialMessages.map((message) => (
          <li key={message.kid}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;

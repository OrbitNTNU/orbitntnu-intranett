import { Message } from "@/views/Messages";

const mockMesages: Message[] = [
    { 
      kid: 1, 
      postTime: new Date("2023-09-28T14:30:00Z"), 
      mid: 1, 
      text: 'Hello, team! Great work this week!' 
    },
    { 
      kid: 2, 
      postTime: new Date("2023-09-26T14:30:00Z"), 
      mid: 1, 
      text: 'We have an important meeting at 2 PM today.' 
    },
    { 
      kid: 3, 
      postTime: new Date("2023-10-03T14:30:00Z"), 
      mid: 2, 
      text: 'Don\'t forget to submit your reports by Friday.' 
    }
  ];

export default mockMesages;
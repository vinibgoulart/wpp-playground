import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';

const helpGptMessage = async (msg: Message) => {
  msg.reply(`*GPT Commands*
- !gpt [text] - Generate text based on the input text
- !resume-start - Start to listen messages to GPT-3 engine (only bot can run this command)
- !resume-stop - Stop to listen messages to GPT-3 engine
- !resume - Resume the messages that were listened to GPT-3 engine
- !resume-daily-sign {todo} - Sign in the daily resume to receive every day a resume of the messages listened to GPT-3 engine (9PM)

*Guidelines*
- You have 5 resumes per day {todo}`);
};

export default middleware(helpGptMessage);

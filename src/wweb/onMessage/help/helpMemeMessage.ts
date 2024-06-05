import { Message } from 'whatsapp-web.js';
import { middleware } from '../../middleware/middleware';

const helpMemeMessage = async (msg: Message) => {
  msg.reply(`*Meme Commands*
- !author [?text] - Create sticker with author image and replied message, if text is provided, it will be added to the sticker
- !quote [?text] - Create sticker with random meme quote image and replied message, if text is provided, it will be added to the sticker
- !drake [text1 - text2] - Create sticker with drake meme image and two texts
- !incrivel [text1 - text2] - Create sticker with incrivel meme image and two texts
- !tiger [text] - Create sticker with tiger meme image and text`);
};

export default middleware(helpMemeMessage);

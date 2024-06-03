type Joke = {
  lng: string;
  sender: string;
  msg: string;
};

const prompts = {
  joke: ({ lng, sender, msg }: Joke) =>
    `I want you make a joke with this phrase, who's sending this message: ${sender} - ${msg}. Translate it to ${lng}.`,
};

export { prompts };

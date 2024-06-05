# wpp-playground-ai

This is a service that listens to messages from a WhatsApp group and saves them for later summarization. All saved messages are used to generate a summary using the OpenAI API.

The service is built using several technologies including TypeScript for static typing, Node.js for the runtime environment, MongoDB for database management, OpenAI for artificial intelligence capabilities, and whatsapp-web.js for interacting with WhatsApp.

The main goal of this project is to provide an efficient way to summarize group conversations, making it easier to catch up on missed discussions.

https://github.com/vinibgoulart/wpp-resume-ai/assets/88122830/a0f491bd-85f9-403c-9804-e9a609892dfb

## Service created using

- typescript
- node
- mongodb
- openai
- whatsapp-web.js
- imgflip

## Prerequisites

- An account in openai with balance to consume in the api

## Run Locally

- Clone the project

```bash
  git clone https://github.com/vinibgoulart/wpp-playground-ai
```

- Go to the project directory

```bash
  cd wpp-playground-ai
```

- Install dependencies

```bash
  yarn install
```

- Create the envs

```bash
  yarn env:example
```

- Build the server

```bash
  yarn build
```

- Start the server

```bash
  yarn start
```

- Read the QRCode in your whatsapp

- Go to a group and run `!start` to start to listen messages

- When you want to resume the messages, run `!resume`

## API Reference

| Input     | Description                                                   |
| :-------- | :------------------------------------------------------------ |
| `!start`  | Start to listend new messages to resume                       |
| `!stop`   | Stop to listend new messages to resume                        |
| `!resume` | Resume the messages saved, after resume the messages restored |

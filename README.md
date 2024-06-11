# wpp-playground-ai

This is a service that listens to messages from a WhatsApp group and saves them for later summarization. All saved messages are used to generate a summary using the OpenAI API.

The service is built using several technologies including TypeScript for static typing, Node.js for the runtime environment, MongoDB for database management, OpenAI for artificial intelligence capabilities, and whatsapp-web.js for interacting with WhatsApp.

The main goal of this project is to provide an efficient way to summarize group conversations, making it easier to catch up on missed discussions.

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
  git clone https://github.com/vinibgoulart/wpp-playground
```

- Go to the project directory

```bash
  cd wpp-playground
```

- Install dependencies

```bash
  yarn install
```

- Create the envs

```bash
  yarn env:example
```

- Start the server

```bash
  yarn dev
```

- Read the QRCode in your whatsapp

- Run `!help` to see the available commands

## Run with Docker

- Run only the database

```bash
  yarn run-db
```

- Run only the app

```bash
  yarn run-app
```

- Run everything with docker

```bash
  yarn run-docker
```

# Intelli

Intelli is a simple Discord bot that allows users to communicate with any OpenRouter model. It uses [Deepseek R1 0528](https://openrouter.ai/deepseek/deepseek-r1-0528:free) by default.

The idea behind this bot is to use the free variants provided by OpenRouter to enable free and easy access to large language models.

## Prerequisities

### Creating a Discord bot

To get a Discord bot secret, go to https://discord.com/developers/applications and create a new application. In the application go to the Bot section and click 'Reset Token' > Follow the prompts to get your bot secret.

### Getting an OpenRouter API key

To get an OpenRouter API key, create an account at https://openrouter.ai/ and go to https://openrouter.ai/settings/keys to create an API key.

## Docker
To run in docker, simply pass `OPENROUTER_API_KEY` and `DISCORD_BOT_SECRET` as environment variables.

## Local setup

Create a .env file locally, and provide the required `DISCORD_BOT_SECRET` and `OPENROUTER_API_KEY` variables. Run `pnpm install`, `pnpm build` and `pnpm start`
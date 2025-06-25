
import { Client, Events, GatewayIntentBits } from 'discord.js';
import OpenAI from 'openai';

import 'dotenv/config';

const secretToken = process.env.DISCORD_BOT_SECRET;
const model = "deepseek/deepseek-r1-0528:free"

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.on(Events.ClientReady, () => {
    if (!client.user) {
        console.error("Client user is not defined.");
        return;
    }
    console.log(`Logged in as ${client.user.username}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (!client.user) console.error("Client user is not defined.");
    if (!message.mentions.has(client.user)) console.error(`Message does not mention the bot ${client.user?.username}`);
    if (message.author.bot) console.error("Message is from a bot, ignoring.");
    if (!client.user || !message.mentions.has(client.user) || message.author.bot) return;

    const userMessage = message.content.replace(`<@${client.user.id}>`, '').trim();

    message.channel.sendTyping();

    const completion = await openai.chat.completions.create({
        model: model,
        messages: [
            { role: 'system', content: 'You are a helpful assistant that responds to user queries on Discord. Responses must be less than 2000 characters in length at all times. Your responses will always be appended to the query as a reply, so there is no need to mention users.' },
            { role: 'user', content: userMessage },
        ],
    });

    if (!completion.choices || completion.choices.length === 0) {
        console.error("No choices returned from OpenAI API.");
        return message.reply({
            content: "Sorry, I couldn't generate a response."
        });
    }

    if (completion.choices[0].finish_reason !== 'stop') {
        console.error(`Unexpected finish reason: ${completion.choices[0].finish_reason}`);
        return message.reply({
            content: "Sorry, I couldn't generate a response."
        });
    }

    if (completion.choices[0].message.content === null) {
        console.error("Received null content from OpenAI API.");
        return message.reply({
            content: "Sorry, I couldn't generate a response."
        });
    }

    message.reply({
        content: completion.choices[0].message.content,
    })
});

client.login(secretToken);
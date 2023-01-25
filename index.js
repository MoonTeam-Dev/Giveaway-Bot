const { Client, Collection } = require('discord.js');
const { version: discordjsVersion } = require("discord.js");
const os = require("os")
const chalk = require("chalk")
const data = require('croxydb')
const fs = require('fs')
const { prefix } = require("./config.json");
const client = new Client()
client.commands = new Collection()
client.db = data;
require('discord-buttons')(client)

const MessageMenu = require("discord-buttons")
client.on('ready', () => {
  console.log(chalk.bold.yellow(`──────────────[Success]──────────────`)),
  console.log(chalk.bold.white(`│•❄ ━│Logged In: `+chalk.bold.red(`${client.user.tag}      │`))),
  console.log(chalk.bold.white(`│•❄ ━│Developer: `)+chalk.bold.italic.blue(`- ᴘᴀʀᴢɪᴠᴀʟ ☾       │`)),
  console.log(chalk.bold.white(`│•❄ ━│Support: `) +chalk.hex("#af7505").italic.bold(`🌙 • MoonTeam        │`)),
  console.log(chalk.bold.white(`│•❄ ━│Watching: `+chalk.bold.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}                │`))),
  console.log(chalk.bold.white(`│•❄ ━│Guilds: `+chalk.hex('#80027e').bold(`${client.guilds.cache.size}                     │`))),
  console.log(chalk.bold.white(`│•❄ ━│Commands: `+chalk.hex('#80027e').bold(`${client.commands.size}                   │`))),
  console.log(chalk.bold.white(`│•❄ ━│Prefix: ` + chalk.bold.red(`${ prefix }                     │`)))
  console.log(
    chalk.bold.white(`│•❄ ━│Discord: `+chalk.hex('#2d8003').bold(`${discordjsVersion}               │`)+chalk.bold.white(`\n│•❄ ━│Node: `)+chalk.hex('#036f80').bold(`${process.version}                │`))
  );
  console.log(chalk.bold.white(`│•❄ ━│Memory: `+chalk.hex('#af7505').bold(`${(process.memoryUsage().rss / 1024 / 1024).toFixed(
    2 
    )} MB RSS          │`)+chalk.bold.white(`\n│•❄ ━│Memory: `)+chalk.hex('#7e2905').bold(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
    2
    )} MB              │`)
    )
  );
  console.log(chalk.bold.white(`│•❄ ━│`) +chalk.hex("#af7505").bold(`https://discord.gg/moonteam   │`)),
  console.log(chalk.bold.yellow(`─────────────────────────────────────`)),
  client.user.setActivity(`${ prefix }` + 'help | GIVEAWAY', { type: "LISTENING" }).catch(console.error)
});

client.on('message', (message) => {
  let prefix = "!";
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args);
});

fs.readdir('./cmds/', (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let cmd = require(`./cmds/${f}`);
      client.commands.set(cmd.name, cmd);
  });
});

client.login('MTAxMzYwNjAyMTMwMzkwNjM5Ng.GDYhnS.vr-qxAaB3zTwfVf87oolFKg1BOhqs8G9Bvs9d0');
require("http").createServer((req, res) => res.end("Put This Link In Uptimerobot ↑")).listen(process.env.PORT || 8080)
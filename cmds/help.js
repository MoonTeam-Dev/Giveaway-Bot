const discord = require("discord.js");

module.exports = {
  name: "help",
  category: "info",
  description: "HELP.JS",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`Help Documents Overview:`)
    .setThumbnail(`${client.user.displayAvatarURL()}`)
    .setDescription("**Commands**\n\n<a:952707966887399435:968546327795466241> • **start**      `[starting a giveaway]`\n<a:952707966887399435:968546327795466241> • **reroll**      `[rerolling giveaway]`\n<a:952707966887399435:968546327795466241> • **end**      `[end giveaway]`")
    .setColor("#0a9687")
    .setFooter(`Giveawy Bot`, `${message.author.displayAvatarURL()}`)
  .setTimestamp(message.timestamp = Date.now())
    
    message.channel .send(embed)
    
  
  }
}
const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
  name: "reroll"
};
module.exports.run = async (client, message, args) => {
  let error = new MessageEmbed().setColor('RED').setTimestamp();
  if(!message.member.permissions.has('MANAGE_GUILD')) {
      return message.channel.send(error.setDescription('**<a:Stare005:968889289385599076> Missing Permission**'));
  };
  let gwId = args[0];
  if(!gwId) return message.channel.send(error.setDescription('**<a:Stare005:968889289385599076> Invalid Giveaway ID**'));
  let End = client.db.fetch(`gwReroll_${message.guild.id}`);
  let Id = client.db.fetch(`gwEnd_${message.guild.id}`);
  if(!Id) return message.channel.send(error.setDescription('**<a:Stare005:968889289385599076> Invalid Giveaway**'));
  if(!End) {
    return message.channel.send(error.setDescription('**<a:tik003:968889406150832128> The Giveaway You Specified Haven\'t Finished Yet**'))
  } else {
    if(Id.key == gwId) {
      let channel = Id.channel;
      let key = client.db.fetch(`gwUsers_${message.guild.id}`);
      if(!key) {
        let gwEndedEmbed2 = new MessageEmbed()
        .setDescription(`<a:CT_giveawaygif:968455234017984532> Prize: **${Id.prize}**\n<a:tik003:968889406150832128> Winner(s): **No winners!**`)
        .setColor('#0a9687')
        .setTimestamp()
        .setFooter('Rerolled at');
        return message.guild.channels.cache.get(channel).messages.cache.get(gwId).edit({ embed: gwEndedEmbed2 }).then(() => {
          client.channels.cache.get(channel).send(`Not Enough Entrants To Determine A Winner!`)
        });
      } else {
        let winners = client.db.get(`gwUsers_${message.guild.id}`)[Math.floor(Math.random()*client.db.get(`gwUsers_${message.guild.id}`).length)];
        let gwEndedEmbed = new MessageEmbed()
        .setDescription(`<a:CT_giveawaygif:968455234017984532> Prize: **${Id.prize}**\n<:CT_gift:968455285322690600> Winner(s): <@${winners}>`)
        .setColor('#0a9687')
        .setTimestamp()
        .setFooter('Rerolled at');
        return message.guild.channels.cache.get(channel).messages.cache.get(gwId).edit({ embed: gwEndedEmbed }).then(() => {
          return client.channels.cache.get(channel).send(`<a:952707966887399435:968546327795466241> The New Winner Is <@${winners}>, Congratulations!`)
        });
      }
    } else {
      let embed2 = new MessageEmbed()
      .setDescription('**<a:Stare005:968889289385599076> Invalid Giveaway ID**')
      .setColor('#0a9687')
      .setTimestamp()
      .setFooter('Failed at');
      return message.channel.send(embed2);
    }
  };
};
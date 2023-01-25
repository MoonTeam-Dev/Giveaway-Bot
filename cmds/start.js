const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const moment = require('moment');
const ms = require('ms');

module.exports = {
  name: "start",
  aliases: ['str', 's'],
}
module.exports.run = async (client, message, args) => {
  let error = new MessageEmbed().setColor('RED').setTimestamp();
  if(!message.member.permissions.has('MANAGE_GUILD')) {
      return message.channel.send(error.setDescription('**Missing Permission**'));
  };
  let time = args[0];
  let winnersCount = args[1];
  let prize = args.slice(2).join(" ");
  if(!time) return message.channel.send(error.setDescription('**<a:Stare005:968889289385599076> Specify A Time!**'));
  if(!winnersCount) return message.channel.send(error.setDescription('**<a:Stare005:968889289385599076> Specify The Number Of Winner Count**'));
  if(!prize) return message.channel.send(error.setDescription('**<a:Stare005:968889289385599076> Specify A Prize!**'));
  let gwTime = ms(time);
  let gwEmbed = new MessageEmbed()
  .setDescription(`**React with Button Blow**
<a:CT_giveawaygif:968455234017984532> ● Prize: ${prize}
<a:CT_giveawaygif:968455234017984532> ● Winner(s): ${winnersCount}
<a:CT_giveawaygif:968455234017984532> ● Hosted by: ${message.author}
<a:CT_giveawaygif:968455234017984532> ● Time remaining: ${time}

<a:CT_giveawaygif:968455234017984532> ● [Invite Bot](https://discord.com/api/oauth2/authorize?client_id=1013606021303906396&permissions=8&scope=bot%20applications.commands)`)
 
  .setColor('#0a9687')
  .setTimestamp()
  .setFooter('Started at');
  let embedButton = new MessageButton()
  .setStyle('grey')
  .setEmoji('889032238866526288')
  .setID('gwButton');



  let msg = await message.channel.send({ buttons: [embedButton], embed: gwEmbed }).then(me => {
    let channelId = message.channel.id;
    let msgId = me.id;
    client.db.set(`gwEnd_${message.guild.id}`, { key: msgId, prize: prize, channel: channelId });
    async function edit() {
      let winners = client.db.get(`gwUsers_${message.guild.id}`)[Math.floor(Math.random()*client.db.get(`gwUsers_${message.guild.id}`).length)];
		
      let gwEndedEmbed = new MessageEmbed()
      .setDescription(`<a:Hypr_BLUEAWAY:931927771565928528> Prize: **${prize}**\n● Winner(s): <@${winners}>`)
      .setColor('#0a9687')
      .setTimestamp()
      .setFooter('Ended at');
      me.edit({ embed: gwEndedEmbed }).then(() => {
        client.db.delete(`gwEntry_${message.guild.id}`),
        client.channels.cache.get(channelId).send(`<a:Stare007:968889162260439080> Hey, Congratulations You Won This Giveaway. 
        <:CT_gift:968455285322690600>**__Members Won Giveaway:__** <@${winners}>
        <a:tik003:968889406150832128>**__You Got Prize:__** **${prize}**!`)
      })
    }
    async function lockGw() {
      let gwEndedEmbed1 = new MessageEmbed()
      .setDescription(`<a:CT_giveawaygif:968455234017984532>  Prize: **${prize}**\n<a:952707966887399435:968546327795466241>  Winner(s): **No winners!**`)
      .setColor('#0a9687')
      .setTimestamp()
      .setFooter('Ended at');
      me.edit({ embed: gwEndedEmbed1 }).then(() => {
        client.db.delete(`gwEntry_${message.guild.id}`),
        client.channels.cache.get(channelId).send(`Not Enough Entrants To Determine A Winner!`)
      })
    }
    message.delete(); 
    let filter = m => m.clicker.user.id !== client.user.id;
    let cl = me.createButtonCollector(filter);
    cl.on('collect', async (button) => {
      if (button.id == "gwButton") {
        let userId = button.clicker.user.id;
        client.users.cache.get(userId).send('**<a:Stare007:968889162260439080> Your Entry Has Been Approved For **'+prize+'<a:Stare007:968889162260439080> ')
        client.db.push(`gwUsers_${message.guild.id}`, userId)
      };
    });
    setTimeout(function() {
      let g = client.db.fetch(`gwUsers_${message.guild.id}`);
      if(!g) {
        lockGw()
        client.db.set(`gwReroll_${message.guild.id}`, { Set: 2 });
      } else {
        edit()
        client.db.set(`gwReroll_${message.guild.id}`, { Set: 1 });
      };
    }, gwTime);
  });
}
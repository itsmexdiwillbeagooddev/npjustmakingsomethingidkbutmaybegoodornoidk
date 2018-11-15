const Discord = require("discord.js");

exports.run = function(client, message, args)
{
    message.channel.send(new Discord.RichEmbed()
		.setAuthor(message.author.tag , message.author.displayAvatarURL)
        .setColor('RED')
        .addField("Time Taken: " , `:hourglass: **${Math.abs(Date.now() - message.createdTimestamp)} ms.**`)
		.addField("Discord API: " , `:signal_strength: **${Math.round(client.ping)} ms.**`)
        .setFooter(client.user.username, client.user.avatarURL))
};

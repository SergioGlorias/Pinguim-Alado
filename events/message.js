module.exports = async (client, message) => {
    if (!message.member || message.author.bot) return
    console.log(message.content)
    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
        message.channel.send(`Olá ${message.author}, eu sou ${client.user} e estou aqui para ajudar! O meu prefixo é : \`\``)
    }

}
const message = require("../events/message");

module.exports = {
    help: {
        name: "ping",
        aliase: ["p"],
        help: {
            basic: "",
            complex: async () => {}
        }
    },
    config: {
        private: false,
        dev: false,
        botPerm: {
            guild: 0,
            channel: 0
        },
        memberPerm:{
            guild: 0,
            channel: 0
        },
    },

    run: async (client, message, args) => {
        const m = await message.channel.send("Ping?")
        const wsPing = client.ws.ping
        const botPing = m.createdTimestamp - message.createdTimestamp
        m.edit(`Pong!!\nPing WebSocket: \`${wsPing}\`\nPing Bot: \`${botPing}\``)
    } 
}
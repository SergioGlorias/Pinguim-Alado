const 
    Discord = require("discord.js"),            //Chamar Api do discord
    { token } = require("./config/token.json"), //Arquivo do Token
    fs = require("fs")                          //Chamar sistema File System

//Criar o o sistema do bot
const client = new Discord.Client({ 
    ws: {
        intents: [ /* Inteções ao usar o codigo ao discord*/ 
            "DIRECT_MESSAGES",          //Intenção de enviar mensagens na DM das pessoas
            "DIRECT_MESSAGE_REACTIONS", //Intenção de reagir mensagens na DM das pessoas
            "GUILDS",                   //Intenção de mexer no servidor de discord
            "GUILD_BANS",               //Intenção de banir pessoas no servidor
            "GUILD_MEMBERS",            //Intenção de saber quais os membros do servidor
            "GUILD_MESSAGES",           //Intenção de mexer com mensagens no servidor
            "GUILD_MESSAGE_REACTIONS"   //Intenção de poder mexer com reações de mensagens de servidores
        ]
    }
})

/* configuração para ativar os comandos */
global.commads = {} //Variavel Global para guardar comandos
global.aliase = new Map()

const nameDirCommads = "./commads/"  //variavel com o camingo inicial da pasta de comandos 

fs.readdirSync(nameDirCommads, {withFileTypes: true}).forEach(async (file) => { //verificar o que tem lá dentro 
    let arquivo = file
    let nameDir = nameDirCommads
    const files = []

    if (arquivo.isDirectory()) {         // verificar se é 1 uma pasta
        nameDir = nameDir + `${arquivo.name}/` //se for pasta criar 1 caminho delativo da pasta
        fs.readdirSync(nameDir, {withFileTypes: true}).forEach((file) => files.push(file))
    } else files.push(arquivo)

    files.forEach(async (file) => {
        if (file.isFile() && file.name.split(".").slice(-1)[0] === "js") {
            try {
                let cmd = require(nameDir + file.name)
                commads[cmd.help.name] = cmd
                for (const i of cmd.help.aliase) {
                    aliase.set(i, cmd.help.name)
                }
                console.log(`Comando ${cmd.help.name} fui iniciado com sucesso`)
            } catch (err) {
                console.error(`Falha ao ler o comando ${file.name}`)
            }
        }
    })
})
/* ------------------------------------------------------ */


/* registrar o eventos */
fs.readdirSync('./events/', {withFileTypes: true}).forEach((file) => {                                            //vericar que tem dentro
    if (file.isFile && file.name.split('.').slice(-1)[0] === 'js') {                            //verificar se o arquivo termina em .js
        const name = file.name.split('.')[0]                                     //obter o nome do evento
        const run = require(`./events/${file.name}`)                             //fazer require do arquivo
        client.on(name, run.bind(null, client))                             //iniciar o evento 
    }
})
/* ------------------------------------------------------ */

client.login(token) //fazer login na API do discord


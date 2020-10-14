const 
    Discord = require("discord.js"),            //Chamar Api do discord
    { token } = require("./config/token.json"), //Arquivo do Token
    fs = require("fs")                          //Chamar sistema File System

//Criar o o sistema do bot
const client = new Discord.Client({ 
    ws: {
        intents: [ /* Inteções ao usar o codigo ao discord */
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

const
    linkFileCommads = [],           //Varialvel que guarda camonhos relativos dos comandos
    nameDirCommads = "./commads/",  //variavel com o camingo inicial da pasta de comandos 
    commads = fs.readdirSync(nameDirCommads, {withFileTypes: true}) //ler a pasta de comandos 
commads.forEach(async (file) => {   //verificar o que tem lá dentro 
    if (file.isDirectory) {         // verificar se é 1 uma pasta
        const nameDir = nameDirCommads + `${file.name}/` //se for pasta criar 1 caminho delativo da pasta
        const dir = fs.readdirSync(nameDir, {withFileTypes: true})  //ler essa pasta
        dir.forEach(async (file) => {   //verificar a pasta
            if (file.isFile && file.name.split(".").slice(-1)[0] === "js") { //verifica se é um arquivo e se é .js 
                linkFileCommads.push({  //adcionar ao caminho realivo ao array
                    name:file.name.split(".")[0],   //nome do arquivo
                    link:nameDir + file.name        //link relativo 
                })
            }
        })
    }
    if (file.isFile && file.name.split(".").slice(-1)[0] === "js") {
        linkFileCommads.push({ //adcionar ao caminho realivo ao array
            name: file.name.split(".")[0], //nome do arquivo
            link: nameDirCommads + file.name //link relativo 
        })
    }
})

linkFileCommads.forEach(async (link) => { //ligar o comandos que foram recolidos!!
    try {
        commads[link.name] = require(link.link) 
        console.log(`Comando ${link.name} inicado com sucesso!!`)
    } catch (err) {
        console.error(`Falha ao iniciar o comando: ${link.name}`, err)
    }
})
/* ------------------------------------------------------ */


/* registrar o eventos */
const events = fs.readdirSync('./events/')          //ler a pasta eventos
events.forEach(async (file) => {                    //vericar que tem dentro
    if (file.split('.').slice(-1)[0] === 'js') {    //verificar se o arquivo termina em .js
        const name = file.split('.')[0]             //obter o nome do evento
        const run = require(`./events/${file}`)     //fazer require do arquivo
        client.on(name, run.bind(null, client))     //iniciar o evento 
    }
})
/* ------------------------------------------------------ */

client.login(token) //fazer login na API do discord


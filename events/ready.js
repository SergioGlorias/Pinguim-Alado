module.exports = async (client) => {
    console.log(`${client.user.tag} fui iniciado com sucesso!!`)
    console.log(await client.generateInvite({
        permissions: 8
    }))
}
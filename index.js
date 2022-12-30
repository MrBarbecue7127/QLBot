/*  index.js

 For help, go to the repositorie on GitHub

*/ 

//Ideia function
async function ideia(titulo, qeps, roteiro2)
{

}

// Packages
require('dotenv').config()
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LegacySessionAuth, MessageMedia } = require('whatsapp-web.js');
const Database = require('easy-json-database');
const database = new Database("db.json");
const Translator = require('translator');
var tradutor = new Translator('./app/lang');
tradutor.language = 'pt';

// Config
const config = require("./config.json")
const country_code = config.country_code;
const number = config.number;
const prefix = 'dj';

// Initialize code
const SESSION_FILE_PATH = "./session.json";
let sessionData;

if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    authStrategy: new LegacySessionAuth({
        session: sessionData
    })
});

client.initialize();


// Generate QR Code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Errors on auth
client.on('authenticated', session => {
    sessionData = session;

    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if(err) {
            console.log(err);
        }
    })
})

client.on('auth_failure', msg => {
    console.error("[DippiBOT] Há um erro na autenticação: " + '"' + msg + '"');
})

// Bot ready
client.on('ready', () => {
    console.log("[DippiBOT] O BOT foi inicializado corretamente!");
})


/* Commands

*/
client.on('message', msg => {
    // Ajuda
    if(msg.body == String(prefix + "ajuda")) {
        client.sendMessage(msg.from, String(`[Dippi Jeans]\n\n` + prefix + 'ajuda - Este comando\n\n' + prefix + 'moedas - Mostra quantas moedas você tem\n\n' + prefix + 'nivel - Mostra o seu nível atual de acordo com a quantidade de moedas\n\n' + prefix + 'itens - Mostra os itens da loja\n\n' + prefix + 'comprar spoiler - Para a compra de spoilers\n\n'
        ))
    } 
    
});

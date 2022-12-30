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
    fs.unlink('session.json', function (err){
        if (err) throw err;
        console.log('[QLBot] Para confirmar a inicialização, digite o comando:', 'npm start', 'novamente');
    })
})

// Bot ready
client.on('ready', () => {
    console.clear();
    console.log("[QLBOT] O BOT foi inicializado corretamente!");
})


/* Commands

*/
client.on('message', msg => {
    // Ajuda
    if(msg.body == String(prefix + "ajuda")) {
        client.sendMessage(msg.from, String(`[QLBOT]\n\n` + prefix + 'ajuda - Este comando'
        ))
    } 
    
});

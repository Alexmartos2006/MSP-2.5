const mineflayer = require('mineflayer'); // importar el módulo de mineflayer.
const prefix = '!'; // activar el comando con el prefijo '!'

const bot = mineflayer.createBot({  // creación del bot.
  host: '100.87.107.68', // minecraft server ip
  username: '---AFK-PLAYER---', // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
  // auth: 'microsoft'         // for offline mode servers, you can set this to 'offline'
  port: 25565,              // set if you need a port that isn't 25565
  version: "1.18.2",           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
});

bot.on('chat', (username, message) => {
  if (username == bot.username) return

  if(!message.startsWith(prefix)) {
    return;
  }
  const args = message.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command == 'di') {
      bot.chat(args.join(' '));
  }
});

// Muestra los errores en la consola o motivos de explusación:
bot.on('kicked', console.log);
bot.on('error', console.log);
const mineflayer = require('mineflayer'); // importar el módulo de mineflayer.
const prefix = '!'; // activar el comando con el prefijo '!'
const { mineflayer: mineflayerViewer } = require('prismarine-viewer') // importar el modulo mineflayerViewer


const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals




const bot = mineflayer.createBot({  // creación del bot.
  host: '100.87.107.68', // minecraft server ip
  username: '---AFK-PLAYER---', // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
  // auth: 'microsoft'         // for offline mode servers, you can set this to 'offline'
  port: 25565,              // set if you need a port that isn't 25565
  version: "1.18.2",           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
});



bot.once('spawn', () => {
  // Once we've spawn, it is safe to access mcData because we know the version
  const mcData = require('minecraft-data')(bot.version);


  // A new movement instance for specific behavior
  const defaultMove = new Movements(bot);

  defaultMove.allow1by1towers = false;
  defaultMove.canDig = true;
  defaultMove.allowParkour = true;
  defaultMove.allowSprinting = true;
  defaultMove.scafoldingBlocks = [];


  defaultMove.scafoldingBlocks.push(bot.registry.itemsByName['dirt'].id);


  bot.pathfinder.setMovements(defaultMove);
  mineflayerViewer(bot, { port: 3007, firstPerson: true }) // El puerto es el puerto del servidor de Minecraft. Si la primera persona es falsa, obtendrás una vista panorámica.
})




// Activar para el bot diga alguna frase con el comando '!di'
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

// Activar al bot para que venga hacia a mí con el comando '!ven'  
  if(command == 'ven') {
    if (username === bot.username) return

    const target = bot.players[username] ? bot.players[username].entity : null
    if (message === 'ven') {
      if (!target) {
        bot.chat('I don\'t see you !')
        return
      }
        const p = target.position
        bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
    } 
  }
});




// Muestra los errores en la consola o motivos de explusación:
bot.on('kicked', console.log);
bot.on('error', console.log);
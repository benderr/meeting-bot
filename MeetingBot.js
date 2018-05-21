const Telegraf = require('telegraf');

class MeetingBot {
    constructor({token, config, admins = []}) {
        this._bot = new Telegraf(token, config);
        this._admins = admins || [];
    }

    start() {
        this._registerCommands();
        this._bot.startPolling();
    }

    _registerCommands() {
        //bot.help((ctx) => ctx.reply('Send me a sticker'))
        //bot.on('sticker', (ctx) => ctx.reply('👍'))
        //bot.hears('hi', (ctx) => ctx.reply('Hey there'))
        //bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'));
        //bot.hears(/buy/i, (ctx) =>);
        this._bot.start((ctx) => ctx.reply('Welcome! This is brain fucker bot!'));
        this._bot.hears('/check', (ctx) => this.handleCommandCheck(ctx))
    }

    _checkAccess(ctx) {
        return ctx.getChatAdministrators(ctx.chat.id)
            .then(admins => {
                if ([...this._admins, ...admins.map(s => s.user.username)].indexOf(ctx.from.username) === -1) {
                    ctx.reply('Great attempt ' + ctx.from.first_name + ', but not 👎');
                    return Promise.reject('');
                }
            });
    }

    handleCommandCheck(ctx) {
        this._checkAccess(ctx).then(() => this._analyzeChat(ctx))
    }

    _analyzeChat(ctx) {
        ctx.reply('Analysed');
    }
}

module.exports = MeetingBot;
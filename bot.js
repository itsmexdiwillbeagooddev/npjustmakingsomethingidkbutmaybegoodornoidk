const init = async () => {

    const cmdFiles = await readdir('./commands/');
    client.commandsNumber = cmdFiles.length;
    client.log('log', `Loading a total of ${client.commandsNumber} commands.`, 'LOAD');
    cmdFiles.forEach(f => {
        try {
            const props = require(`./commands/${f}`);
            if (f.split('.').slice(-1)[0] !== 'js') return;
            client.log('log', `Loading Command: ${props.help.name}.`, 'LOAD');
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        } catch (e) {
            client.log('ERROR', `Unable to load command ${f}: ${e}`);
        }
    });

    const evtFiles = await readdir('./events/');
    client.log('log', `Loading a total of ${evtFiles.length} events.`, 'LOAD');
    evtFiles.forEach(file => {
        const eventName = file.split('.')[0];
        client.log('log', `Loading Event: ${eventName}.`, 'LOAD');
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    var token = client.config.token;

    process.on('unhandledRejection', err => {
        if (err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
            client.log('ERROR', `Bot connection error: ${err.code}`);
        } else {
            client.log('ERROR', `Uncaught Promise Error: \n${err.stack}`);
        }
    });

    client.login(token);


};

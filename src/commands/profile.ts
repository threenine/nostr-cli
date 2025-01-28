import { CommandModule } from 'yargs';
import {command} from "./command";

const helloCommand: CommandModule = {
    command: command.hello,
    describe: 'Greet a user',
    builder: {
        name: {
            describe: 'Name of the user',
            demandOption: true,
            type: 'string',
        },
        age: {
            describe: 'Age of the user',
            demandOption: false,
            type: 'number',
        },
    },
    handler: async (argv) => {
        if (argv.age) {
            console.log(`${command.hello}, ${argv.name}! You are ${argv.age} years old.`);
        } else {
            console.log(`Hello, ${argv.name}!`);
        }
    },
};

export default helloCommand;
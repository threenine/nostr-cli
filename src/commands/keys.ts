import {CommandModule} from "yargs";
import {command} from "./command";
import process from "node:process";
import {nip19, generateSecretKey, getPublicKey} from "nostr-tools";
import chalk from "chalk";


const keysCommand: CommandModule = {
    command: command.keys,
    describe: 'create new public and private key pair',
    handler: () => {

        let sk = generateSecretKey() // `sk` is a Uint8Array
        let pk = getPublicKey(sk) //

        console.log( chalk.green(`Private key: ${nip19.nsecEncode(sk)}`));
        console.log(chalk.blue( `Public key: ${nip19.npubEncode(pk)}`));
        process.exit(0);
    }

};

export default keysCommand;
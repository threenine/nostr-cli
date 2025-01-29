import {CommandModule} from "yargs";
import {command} from "./command";
import process from "node:process";
import {nip19, generateSecretKey, getPublicKey} from "nostr-tools";
import chalk from "chalk";
import {promises as fs} from "fs";


const keysCommand: CommandModule = {
    command: command.keys,
    describe: 'create new public and private key pair',
    builder: {
        output: {
            describe: 'write output to file in your current directory',
            demandOption: false,
            type: 'boolean',
            default: false
        },
    },
    handler: async (argv) => {

        console.log(chalk.yellow('Make a note of your private key, it is the only way to recover your account.'))

        let sk = generateSecretKey();
        let pk = getPublicKey(sk);

        let privateKey: any = nip19.nsecEncode(sk);
        let publicKey: any = nip19.npubEncode(pk);

        console.log(`Private key: ${chalk.green(privateKey)}`);
        console.log(`Public key:  ${chalk.blue( publicKey)}`);

        if(argv.output){
          let result=  await writeToFile(privateKey, publicKey);
          console.log(chalk.green(`output to file: ${result.fileName}`))

        }

        process.exit(0);
    }

};
async function writeToFile(privateKey: string, publicKey: string): Promise<{ success: Boolean, fileName: string }> {

    let outputFilePath = `./nostr-keys.txt`;
    let output = `Private key: ${privateKey}\nPublic key:  ${publicKey}\n`;
    await fs.writeFile(outputFilePath, output, 'utf-8');
    return {success: true, fileName: outputFilePath}
}
export default keysCommand;
import {CommandModule} from 'yargs';
import {command} from "./command";
import {NdkService} from "../services/NdkService";
import {promises as fs} from 'fs'
import {NDKUserProfile} from "@nostr-dev-kit/ndk";
import * as process from "node:process";
import chalk from "chalk";

const profileCommand: CommandModule = {
    command: command.profile,
    describe: 'Greet a user',
    builder: {
        npub: {
            describe: 'npub of the user',
            demandOption: true,
            type: 'string',
        },
        output: {
            describe: 'should write to file',
            demandOption: false,
            type: 'boolean',
            default: false
        },
    },
    handler: async (argv) => {
        if (argv.npub) {
            let profile = await getProfile(argv.npub.toString())
            console.log(profile)
            if (argv.output && profile !== undefined) {
                let result = await writeToFile(argv.npub.toString(), profile)
                if(result.success) {
                    console.log(chalk.green(`output to file: ${result.fileName}`))
                } else {
                    console.log(chalk.red(`Failed to write profile to ${result.fileName}`))
                    process.exit(7)
                }
            }
        }
        process.exit(0);
    },
};

async function writeToFile(npub: string, profile: NDKUserProfile): Promise<{ success: Boolean, fileName: string }> {

    let outputFilePath = `./${npub}.json`;
    await fs.writeFile(outputFilePath, JSON.stringify(profile, null, 2), 'utf-8');
    return {success: true, fileName: outputFilePath}
}

async function getProfile(npub: string): Promise<NDKUserProfile | undefined> {
    let ndk = await NdkService.getInstance().getNDK()
    const user = ndk.getUser({npub: npub as string});
    await user.fetchProfile()
    return user.profile
}

export default profileCommand;
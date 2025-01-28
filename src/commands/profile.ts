import {CommandModule} from 'yargs';
import {command} from "./command";
import {NdkService} from "../services/NdkService";

const profileCommand: CommandModule = {
    command: command.profile,
    describe: 'Greet a user',
    builder: {
        npub: {
            describe: 'npub of the user',
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
        if (argv.npub) {
            console.log("npub: ", argv.npub)
            await getByPubkey(argv.npub.toString())
        }
    },
};

async function getByPubkey(npub: string): Promise<void> {
    let ndk = await NdkService.getInstance().getNDK()


    const user = ndk.getUser({ npub: npub as string});

    await user.fetchProfile()
    console.log(user.profile)
    process.exit(0);

}

export default profileCommand;
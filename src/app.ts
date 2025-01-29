#!/usr/bin/env node
import 'reflect-metadata';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import profileCommand from './commands/profile';
import keysCommand from "./commands/keys";




// Register commands
yargs(hideBin(process.argv))
    .command(keysCommand)
    .command(profileCommand)
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
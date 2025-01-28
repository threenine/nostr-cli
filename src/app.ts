#!/usr/bin/env node
import 'reflect-metadata';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import profileCommand from './commands/profile';




// Register commands
yargs(hideBin(process.argv))
    .command(profileCommand)
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
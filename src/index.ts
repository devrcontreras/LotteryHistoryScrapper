import { error } from 'console';
import * as lotteryService from './services/lotteryService.js';

async function main(){

    await lotteryService.getLoto(2018);
    await lotteryService.getKino(2010);
}

main().catch(error);
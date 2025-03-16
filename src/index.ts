import { error } from 'console';
import * as lotoScrapperService from './services/lotoScrapperService.js';
import { delay } from './utils/delay.js';

async function main(){

    const currentYear = new Date().getFullYear();

    for(let year = 2018; year <= currentYear; year++){

        console.log(`scrapping year: ${year}`);

        var drawResult = await lotoScrapperService.getLoto(year);

        console.log(drawResult);

        console.log(`waiting 10 seconds...`);

        await delay(10000);
    }
}

main().catch(error);
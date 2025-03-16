import { error } from 'console';
import * as lotoScrapperService from './services/lotoScrapperService.js';

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

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(error);
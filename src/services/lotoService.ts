import * as lotoScrapperService from './lotoScrapperService.js';
import * as lotoRepository from '../repositories/lotoRepository.js';
import { delay } from '../utils/delay.js';

export async function getLoto(year:Number){

    const currentYear = new Date().getFullYear();

    for(let year = 2018; year < currentYear; year++){

        console.log(`scrapping year: ${year}`);

        try
        {

            const yearlyDrawResult = await lotoScrapperService.getLoto(year);
            await Promise.all(yearlyDrawResult.map(loto => lotoRepository.addLoto(loto)));

        }
        catch(error){
            console.log(error);
        }        

        console.log(`waiting 10 seconds...`);

        await delay(10000);
    }

    try{
        
        const currentYearDrawResult = await lotoScrapperService.getLotoCurrentYear();
        await Promise.all(currentYearDrawResult.map(loto => lotoRepository.addLoto(loto)));
    }
    catch(error){
        console.log(error);
    }


}
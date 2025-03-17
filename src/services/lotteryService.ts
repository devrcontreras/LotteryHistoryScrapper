import * as lotoScrapperService from './lotoScrapperService.js';
import * as lotoRepository from '../repositories/lotoRepository.js';
import * as kinoScrapperService from './kinoScrapperService.js';
import * as kinoRepository from '../repositories/kinoRepository.js'
import { delay } from '../utils/delay.js';

export async function getLoto(year:number){

    const maxYear = new Date().getFullYear();

    for(let currentYear = year; currentYear < maxYear; currentYear++){

        console.log(`scrapping year: ${currentYear}`);

        try
        {

            const yearlyDrawResult = await lotoScrapperService.getLoto(currentYear);
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

export async function getKino(year:number){

    const maxYear = new Date().getFullYear();

    for(let currentYear = year; currentYear < maxYear; currentYear++){

        console.log(`scrapping year: ${currentYear}`);

        try
        {

            const yearlyDrawResult = await kinoScrapperService.getKino(currentYear);
            await Promise.all(yearlyDrawResult.map(kino => kinoRepository.addKino(kino)));

        }
        catch(error){
            console.log(error);
        }        

        console.log(`waiting 10 seconds...`);

        await delay(10000);
    }

    try{
        
        const currentYearDrawResult = await kinoScrapperService.getKinoCurrentYear();
        await Promise.all(currentYearDrawResult.map(kino => kinoRepository.addKino(kino)));
    }
    catch(error){
        console.log(error);
    }

}
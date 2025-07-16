import * as puppeteer from 'puppeteer';
import Kino from '../models/kino.js';

export async function getKino(year:Number): Promise<Kino[]> {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.miresultadoloteria.com/super-kino-tv/${year}`;
    
    await page.goto(url, { waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.rrm-draw-numbers');

    const drawResult: Kino[] = await page.evaluate((currentYear) => {

        
    function getDatePart(date){
        let dateparts = date.split(' ').filter(p => p !== '');
        let day = dateparts[1];
        let month = dateparts[2].toUpperCase();
        let year = dateparts[3];

        let months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE' ];
        let numericMonth = months.indexOf(month) + 1;
        
        return { day, month : numericMonth, year};
    }

        return Array.from(document.querySelectorAll('.rrm-single-result-wrap')).map(draw => {
            
            let date = `${draw.querySelector('.rrm-year-results-date').textContent.replace(currentYear.toString(), '').trim()} ${currentYear}`;
            let dateFormated = getDatePart(date);
            let numbers = Array.from(draw.querySelectorAll('.rrm-draw-numbers span[nm]')).map(span => span.textContent.trim());

            return {
                date : date,
                numbers : numbers.join(' '),
                nums : numbers,
                day : dateFormated.day,
                month : dateFormated.month,
                year : dateFormated.year
            }
        });
    }, year);

    await browser.close();

    return drawResult;

}

export async function getKinoCurrentYear(): Promise<Kino[]> {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.miresultadoloteria.com/super-kino-tv/`;
    
    await page.goto(url, { waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.rrm-table-draw-date');

    const year = new Date().getFullYear();

    const drawResult: Kino[] = await page.evaluate((currentYear) => {

        
        function getDatePart(date){
            let dateparts = date.split(' ').filter(p => p !== '');
            let day = dateparts[1];
            let month = dateparts[2].toUpperCase();
            let year = dateparts[3];

            let months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE' ];
            let numericMonth = months.indexOf(month) + 1;
            
            return { day, month : numericMonth, year};
        }

        var elements = document.querySelectorAll('.rrm-draw-cntr');

        return Array.from(elements).map(draw => {
            
            let date = `${draw.querySelector('.rrm-table-draw-date span').textContent.replace(currentYear.toString(), '').trim()} ${currentYear}`;
            let dateFormated = getDatePart(date);
            let numbers = Array.from(draw.querySelectorAll('.rrm-upcoming-result-content span[nm]')).map(span => span.textContent.trim());

            return {
                date : date,
                numbers : numbers.join(' '),
                nums : numbers,
                day : dateFormated.day,
                month : dateFormated.month,
                year : dateFormated.year
            }
        });

    }, year);

    await browser.close();

    return drawResult;
}
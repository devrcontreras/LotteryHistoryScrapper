import * as puppeteer from 'puppeteer';
import Loto from '../models/loto.js';

export async function getLoto(year:Number): Promise<Loto[]> {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.miresultadoloteria.com/leidsaloto/${year}`;
    
    await page.goto(url, { waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.rrm-draw-numbers');

    const drawResult: Loto[] = await page.evaluate((currentYear) => {

        return Array.from(document.querySelectorAll('.rrm-single-result-wrap')).map(draw => ({
            
            date : `${draw.querySelector('.rrm-year-results-date').textContent.trim()} ${currentYear}`,
            numbers : Array.from(draw.querySelectorAll('.rrm-draw-numbers span[nm]')).map(span => span.textContent.trim()).join(' '),
            lotoMas : draw.querySelector('.rrm-draw-numbers span[ner]')?.textContent?.trim().replace('LOTO MAS', '') || '',
            superLotoMas : draw.querySelector('.rrm-draw-numbers span[neb]')?.textContent?.trim().replace('SUPER','').replace('LOTO', '').replace('MAS','').replace('undefined','').trim() || ''

        }));

    }, year);

    await browser.close();

    return drawResult;

}

export async function getLotoCurrentYear(): Promise<Loto[]> {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.miresultadoloteria.com/leidsaloto/`;
    
    await page.goto(url, { waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.rrm-table-draw-date');

    const year = new Date().getFullYear();

    const drawResult: Loto[] = await page.evaluate((currentYear) => {

        var elements = document.querySelectorAll('.rrm-draw-cntr');

        return Array.from(elements).map(draw => ({
            
            date : `${draw.querySelector('.rrm-table-draw-date span').textContent.trim()} ${currentYear}`,
            numbers : Array.from(draw.querySelectorAll('.rrm-upcoming-result-content span[nm]')).map(span => span.textContent.trim()).join(' '),
            lotoMas : draw.querySelector('.rrm-upcoming-result-content span[ner]')?.textContent?.trim().replace('LOTO MAS', '') || '',
            superLotoMas : draw.querySelector('.rrm-upcoming-result-content span[neb]')?.textContent?.trim().replace('SUPER','').replace('LOTO', '').replace('MAS','').replace('undefined','').trim() || ''

        }));

    }, year);

    await browser.close();

    return drawResult;
}
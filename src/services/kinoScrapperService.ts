import * as puppeteer from 'puppeteer';
import Kino from '../models/kino.js';

export async function getKino(year:Number): Promise<Kino[]> {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.miresultadoloteria.com/super-kino-tv/${year}`;
    
    await page.goto(url, { waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.rrm-draw-numbers');

    const drawResult: Kino[] = await page.evaluate((currentYear) => {

        return Array.from(document.querySelectorAll('.rrm-single-result-wrap')).map(draw => ({
            
            date : `${draw.querySelector('.rrm-year-results-date').textContent.trim()} ${currentYear}`,
            numbers : Array.from(draw.querySelectorAll('.rrm-draw-numbers span[nm]')).map(span => span.textContent.trim()).join(' ')
        }));

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

        var elements = document.querySelectorAll('.rrm-draw-cntr');

        return Array.from(elements).map(draw => ({
            
            date : `${draw.querySelector('.rrm-table-draw-date span').textContent.trim()} ${currentYear}`,
            numbers : Array.from(draw.querySelectorAll('.rrm-upcoming-result-content span[nm]')).map(span => span.textContent.trim()).join(' ')
        }));

    }, year);

    await browser.close();

    return drawResult;
}
import * as puppeteer from 'puppeteer';

export async function getLoto(year:Number) {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.miresultadoloteria.com/leidsaloto/${year}`;
    
    await page.goto(url, { waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.rrm-draw-numbers');

    const drawResult = await page.evaluate((currentYear) => {

        return Array.from(document.querySelectorAll('.rrm-single-result-wrap')).map(draw => ({
            
            date : `${draw.querySelector('.rrm-year-results-date').textContent.trim()} ${currentYear}`,
            numbers : Array.from(draw.querySelectorAll('.rrm-draw-numbers span[nm]')).map(span => span.textContent.trim()),
            lotoMas : draw.querySelector('.rrm-draw-numbers span[ner]')?.textContent?.trim().replace('LOTO MAS', '') || '',
            superLotoMas : draw.querySelector('.rrm-draw-numbers span[neb]')?.textContent?.trim().replace('SUPER','').replace('LOTO', '').replace('MAS','').replace('undefined','').trim() || ''

        }));

    }, year);

    await browser.close();

    return drawResult;

}
import ('puppeteer-extra-plugin-stealth');
import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';
import * as a from '@clack/prompts';
import { replaceAll } from './utils.js';
puppeteer.use(pluginStealth());




async function searchManga(mangaName) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      // Add any other headers you need here
    };
  
    const url = `https://mangarabic.com/?s=${replaceAll(mangaName)}&post_type=wp-manga`;
  
    try {
      // Set custom headers
      await page.setExtraHTTPHeaders(headers);
  
      // Navigate to the page
      await page.goto(url, { waitUntil: 'domcontentloaded' });
  
      // Check if the page is still protected by Cloudflare
      if (await page.evaluate(() => window.location.href.includes('captcha'))) {
        console.log('The page is protected by Cloudflare. You may need to solve a CAPTCHA manually.');
      } else {
        // Continue scraping data
        const spiner=a.spinner();
        spiner.start();
        const mangaList = await page.evaluate(() => {
          const mangaElements = Array.from(document.querySelectorAll('h3.h4 > a'));
          console.log(mangaElements.length);
          //lets get the manga last chapter
          const mangaLastChapterElements = Array.from(document.querySelectorAll('span.chapter a'));
          const mangaLastChapter = mangaLastChapterElements.map((chapter) => chapter.textContent);
          const manga={
            name : mangaElements.map((manga) => manga.textContent),
            lastChapter : mangaLastChapter
          }
          return manga;
          
        });
          spiner.stop();
  
          return mangaList;
      }
    } catch (error) {
      console.error('Failed to retrieve the page:', error);
    } finally {
      await browser.close();
    }
  }

export {searchManga};
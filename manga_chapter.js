import puppeteer from "puppeteer";
import {replaceSpaceWithDatch} from "./utils.js";





const getChapter = async (manga,chapterNumber) => {
  manga = replaceSpaceWithDatch(manga);
  const url = `https://mangarabic.com/manga/${manga}/${chapterNumber}/`;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    // Add any other headers you need here
  };

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
      const chapterDetails = await page.evaluate(() => {
        const chapterTitle= document.querySelector('h1.chapter-heading').textContent;

        return chapterTitle;
      });
      console.log(chapterDetails);
    }
  } catch (error) {
    console.error('Failed to retrieve the page:', error);
  } finally {
    await browser.close();
  }
};


getChapter("one piece",999)
export { getChapter };

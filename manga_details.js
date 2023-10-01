import puppeteer from "puppeteer";
import { replaceAll } from "./utils.js";

const getDetails = async (manga) => {
  manga = replaceAll(manga);
  const url = `https://mangarabic.com/manga/${manga}/`;
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
        const chapterElements = Array.from(document.querySelectorAll('a'));

        return chapterElements.length;
      });
      console.log(chapterDetails);
    }
  } catch (error) {
    console.error('Failed to retrieve the page:', error);
  } finally {
    await browser.close();
  }
};

export { getDetails };

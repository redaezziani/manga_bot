import puppeteer from "puppeteer";
import { replaceSpaceWithDatch } from "./utils.js";

const getChapter = async (manga, chapterNumber) => {
  manga = replaceSpaceWithDatch(manga);
  const url = `https://mangarabic.com/manga/${manga}/${chapterNumber}/`;
  console.log(url);
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
    await page.screenshot({ path: 'example.png' });
    
    // Check if the page is still protected by Cloudflare
    if (await page.evaluate(() => window.location.href.includes('captcha'))) {
      console.log('The page is protected by Cloudflare. You may need to solve a CAPTCHA manually.');
    } else {
      // Continue scraping data
      const chapterImages = await page.evaluate(() => {
        const imageElements = document.querySelectorAll('img.wp-manga-chapter-img');
        const imgSrcList = [];
        for (const imageElement of imageElements) {
          const imgSrc = imageElement.getAttribute('data-src');
          if (imgSrc) {
            imgSrcList.push(imgSrc);
          }
        }
        return imgSrcList;
      });
      
      console.log(chapterImages);
    }
  } catch (error) {
    console.error('Failed to retrieve the page:', error);
  } finally {
    await browser.close();
  }
};

export { getChapter };

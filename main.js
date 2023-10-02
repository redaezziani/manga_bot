
import {searchManga} from './search_manga.js';
import {getChapter} from './manga_chapter.js';
import {downloadImages} from './download_images.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as a from '@clack/prompts';
import fs from 'fs';
const downloadManga = async () => {
    
    const {name}=await inquirer.prompt([
        {
          type:'input',
          name:'name',
          message:'Enter the name of the manga you want to download:'
        }
      ])
    const data=await searchManga(name);

    const mangaName=data.name;
    const lastChapter=data.lastChapter;
    const mangaList=[];
    for(let i=0;i<mangaName.length;i++){
        mangaList.push(`${mangaName[i]} ${chalk.green(lastChapter[i])}`);
    }
    const {manga}=await inquirer.prompt([
        {
          type:'list',
          name:'manga',
          message:'Choose the manga you want to download:',
          choices:mangaList
        }
    ])
    //lets take just the name of the manga without the last chapter
    const mangaNameWithoutChapter=manga.split(" ");
    mangaNameWithoutChapter.pop();// remove the last element which is the chapter

    const mangaNameWithoutChapterStr=mangaNameWithoutChapter.join(" ");//convert the array to string
    const manga_chapter=await getChapter(mangaNameWithoutChapterStr,1093);
    const outputDirectory = './downloaded_images'; // Change to your desired output directory
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}
downloadImages(mangaList, outputDirectory);
}

downloadManga();

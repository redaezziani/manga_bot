
import {searchManga} from './search_manga.js';
import {getDetails} from './manga_details.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as a from '@clack/prompts';






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
    mangaNameWithoutChapter.pop();
    const mangaNameWithoutChapterStr=mangaNameWithoutChapter.join(" ");
    const mangaNameWithPlus=replaceAll(mangaNameWithoutChapterStr);
    const mangaDetails=await getDetails(mangaNameWithPlus);
}

downloadManga();

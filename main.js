
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
    const mangaList=await searchManga(name);

    const {manga}=await inquirer.prompt([
        {
          type:'list',
          name:'manga',
          message:'Choose the manga you want to download:',
          choices:mangaList
        }
    ])
    getDetails(manga);
}

downloadManga();



const replaceAll = (mangaName) => {
    let mangaNameArr = mangaName.split(" ");
    let mangaNameWithPlus = mangaNameArr.join("+");
    return mangaNameWithPlus;
};

const replaceSpaceWithDatch=(manga)=>{
    let mangaNameArr = manga.split(" ");
    let mangaNameWithDatch = mangaNameArr.join("-");
    return mangaNameWithDatch;
}



export { replaceAll, replaceSpaceWithDatch };


const replaceAll = (mangaName) => {
    let mangaNameArr = mangaName.split(" ");
    let mangaNameWithPlus = mangaNameArr.join("+");
    return mangaNameWithPlus;
};



export { replaceAll };
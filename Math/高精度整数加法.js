const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    while ((line = await readline())) {
        arr.push(line.split("").map(Number).reverse()); // 变成数字、翻转数组
    }
    let bigL = arr[0].length >= arr[1].length ? arr[0].length : arr[1].length; // 取最大数的长度
    let res = new Array(bigL + 1).fill(0); // 初始化res数组,多初始化一位，因为最后可能多进一位
    for (let i = 0; i < bigL; i++) {
        let tc = 0;
        if (arr[0][i] != undefined && arr[1][i] != undefined) {
            tc = res[i] + arr[0][i] + arr[1][i];
        } else if (arr[0][i] == undefined && arr[1][i] != undefined) {
            tc = res[i] + arr[1][i];
        }else if(arr[0][i] != undefined && arr[1][i] == undefined){
            tc = res[i] + arr[0][i];
        }
        if (tc >= 10) {
            tc = tc - 10;
            res[i+1] = 1;   // 进位
        }
        res[i] = tc;
    }
    if(res[bigL] == 0){ // 如果最后没有进一位，记得把末尾的0删掉
        res.splice(bigL,1);
    }
    console.log(res.reverse().join(''));
})();

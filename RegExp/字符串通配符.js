// 题目地址：https://www.nowcoder.com/practice/43072d50a6eb44d2a6c816a283b02036?tpId=37&tqId=21294&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    while ((line = await readline())) {
        arr.push(line.toLowerCase());
    }
    arr[0] = arr[0].replace(/\?/g,'[0-9a-z]');
    arr[0] = arr[0].replace(/\*+/g,'[0-9a-z]{0,}'); // 多个星号匹配成一个星号
    let reg1 = new RegExp('^'+arr[0]+'$');
    console.log(reg1.test(arr[1]));
})();

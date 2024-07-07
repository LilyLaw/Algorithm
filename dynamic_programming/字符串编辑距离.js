// 题目地址：https://www.nowcoder.com/practice/3959837097c7413a961a135d7104c314?tpId=37&tqId=21275&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    while ((line = await readline())) {
        arr.push(line);
    }
    if(arr[0] == arr[1]){
        console.log(0);
        return;
    }

    let str1 = arr[0].split(""),
        str2 = arr[1].split("");
    let dp = [];
    for (let i = 0; i <= str1.length; i++) {
        dp[i] = [];
        for (let j = 0; j <= str2.length; j++) {
            if (i == 0) {
                dp[i][j] = j;
            } else if (j == 0) {
                dp[i][j] = i;
            } else {
                if (str1[i-1] == str2[j-1]) {   // 这儿出错了，因为下标从0开始，注意dp数组中i、j的含义和 str中i、j的含义
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // 删除
                    let del = dp[i - 1][j] + 1;
                    // 插入
                    let ins = dp[i][j - 1] + 1;
                    // 替换
                    let cha = dp[i - 1][j - 1] + 1;
                    // 求最小值
                    let min_c = Math.min(del, ins, cha);
                    dp[i][j] = min_c;
                }
            }
        }
    }
    console.log(dp[str1.length][str2.length]);
})();

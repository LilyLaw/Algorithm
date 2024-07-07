// 题目地址：https://www.nowcoder.com/practice/f9c6f980eeec43ef85be20755ddbeaf4?tpId=37&tqId=21239&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D5%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    while ((line = await readline())) {
        arr.push(line.split(" ").map(Number));
    }
    let all_money = arr[0][0] / 10; // 先除以10，降低复杂度
    arr.splice(0, 1); // 此时arr里只剩下了物品
    let goods = {};
    // 第一遍，遍历主件
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][2] == 0) {
            goods[i+1] = {
                price: arr[i][0] / 10, // 先除以10，降低复杂度
                manyi: arr[i][1],
            };
        }
    }
    // 第一遍，遍历附件
    for (let i = 0; i < arr.length; i++) {
        let zhu = arr[i][2];
        if (zhu != 0) {
            if(goods[zhu].sub == undefined){
                goods[zhu].sub = []
            }
            goods[zhu].sub.push({
                price: arr[i][0] / 10, // 先除以10，降低复杂度
                manyi: arr[i][1],
            })
        }
    }
    // 构建完主件附件的从属关系后，将Object转换为数组，现在只需要数组，不需要对象了。
    arr = Object.values(goods);
    let dp = [];
    for(let i=0;i<=arr.length;i++){  // i goods对象里前i个商品
        dp[i] = [];
        for(let j=0;j<=all_money;j++){  // j 当前的钱
            if(i==0||j==0){
                dp[i][j] = 0;
            }else{
                let tp = arr[i-1];
                // 放不下主件 dp[i][j] = dp[i-1][j];
                if(j < tp.price){ // 放不进去
                    dp[i][j] = dp[i-1][j];
                }else{  
                    // 主件能放进去，分为2大类情况，最多有5个数：1+4
                    // 1. 能放进去，但就不放 1
                    // 2. 放主件，同时判断附件，最多有4种情况：放0个附件；放一个附件1；放一个附件2；放两个附件12
                    let res = [dp[i-1][j]]; // 先把能放却不放的情况放进去进去
                    // 放0个附件，即只放主件
                    let aa = dp[i-1][j-tp.price] + tp.price*tp.manyi;   // 这儿是i-1， 啊啊啊啊啊千万不要出错啊！！！，不是i，我就是在这儿出错了，调试了半天才发现，本质还是对背包理解不够深刻。
                    res.push(aa);
                    // 检查附件的长度
                    if(tp.sub!=undefined){ // 有附件
                        // 先判断第一个能不能放进去
                        let cha1 = j-tp.price-tp.sub[0].price;
                        if(cha1>=0){
                            let s1 = dp[i-1][cha1] + tp.price*tp.manyi + tp.sub[0].price*tp.sub[0].manyi;
                            res.push(s1);
                        }

                        if(tp.sub[1]!=undefined && j-tp.price-tp.sub[1].price >=0){   // 有第二个，判断第二个单独和两个都放的两种情况
                            let s2 = dp[i-1][j-tp.price-tp.sub[1].price] + tp.price*tp.manyi + tp.sub[1].price*tp.sub[1].manyi;
                            res.push(s2);

                            let both = j-tp.price-tp.sub[0].price-tp.sub[1].price;
                            if(both>=0){
                                let s3 = dp[i-1][both] + tp.price*tp.manyi + tp.sub[0].price*tp.sub[0].manyi + tp.sub[1].price*tp.sub[1].manyi;
                                res.push(s3);
                            }
                        }
                    }
                    dp[i][j] = Math.max(...res);
                }
            }
        }
    }
    console.log(dp[arr.length][all_money]*10);  // 最后别忘了乘10
})();

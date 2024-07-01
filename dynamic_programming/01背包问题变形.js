// 没有完全通过：7/12
// 出错用例：
    // 2000 10
    // 500 1 0
    // 400 4 0
    // 300 5 1
    // 400 5 1
    // 200 5 0
    // 500 4 5
    // 400 4 0
    // 320 2 0
    // 410 3 0
    // 400 3 5

    // 预期输出：7430
    // 错误输出：7400 我的错误

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    while ((line = await readline())) {
        arr.push(line);
    }
    let cc = arr[0].split(" ");
    let allmoney = parseInt(cc[0]),
        allcount = parseInt(cc[1]);

    let wupin = {};
    let zancun = [];
    for (let i = 1; i < allcount + 1; i++) {
        let tmp = arr[i].split(" ");
        if (tmp[2] == "0" || tmp[2] == 0) {
            wupin[i] = {
                cost: parseInt(tmp[0])/10,
                manyidu: parseInt(tmp[1]),
            };
        } else {
            tmp.push(i);
            if (wupin[tmp[2]] == undefined) { // 主件还没遍历出来
                zancun.push(tmp);
            } else {
                renderSub(tmp);
            }
        }
    }
    for (let i = 0; i < zancun.length; i++) {
        renderSub(zancun[i]);
    }
    // 到此处，完成主件和附件的匹配, 注意此处cost除以了10，最后满意度要把10 乘回来

    // 先构建01背包，再在01背包的基础上加附件，再取最大值
    let wp_arr = Object.values(wupin); // 只需要值了，不需要key
    let dp = []; // dp[i][j],  i 为前i个元素，j为当前总钱数，dp[i][j]为当前最大满意度
    for (let i = 0; i <= wp_arr.length; i++) {
        dp[i] = [];
        for (let j = 0; j <= allmoney / 10; j++) { // 是10 的倍数，但先以1 递增，最后再乘10即可，后面计算单个物品的价格，也先除以10；
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else {
                let twp = wp_arr[i - 1];
                let twp_cost = wp_arr[i - 1].cost;
                if (twp_cost > j) { // 主件太大了，没法儿放进去
                    dp[i][j] = dp[i - 1][j];
                } else {
                    // 能放进去，可以选择放，也可以选择不放，计算两值，取最大值
                    // 1. 不放这个主件
                    let bufang = dp[i - 1][j];

                    // 2. 放这个主件, 判断这个物品有没有附件
                    let fang = 0;
                    if (twp.sub == undefined) {  // 没有附件, 只有主件
                        fang = dp[i - 1][j - twp_cost] + twp_cost * twp.manyidu;
                    } else { // 有附件。遍历所有附件，找到符合标准的附件
                        let left_cost = j - twp_cost;
                        let sub_arr = Object.values(twp.sub);
                        if(sub_arr.length == 1 && sub_arr[0].cost < left_cost){ // 只有1个附件，且这个附件符合
                            fang = dp[i - 1][left_cost - sub_arr[0].cost] + (twp_cost * twp.manyidu) + (sub_arr[0].cost*sub_arr[0].manyidu)
                        }else if(sub_arr.length==2){    // 有两个附件，分别判断情况
                            if(sub_arr[0].cost + sub_arr[1].cost <= left_cost){   // 俩附件cost值加起来都小于剩余值，所以满足条件，都要
                                fang = dp[i - 1][left_cost - sub_arr[0].cost - sub_arr[1].cost] + (twp_cost * twp.manyidu) + (sub_arr[0].cost * sub_arr[0].manyidu) + (sub_arr[1].cost * sub_arr[1].manyidu);
                            }else{  // 俩附件只能要一个，取最大的
                                let fujian1=0,fujian2=0;
                                if(sub_arr[0].cost<=left_cost){
                                    fujian1 = dp[i - 1][left_cost - sub_arr[0].cost] + (twp_cost * twp.manyidu) + (sub_arr[0].cost * sub_arr[0].manyidu);
                                }
                                if(sub_arr[1].cost<=left_cost){
                                    fujian2 = dp[i - 1][left_cost - sub_arr[1].cost] + (twp_cost * twp.manyidu) + (sub_arr[1].cost * sub_arr[1].manyidu);
                                }
                                fang = Math.max(fujian1,fujian2);
                            }
                        }else{  // 所有附件不符合，仍然是只取主件的情况
                            fang = dp[i - 1][j - twp_cost] + twp_cost * twp.manyidu;
                        }
                    }

                    dp[i][j] = Math.max(bufang, fang);
                }
            }
        }
    }
    let dp_length = dp.length;
    console.log(dp[dp_length-1][allmoney/10] * 10); // 打印结果别忘了乘10

    function renderSub(arr) {
        if (wupin[arr[2]].sub == undefined) {
            wupin[arr[2]].sub = {};
        }
        wupin[arr[2]].sub[arr[3]] = {
            cost: parseInt(arr[0])/10,
            manyidu: parseInt(arr[1]),
        };
    }
})();

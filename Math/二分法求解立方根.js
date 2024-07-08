// 题目地址：https://www.nowcoder.com/practice/caf35ae421194a1090c22fe223357dca?tpId=37&tqId=21330&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    while ((line = await readline())) {
        if (line == "0.0" || line == "-1.0" || line == "1.0") {
            console.log(line);
            return;
        }
        let num = parseFloat(line);
        let fu = false; // 负数标志位
        if (num < 0) {
            num = -num;
            fu = true;
        }
        // 二分法
        // 注意事项，不要想当然地取1/3 或 1/2，因为存在一些特殊值，比如：0.6、2.7、5，所以真正的右边取值应该是 Math.max(1.0,num); 
        let xiao = 0.1,
            da = Math.max(1.0,num); 
        let zhongjian = parseFloat(((xiao + da) / 2).toFixed(5)); // 精度要够，多取几位
        let jingdu = 0.0001;
        while (Math.abs(zhongjian ** 3 - num) > jingdu) {
            if (zhongjian ** 3 > num) {    //
                da = zhongjian;
            } else if (zhongjian ** 3 < num) {
                xiao = zhongjian;
            }
            zhongjian = parseFloat(((xiao + da) / 2).toFixed(5)); // 精度要够，多取几位
        }
        if(fu){
            zhongjian = -zhongjian  // 别忘了负数，还原负数
        }
        zhongjian = zhongjian.toFixed(1);
        console.log(zhongjian);
    }
})();

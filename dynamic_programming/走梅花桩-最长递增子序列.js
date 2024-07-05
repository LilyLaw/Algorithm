// 题目地址：https://www.nowcoder.com/practice/24e6243b9f0446b081b1d6d32f2aa3aa?tpId=37&tqId=21326&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=


const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let arr = [];
    while(line = await readline()){
        arr.push(line);
    };
    // 这里在考试中遇到一个非常邪门的错误，同一组数据，考试中不通过，自测时通过，经检查是 字符串末尾有一个空格，导致出现错误异常，使数组多了一个NaN
    let tt = arr[1].split(' ');
    let nums = [];
    for(let k=0;k<tt.length;k++){
        if(/\d+/.test(tt[k])){
            nums.push(parseInt(tt[k]));
        }
    }
    let m_dp = new Array(parseInt(arr[0])).fill(1);
    for(let i = 1;i<nums.length;i++){
        let max = 0;
        for(let j=0;j<i;j++){
            // console.log(nums[j],nums[i]);
            if(nums[j]<nums[i]){
                let bushu = m_dp[j] +1;
                // console.log(bushu);
                max = Math.max(bushu,max);
            }
        }
        m_dp[i] = Math.max(m_dp[i],max);
    }
    let max_bushu = Math.max(...m_dp);
    console.log(max_bushu);
}()

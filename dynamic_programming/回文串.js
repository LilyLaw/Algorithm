// 题目地址：https://www.nowcoder.com/practice/3cd4621963e8454594f00199f4536bb1?tpId=37&tqId=21255&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=
// 这道题用动态规划做，当字符串特别长时，会超内存

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        line = line.replaceAll(' ','');
        let strlen = line.length;
        if(strlen==1){ // 只有一个字符，肯定是回文串
            console.log(1);
        }else if(strlen==2 && line.substring(0,1)==line.substring(1)){ // 有两个字符，每个字符相等，则肯定是回文串
            console.log(2);
        }else if(strlen > 2){
            let dp = [];
            let str_arr = line.split('');

            for(let i=0;i<strlen;i++){
                dp[i] = new Array(strlen).fill(false);
            }

            let max = 1;
            for(let i=strlen-1;i>=0;i--){
                for(let j=i;j<strlen;j++){
                    if(i==j){
                        dp[i][j] = true;
                    }else if(j-i==1 && str_arr[i]==str_arr[j]){// 别忘了这种情况，ij是相邻的
                        dp[i][j] = true;
                        max = Math.max(max,2);
                    }else if(str_arr[i]==str_arr[j] && dp[i+1][j-1] ==true){ 
                        dp[i][j] = true;
                        max = Math.max(max,j-i+1);
                    }
                }
            }
            console.log(max);
        }
    }
}()

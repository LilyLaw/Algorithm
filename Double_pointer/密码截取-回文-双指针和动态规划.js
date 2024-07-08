题目地址 https://www.nowcoder.com/practice/3cd4621963e8454594f00199f4536bb1?tpId=37&tqId=21255&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D4%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // 一共有两种解法，
    // 第一种解法是 动态规划，会超内存，因为当字符串长度很大时，会开辟一个巨大的二维数组，
    // 第二种解法是 双指针，不会超内存，推荐第二种。
    // 两种解法我都写在下面了
    while ((line = await readline())) {
        // 第一种 动态规划 当字符串很长时会超内存
        // line = line.replaceAll(" ", "");
        // let strlen = line.length;
        // if (strlen == 1) { // 只有一个字符，肯定是回文串
        //     console.log(1);
        // } else if (strlen == 2 && line.substring(0, 1) == line.substring(1)) { // 有两个字符，每个字符相等，则肯定是回文串
        //     console.log(2);
        // } else if (strlen > 2) {
        //     let dp = []; // i 为第i个字符的位置，j为第j个字符的位置，dp[i][j]为从第i到第j是不是回文串
        //     let str_arr = line.split("");
        //     for (let i = 0; i < strlen; i++) {  // 全部初始化为false
        //         dp[i] = new Array(strlen).fill(false);
        //     }

        //     let max = 1;
        //     for (let i = strlen - 1; i >= 0; i--) {
        //         for (let j = i; j < strlen; j++) {
        //             if (i == j) {
        //                 dp[i][j] = true;
        //             } else if (j - i == 1 && str_arr[i] == str_arr[j]) {
        //                 // 别忘了这种情况，ij是相邻的
        //                 dp[i][j] = true;
        //                 max = Math.max(max, 2);
        //             } else if (
        //                 str_arr[i] == str_arr[j] &&
        //                 dp[i + 1][j - 1] == true
        //             ) {
        //                 dp[i][j] = true;
        //                 max = Math.max(max, j - i + 1);
        //             }
        //         }
        //     }
        //     console.log(max);
        // }

        // 第二种 双指针
        if (line.length == 1) { //只有一个字符，那肯定是回文串
            console.log(1);
            return; 
        }
        let max_hw_str_len = 0; // 记录最长回文串的长度
        for (let i = 0; i < line.length; i++) {
            let res_tong = checkHW(i, i); // 双指针从同一个点出发，比如 aba
            let res_lin = checkHW(i, i + 1); // 双指针从相邻的两个点出发，比如 abba
            max_hw_str_len = Math.max(max_hw_str_len, res_tong, res_lin);
        }

        console.log(max_hw_str_len);

        function checkHW(m, n) {
            let flag = 0;
            if (m == n) {
                // 同一点出发, 当前这个出发点肯定是回文串，因为它就一个字符
                flag++;
                m--;
                n++;
            }
            while (m >= 0 && n < line.length) {
                if (line[m] == line[n]) {
                    flag = flag + 2;
                    m--;
                    n++;
                } else {
                    break;
                }
            }
            return flag;
        }
    }
})();

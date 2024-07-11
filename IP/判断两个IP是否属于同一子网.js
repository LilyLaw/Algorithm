// 题目地址：https://www.nowcoder.com/practice/34a597ee15eb4fa2b956f4c595f03218?tpId=37&tqId=21262&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=4&judgeStatus=undefined&tags=&title=

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    let i = 0;
    while ((line = await readline())) {
        if (i % 3 == 0) {
            arr.push({});
            arr[Math.floor(i / 3)].yanma = line.split(".");
        } else if (i % 3 == 1) {
            arr[Math.floor(i / 3)].ip1 = line.split(".");
        } else if (i % 3 == 2) {
            arr[Math.floor(i / 3)].ip2 = line.split(".");
        }
        i++;
    }
    for (let j = 0; j < arr.length; j++) {
        let yanma_valid = isValid_yanma(arr[j].yanma);
        if (!yanma_valid) {
            // 掩码不合法，输出1
            console.log(1);
            continue;
        }
        let ip1 = commonCheck(arr[j].ip1);
        if (!ip1) {
            // ip1不合法，输出1
            console.log(1);
            continue;
        }
        let ip2 = commonCheck(arr[j].ip2);
        if (!ip2) {
            // ip2不合法，输出1
            console.log(1);
            continue;
        }

        // ip1 和 ip2 都合法，检查是不是同一子网
        let yanma_bin_str = toBinStr(arr[j].yanma).padEnd(32, 0),
            ip1_bin_str = toBinStr(arr[j].ip1).padStart(32, 0),
            ip2_bin_str = toBinStr(arr[j].ip2).padStart(32, 0);
        let same = isSameZiwang(yanma_bin_str, ip1_bin_str, ip2_bin_str);
        if (same) {
            console.log(0);
        } else {
            console.log(2);
        }
    }

    function isValid_yanma(ip_arr) {
        if (!commonCheck(ip_arr)) {
            return false;
        }
        // 将掩码转换成二进制串
        let bin_str = toBinStr(ip_arr);
        return /^1+0+$/g.test(bin_str);
    }

    function isSameZiwang(yanma_bin_str, ip1_bin_str, ip2_bin_str) {
        ymb_arr = yanma_bin_str.split("");
        ip1b_arr = ip1_bin_str.split("");
        ip2b_arr = ip2_bin_str.split("");
        let flag = true;
        for (let i = 0; i < yanma_bin_str.length; i++) {
            let ip1_cal = ymb_arr[i] & ip1b_arr[i];
            let ip2_cal = ymb_arr[i] & ip2b_arr[i];
            if (ip1_cal != ip2_cal) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    function commonCheck(ip_arr) {
        // 长度必须为4
        if (ip_arr.length != 4) {
            return false;
        }

        // 第一个必须是非0数字开头
        let first = /^[1-9]/g.test(ip_arr[0]);
        if (!first) {
            // 不合法的开头，return false
            return false;
        }

        let flag_255 = true;
        for (let i = 0; i < ip_arr.length; i++) {
            if (
                parseInt(ip_arr[i]) > 255 ||
                ip_arr[i].length > 3 ||
                /^0+[1-9]+/g.test(ip_arr[i]) || 
                /[^\d.]/g.test(ip_arr[i]) 
            ) { // 检查是否只有数字和. 如果出现其他符号，则为不合法ip
                flag_255 = false;
                break;
            }
        }
        return flag_255;
    }

    function toBinStr(ip_arr) {
        let bin_str = "";
        for (let i = 0; i < 4; i++) {
            let cc = parseInt(ip_arr[i]).toString(2);
            cc = cc.padStart(8, 0);
            bin_str = bin_str + cc;
        }
        return bin_str;
    }
})();
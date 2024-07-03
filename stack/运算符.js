// 题目地址：https://www.nowcoder.com/practice/15e41630514445719a942e004edc0a5b?tpId=37&tqId=21293&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fdifficulty%3D3%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=3&judgeStatus=undefined&tags=&title=

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    // 矩阵乘法个数计算公式 次数 = x*y*z
    // 用栈判断运算顺序

    let arr = [];
    while(line = await readline()){
        arr.push(line);
    }
    let allCheng = 0;

    let str_yunsuan = arr[arr.length-1];
    let my_stack = [];
    let A_charcode = 'A'.charCodeAt();
    for(let i=0;i<str_yunsuan.length;i++){
        if(str_yunsuan[i] == ')'){
            let second = my_stack.pop().split(' '),
                first = my_stack.pop().split(' ');
            let ji = first[0]*first[1]*second[1];
            allCheng += ji;
            my_stack.push(first[0]+' '+second[1]);
        }else if(/[A-Z]/.test(str_yunsuan[i])){
            my_stack.push( arr[str_yunsuan[i].charCodeAt() - A_charcode +1] );	
            // 注意直接push矩阵，不用push A、B、C这样的字母
        }
    }
    console.log(allCheng);
})();

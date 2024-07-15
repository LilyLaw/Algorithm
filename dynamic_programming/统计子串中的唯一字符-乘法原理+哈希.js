//题目地址：https://leetcode.cn/problems/count-unique-characters-of-all-substrings-of-a-given-string/description/

// 乘法原理、哈希。

/**
 * @param {string} s
 * @return {number}
 */
var uniqueLetterString = function (s) {
    let pos = new Map();
    let sr = s.split('');
    let count = 0;
    sr.forEach((item, i) => {
        if (pos.has(item)) {
            let c = pos.get(item);
            c.push(i);
            pos.set(item, c);
        } else {
            pos.set(item, [i]);
        }
    });

    for (let [key, value] of pos) {
        let need_calc = [], left, cur, right;
        for(let i=0;i<value.length;i++){
            left = value[i-1]!=undefined?value[i-1]:-1;
            cur = value[i];
            right = value[i+1]?value[i+1]:s.length;
            let cc = [left, cur, right];
            need_calc.push(cc);
        }
        need_calc.forEach(item => {
            let cal = (item[1] - item[0]) * (item[2] - item[1]);
            count += cal;
        })
    }

    return count;
};
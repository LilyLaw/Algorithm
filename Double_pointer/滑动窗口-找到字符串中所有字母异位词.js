// 题目地址：https://leetcode.cn/problems/find-all-anagrams-in-a-string/

var findAnagrams = function (s, p) {
    if (s.length < p.length) {
        return [];
    }
    let res = [];
    let p_r = new Array(26).fill(0);
    let s_r = new Array(26).fill(0);

    const a_at = 'a'.charCodeAt(0);
    for (let i = 0; i < p.length; i++) {
        p_r[p[i].charCodeAt(0) - a_at]++;
        s_r[s[i].charCodeAt(0) - a_at]++;
    }
    const ps = p_r.toString();
    if(ps == s_r.toString()){
        res.push(0);
    }

    for (let i = 0; i < s.length - p.length; i++) {
        s_r[s[i].charCodeAt() - a_at]--;    // 此时移动到了第 i+1 位，所以后面要push i+1
        s_r[s[i+p.length].charCodeAt() - a_at]++
        if(s_r.toString() == ps){
            res.push(i+1);
        }
    }
    return res;
};
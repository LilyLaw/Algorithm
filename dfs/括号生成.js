// 题目地址：https://leetcode.cn/problems/generate-parentheses/description/

/**
 * @param {number} n
 * @return {string[]}
 */

/**
 *	括号成立的两个条件
 * 1. 左括号数量 = 右括号数量
 * 2. 任意前缀的左括号数量 >= 右括号数量，比如 (())()(), 取 '(())(' 这一小段，左括号数量 >= 右括号数量
 */

var generateParenthesis = function (n) {
    if (n == 1) {
        return ["()"];
    }

    let res = [];
    dfs_kh(0, 0, n, '');

    function dfs_kh(left_num, right_num, all, str) {
        if (left_num == all && right_num == all) {
            res.push(str);
            return;
        }
        if (left_num < n) {
            dfs_kh(left_num + 1, right_num, all, str + '(');
        }
        if (right_num < n && right_num < left_num) {
            dfs_kh(left_num, right_num + 1, all, str + ')');
        }
    }
    return res;
};
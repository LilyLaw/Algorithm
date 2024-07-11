// 题目地址：https://leetcode.cn/problems/n-queens/

// 思路

// 我的解法是代码量很多，但不管了，先解出来再说吧
// 回溯，深搜
// N*N 的数组，N个皇后，则必然每个皇后各占一行一列

// 解题过程

// 从第一个皇后入手，就让它固定在第一行，它可能存在的位置就是 [0, 0] 、[0, 1] ... [0, n] 以这些第一行的坐标为起点，分别开始遍历
// 我用的语言是JavaScript，在遍历过程中，一定要注意“深拷贝”当前坐标数组和棋盘。
// 递归函数：
// 1. 把当前坐标数组传进去，以[ '0 0' ]为例，当前坐标数组中，只有一个坐标，取该数组的“最后一个坐标”，将所在行、所在列、两个对角线都设置为“已占用”的状态。（这里之所以只取最后一个坐标，是因为当数组中存在多个坐标时，前面的坐标是之前已经处理过的，只有最后一个坐标是未处理的，所以要设置其行列对角线）
// 2. 设置完改坐标后，只需遍历坐标往下的那一行。比如 '0 0' 坐标设置完后，只需遍历第 0+1 = 1 行，将该行中未被占用的取出来，分别和 '0 0' 组成新的坐标数组，继续递归。比如 下面一行中有两个坐标未被占用，分别是[1,3] 和 [1,5] ， 则组成新的坐标为[ '0 0', '1 3' ] 和 [ '0 0', '1 3' ] ，继续递归。如果在下面那行中的坐标全被占了，则该种路径不符合要求，递归自动终止，无需其他操作。
// 3. 递归函数退出条件：坐标数组长度为n，则意味着n个皇后都被放好了，把坐标渲染为指定的字符串格式，存进变量里，然后return 出去即可。

// 复杂度

// 时间复杂度: O(n!)
// 空间复杂度: O(n)



/**
 * @param {number} n
 * @return {string[][]}
 */

var solveNQueens = function (n) {
    if (n == 1) { return [["Q"]]; }
    let res = []; // 存放解法的数组。
    for (let i = 0; i < n; i++) {
        let qipan = resetQipan()    // 重置棋盘
        fang([`0 ${i}`], qipan)  // 先放第一个，第一行遍历
    }
    return res;

    // arr 坐标数组； qp 棋盘
    function fang(arr, qp) {    // 注意这里传入棋盘是为了保存之前的标记占用的操作，否则每次都要把所有的坐标的行列对角线全都计算一遍，非常耗时，没必要。
        if (arr.length == n) {  // 满足条件，放进最终res数组存储起来
            let t = [];
            arr.forEach(item => {
                let last = item.split(' ');
                let ct = parseInt(last[1])
                let str = '.'.repeat(ct) + 'Q' + '.'.repeat(n - 1 - ct);
                t.push(str);
            })
            res.push(t);
            return;
        }
        let tmp = [...arr]; // 深拷贝坐标数组
        let nqp = [] // 深拷贝棋盘
        qp.forEach(item => { nqp.push([...item]); })
        let last = tmp[tmp.length - 1].split(' ');
        let hang = parseInt(last[0]), lie = parseInt(last[1]);
        for (let i = 0; i < n; i++) {
            nqp[hang][i] = 0; // 行，置为false
            nqp[i][lie] = 0;  // 列，置为false

            // 对角线
            if (hang - i >= 0 && lie - i >= 0) {
                nqp[hang - i][lie - i] = 0;
            }
            if (hang + i < n && lie + i < n) {
                nqp[hang + i][lie + i] = 0;
            }

            if (hang - i >= 0 && lie + i < n) {
                nqp[hang - i][lie + i] = 0;
            }

            if (hang + i < n && lie - i >= 0) {
                nqp[hang + i][lie - i] = 0;
            }
        }
        // 遍历棋盘，只需找出紧接着下面一行数中剩余的1，而不是整个棋盘中所有的1，然后继续递归，寻找符合要求的位置
        let nextHang = nqp[hang+1];
        for (let j = 0; j < n; j++) {
            if (nextHang[j] == 1) {
                let tc = [...tmp,`${hang+1} ${j}`];
                fang(tc, nqp);
            }
        }
    }

    function resetQipan() {
        let qipan = new Array(n).fill(new Array(n).fill(1));
        return qipan;
    }
};
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    while ((line = await readline())) {
        arr.push(line.split(" ").map(Number));
    }
    let hang = arr[0][0],
        lie = arr[0][1];
    // console.log(hang, lie);
    arr.splice(0, 1); // 去掉第一个无用的行列数，只要二维数组
    findRoute(0, 0, []);

    function findRoute(i, j, route) {
        // i 行，j 列，route是一个数组为当前route的组合
        let ss = [...route];    // 数组一定要深拷贝！！！
        ss.push("(" + i + "," + j + ")");

        if (i == hang - 1 && j == lie - 1) {
            // 走到了出口
            ss.forEach((item) => {
                console.log(item);
            });
        } else {
            // 上右下左，分别都遍历一遍
            arr[i][j] = 1; // 赋值为1，标记此处不能再走。

            if (i > 0 && arr[i - 1][j] == 0) { // 上
                findRoute(i - 1, j, ss);
            }
            if (j < lie - 1 && arr[i][j + 1] == 0) { // 右
                findRoute(i, j + 1, ss);
            }
            if (i < hang - 1 && arr[i + 1][j] == 0) { // 下
                findRoute(i + 1, j, ss);
            }
            if (j > 0 && arr[i][j - 1] == 0) { // 左
                findRoute(i, j - 1, ss);
            }
        }
    }
})();

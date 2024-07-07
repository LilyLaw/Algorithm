const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let arr = [];
    while ((line = await readline())) {
        arr.push(line.split(" ").map(Number));
    }
    checkWhole();
    function checkWhole() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (arr[i][j] == 0) {
                    for (let k = 1; k <= 9; k++) {
                        let isValid = checkValid_single(i, j, k);
                        if (isValid) {
                            arr[i][j] = k;
                            if(checkWhole()){
                                return true;
                            }else{
                                arr[i][j] = 0;
                            }
                        }
                    }
                    return false; // 1-9全遍历完，没有合适的，则return false；
                }
            }
        }
        return true;    // 没有空的了，所有的都填满了，return true；
    }

    arr.map(item=>{
        console.log(item.join(' '));
    })

    function checkValid_single(i, j, k) {
        // i 横坐标；j 纵坐标；k 1-9 的数字
        // 检查横坐标
        if (arr[i].indexOf(k) != -1) {
            // 横坐标数值中已经有k了，所以k不能再放进去
            return false;
        }

        // 检查纵坐标
        for (let s = 0; s < 9; s++) {
            if (arr[s][j] == k) {
                // 纵坐标数值中已经有k了，所以k不能再放进去
                return false;
            }
        }

        // 检查九宫格
        let hs = Math.floor(i / 3) * 3;
        let zs = Math.floor(j / 3) * 3;
        for (let g = hs; g < hs + 3; g++) {
            for (let d = zs; d < zs + 3; d++) {
                if (arr[g][d] == k) {
                    // 九宫格坐标数值中已经有k了，所以k不能再放进去
                    return false;
                }
            }
        }

        return true;
    }
})();

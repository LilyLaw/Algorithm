题目地址：https://leetcode.cn/problems/maximum-subarray/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if(nums.length == 1){
        return nums[0];
    }else{
        // 第二种解法：动态规划优化方法，可行，
        // 假设 nums 数组的长度是 n，下标从 0 到 n−1。

        // 我们用 f(i) 代表以第 i 个数结尾的「连续子数组的最大和」，那么很显然我们要求的答案就是：max 0≤i≤n−1{f(i)}
        // 因此我们只需要求出每个位置的 f(i)，然后返回 f 数组中的最大值即可。那么我们如何求 f(i) 呢？我们可以考虑 nums[i] 单独成为一段还是加入 f(i−1) 对应的那一段，这取决于 nums[i] 和 f(i−1)+nums[i] 的大小，我们希望获得一个比较大的，于是可以写出这样的动态规划转移方程：

        // f(i)=max{f(i−1)+nums[i],nums[i]}

        // 不难给出一个时间复杂度 O(n)、空间复杂度 O(n) 的实现，即用一个 f 数组来保存 f(i) 的值，用一个循环求出所有 f(i)。考虑到 f(i) 只和 f(i−1) 相关，于是我们可以只用一个变量 pre 来维护对于当前 f(i) 的 f(i−1) 的值是多少，从而让空间复杂度降低到 O(1)，这有点类似「滚动数组」的思想。
        let max = nums[0], last = 0;
        nums.forEach(item=>{
            last = Math.max(last+item,item);
            max = Math.max(max,last);
        })
        return max;

        // 第一种解法：动态规划二维数组超内存了，测试用例里有一个巨大的数组，空间复杂度太大，不行
        // let dp = [];
        // let max = nums[0];
        // for(let i=0;i<nums.length;i++){
        //     dp[i] = new Array(nums.length).fill(0);
        //     for(let j=i;j<nums.length;j++){
        //         if(i==j){
        //             dp[i][j] = nums[i];
        //             max = Math.max(max,nums[i]);
        //         }else{
        //             dp[i][j] = dp[i][j-1] + nums[j];
        //             max = Math.max(max,dp[i][j]);
        //         }
        //     }
        // }
        // return max;
    }
};
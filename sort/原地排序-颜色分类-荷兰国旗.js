// 题目地址： https://leetcode.cn/problems/sort-colors/description/

var sortColors = function (nums) {
    // left 左边全是0，不包含left
    // right 右边全是2，不包含right；
    let left = 0, right = nums.length-1;
    for (let i = 0; i <=right; i++) {
        if(nums[i] == 0){
            let t = nums[i];
            nums[i] = nums[left];
            nums[left] = t;
            left++;
        }
        if(nums[i] == 2 ){
            let t = nums[i];
            nums[i] = nums[right];
            nums[right] = t;
            right--;
            i--;
        }
    }
};
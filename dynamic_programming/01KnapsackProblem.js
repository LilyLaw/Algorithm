// 01背包问题，动态规划

// 物体编号		1	2	3	4
// 物体重量		2	3	4	5
// 物体价值		3	4	5	6

// 背包重量	8

// 求放进背包的物体的最大价值

let obj={
	1:{
		weight: 2,
		value:3
	},
	2:{
		weight:3,
		value:4
	},
	3:{
		weight:4,
		value:5
	},
	4:{
		weight:5,
		value:6
	}
}

let Max_Weight = 8;
let Max_Value = 0;	// 最大价值初始化为0
let dp = [];
// dp[i][j] 二维数组  i为前i个物品(注意是前i个，不是第i个)，j为当前背包总重量，dp[i][j] 为前i个物品(包括i)所能组成的最大价值

// 获取对象长度
let obj_length = Object.keys(obj).length;
// 初始化数组
for(let i=0;i<=obj_length; i++){
	dp[i] = [];	// 初始化二维数组里面的一维数组
	for(let j=0; j<=Max_Weight; j++){
		if(i==0 || j==0 || j==1){	// 当j==1时，没有物品的重量比1小，所以都放不进去，所以最大价值仍然是0
			dp[i][j] = 0;
		}else{
			// 先判断当前物品的重量是不是小于等于当前背包总重量，如果小于，可以进行后续操作；如果大于，说明第i个物品根本放不进去，则仍然延续i-1的放法，则dp[i][j]==dp[i-1][j];
			if(obj[i].weight>j){
				dp[i][j] = dp[i-1][j];
			}else{	// 重量小于等于，可以放进去
				// 1. 不放第i个物品
				let res_Bufang = dp[i-1][j];

				// 2. 放第i个物品
				let left_weight = j-obj[i].weight; // 如果放第i个物品，则总重量j先减去第i个物品的重量，剩下的重量为前i-1个物品重量的总和
				let res_fang = dp[i-1][left_weight] + obj[i].value; // dp[i-1][left_wight] 为前i-1个物品在剩余重量的情况下的最大value值，再加上第i个物品的value值，为放第i个物品时，dp[i][j] 的最大value值

				let max = Math.max(res_Bufang,res_fang);
				dp[i][j] = max;
			}
		}
	}
}

console.log(dp);
Max_Value = dp[obj_length][Max_Weight]
console.log(Max_Value);
let array = [13, -3, -28, 20, -3, -16, -23, 18, 20, -7, 12, 5, 22, 15, 4, 7];
let Maxsum = 0;
let max_sum = -Infinity;
//最大子数组问题暴力求解  对于Array.length = n 循环次数总计为n * n
function pmaxarray (){
    for (let i = 0; i < Array.length;i++){
        let sum = 0 ;
        for ( let j = i; j < Array.length;j++ ){
            sum +=Array[j];
            if (sum > Maxsum){
                Maxsum = sum;
                low = i;
                hight = j;                                
            }
        }
    }
}

//用分治法求最大子数组  
//思路  最大子数组存在的位置：
//1.以中点为界，左边数组内 low <= i <= j <= mid
//2.以中点为界，右边数组内 mid +1 <= i <= j <high
//3.跨过过中点，一部分在左边，一部分在右边  i <= mid <= j
let left_sum = -Infinity;
let right_sum = -Infinity;
let cross_sum = 0;
let low = 0;
let high = array.length;

function Findmaximumsubarray(array){
    if (array.length === 1)  return array[0];
    let mid = Math.floor(array.length/2);
    let mid2 = Math.floor((low + high)/2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);
    findL_and_Rmaxsubarray(recursionarray(left), recursionarray(right)); //递归求解以中点为界，分别求解左子数组和右子数组中的最大子数组
    findcrossmidsubarray(low, high, mid2);//求解过中点的最大子数组
    if (left_sum > right_sum && left_sum > cross_sum){
       if (left_sum > max_sum){
           max_sum = left_sum;
       }
   }else if (right_sum > left_sum && right_sum > cross_sum){
       if (right_sum > max_sum){
           max_sum = right_sum;
       }
   }else{
       if (cross_sum > max_sum){
           max_sum = cross_sum;
       }           
   }
}

//每次将数组长度减半，递归数组至array.length === 1；
function recursionarray(array){
    if(array.length === 1){ 
        return array;  
      }
     var mid = Math.floor(array.length/2);
     var left = array.slice(0, mid);
     var right = array.slice(mid);
     // 将递归的数组作为参数传入
     return  findL_and_Rmaxsubarray(recursionarray(left), recursionarray(right));
}
//求解左子数组和右子数组中存在的最大子数组
function findl_and_rmaxsubarray(left, right){
     let sum1 = 0;
     let sum2 = 0;
     let re = []
    for (let i = left.length - 1;i >= 0;i--){
        sum1 +=left[i];
        if (sum1 > left_sum){
            left_sum = sum1;
        }
    }
    for (let j = 0 ;j < right.length;j++){
        sum2 +=right[j];
        if (sum2 > right_sum){
            right_sum = sum2;
        }
    }
    return re.concat(left).concat(right); //将两个分裂数组组合
}

//求解过中点的最大子数组
function findcrossmidsubarray(low, high, mid2){
    let sum1 = 0;
    let sum2 = 0;
    let left_sum1 = -Infinity;
    let right_sum1 = -Infinity;
    for (let i = mid2 - 1;i > low;i--){
        sum1 +=array[i];
        if (sum1 > left_sum1){
            left_sum1 = sum1;
        }
    }
    for (let j = mid2 ;j < high;j++){
        sum2 +=array[j];
        if (sum2 > right_sum1){
            right_sum1 = sum2;
        }
    }
    cross_sum = left_sum1 + right_sum1;
}
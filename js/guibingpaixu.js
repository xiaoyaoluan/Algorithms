function merge(left, right) {
    var re = [];
    while(left.length > 0 && right.length > 0) {
        if(left[0] < right[0]) {
            re.push(left.shift());
        } else {
            re.push(right.shift());
        }
    }
    /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
    return re.concat(left).concat(right);
}
  
function mergeSort(array) {
    if(array.length == 1) return array;
    /* 首先将无序数组划分为两个数组 */
    var mid = Math.floor(array.length / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid);
    /* 递归分别对左右两部分数组进行排序合并 */
    return merge(mergeSort(left), mergeSort(right));
}
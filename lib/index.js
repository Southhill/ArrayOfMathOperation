'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 数组元素去重
 * @param  {Array} arr 待去重的数组
 * @return {Array}     去重后的数组
 */
function uniqueArr(arr){
  let newArr = []; //返回的结果数组
  let len = arr.length;
  //遍历当前数组
  for(let i = 0; i < len; i++){
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
    if (newArr.indexOf(arr[i]) === -1) newArr.push(arr[i]);
  }
  
    return newArr;
}
/**
 * 数组扁平化处理
 * @param  {Array} arr 待扁平化的数组
 * @return {Array}     处理后的数组
 */
function steamroller(arr) {
    var resultArr = [];
    (function recArr(subArr) {
        subArr.forEach(function(v) {
            if (Array.isArray(v)) {
                recArr(v);
            } else {
                resultArr.push(v);
            }
        });
    })(arr);
    
    return resultArr;
}

// 最大公约数
const gcd = (a, b) => !b ? a : gcd(b, a % b); 
// 最小公倍数
const lcm = (a, b) => a / gcd(a, b) * b;

/**
 * 差集：两个数组的差集处理
 * @param  {Array} arr1 待处理的数组1
 * @param  {Array} arr2 待处理的数组2
 * @return {Array}      返回的结果数组
 */
function diff(arr1, arr2) {
  //对arr1,arr2先进行去重处理。
  arr1 = uniqueArr(arr1);
  arr2 = uniqueArr(arr2);
  let newArr = [];
    for(let i = 0;i < arr1.length;){
        let ln = arr2.indexOf(arr1[i]);
        if(ln != -1){
            arr1.splice(i,1);
            arr2.splice(ln,1);
          }else {
            i++;
            }
      }
    newArr = arr1.concat(arr2);
  return newArr;
}
/**
 * 并集：两个数组的并集处理
 * @param  {Array} arr1 待处理的数组1
 * @param  {Array} arr2 待处理的数组2
 * @return {Array}      返回的结果数组
 */
function union(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error('args error, should be Array Type!');
    }
    for (let item of arr2) {
        if (arr1.indexOf(item) === -1) {
            arr1.push(item);
        }
    }
    return arr1;
}
/**
 * 交集：两个数组的交集处理，最终得到的数组无重复值。
 * @param  {Array} arr1 待处理的数组1
 * @param  {Array} arr2 待处理的数组2
 * @return {Array}      返回的结果数组
 */
 function intersection(arr1, arr2) {
     if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
         throw new Error('args error, should be Array Type!');
     }
     let resultArr = [];
     for (let item of arr2) {
         if (arr1.indexOf(item) !== -1 && resultArr.indexOf(item) === -1) {
             resultArr.push(item);
         }
     }
     return resultArr;
 }
/**
 * 全排列：给定一个基本的数据类型。
 * 例：字符串，得到它的全排列，将结果存放到数组中返回。
 * @param  {String} str 传入的待排列的字符串参数
 * @return {Array}     字符串全排列后的结果数组
 */
function permutation(str) {
  var strArr = str.split('');
  var resultArr = [];
  var tempArr = [];
  // var len = str.length;
  (function rec(arr){
    if (arr.length === 1) {
      resultArr.push(tempArr.concat(arr).join(''));
      tempArr.pop();
    } else {
      var arr2 = arr.slice(0);
      var len2 = arr2.length;
      for (var i = 0;i <= len2; i++) {
        if (i < len2) {
          tempArr.push(arr2[i]);
          var arr3 = arr2.slice(0);
          arr3.splice(i, 1);
          rec(arr3);
        } else {
          tempArr.pop();
        }
      }
    }
  })(strArr);
  
  return resultArr;
}

/**
 * 创建一个项目为等差数列的数组
 * @param {Number} length 数组长度
 * @param {String} exp 等差数列的数学表达式，例如：3a+1
 * @returns {Array}
 */
function createNumArray(length, exp = 'a+1') {
    if (typeof length !== 'number') throw new Error('length must be number type')

    const reg = /^(?<a>\d+)?\s?a\s?(?:\+\s?(?<b>\d+))?$/;
    const expResult = exp.match(reg);

    if (expResult === null) throw new Error('argument:exp must be valid regexp, for example:3a+1')

    const { a = 1, b = 0 } = expResult.groups;

    return Array.from(Array(length), (_, idx) => Number(a * idx) + Number(b))
}

/**
 * 高斯消元法
 * @param {Array[[]]} mat 方程组的增广矩阵
 */
function elimination(mat) { 
  for (let i = 1,len = mat.length; i < len; i++) {
    for (let j = 0; j < i; j++) {
      // TODO: 被除数不能为0, 每次运算时，必须保证对角线上的元素不为0(即运算中的分母不为0)
      const coe = mat[i][j] / mat[j][j]; // 系数
  
      mat[i].forEach((val, idx) => {
        mat[i][idx] -= mat[j][idx] * coe;
      });
    }
  }
}

/**
 * 返回当前方程组的解的状态  
 * 解的状态：无解，多解，唯一解
 * @param {Matrix} mat 处理后的行阶梯阵
 */
function getSolutionStatus(mat) {
  let status = 'unique'; // 解的状态：无解，多解，唯一解

  if (mat.some(row => row.slice(0, -1).every(val => val === 0) && row[row.length - 1] !== 0)) status = 'no';

  if (mat.some(row => row.every(val => val === 0))) status = 'multiple';

  return status
}
/**
 * 回代
 * @param {Matrix} mat 处理后的矩阵
 */
function back_substitution(mat) {
  const rowLen = mat.length;
  const columnLen = mat[0].length;
  const result = Array(rowLen).fill();

  for (let t = rowLen - 1; t >= 0; t--) {
    const divisor = result.reduceRight((pre, cur, idx) => {
      if (cur === undefined) {
        return pre
      } else {
        return pre - mat[t][idx] * cur
      }
    }, mat[t][columnLen - 1]);

    result[t] = divisor / mat[t][t];
  }

  return result
}

/**
 * 高斯消元法
 * @param {Array[[]]} mat 方程组的增广矩阵，默认方程组的系数矩阵都是合法数值
 */
function gaussian_elimination(mat) {
  // mat 为增广矩阵
  // 校验参数
  const rowLen = mat.length;
  const columnLen = mat[0].length;

  if (columnLen - rowLen !== 1) {
    throw new Error('mat required is the augmented matrix')
  }

  // 消元
  elimination(mat);

  // 解的判断
  const solutionStatus = getSolutionStatus(mat); // 解的状态：无解，多解，唯一解


  if (solutionStatus === 'no') {
    return -1
  } else if (solutionStatus === 'multiple') {
    return []
  } else {
    // 回代
    return back_substitution(mat)
  }
}

exports.createNumArray = createNumArray;
exports.diff = diff;
exports.gaussian_elimination = gaussian_elimination;
exports.gcd = gcd;
exports.intersection = intersection;
exports.lcm = lcm;
exports.permutation = permutation;
exports.steamroller = steamroller;
exports.union = union;
exports.uniqueArr = uniqueArr;

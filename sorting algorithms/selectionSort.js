// Selection sort
let num = [3,1,2,7,4,9,8]

for (let i = 0; i< num.length ; i++) {
  let minIndex=i;
  for (let j = i; j< num.length ; j++) {
    if (num[j] < num[minIndex]) minIndex = j;
  }
  let c = num[minIndex]
  // console.log(c)
  num[minIndex] = num[i]
  num[i] = c
}

console.log(num)
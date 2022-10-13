function Queue() {
  this.q = [];
  this.head = 0;
  this.tail = 0;
}

Queue.prototype.push = function (num) {
  this.q[this.tail++] = num;
};

Queue.prototype.pop = function () {
  if (this.head === this.tail) return `삭제할 원소가 존재하지 않습니다.`;
  return this.q[this.head++];
};

Queue.prototype.size = function () {
  return this.tail - this.head;
};

Queue.prototype.isEmpty = function () {
  if (this.head === this.tail) return true;
  return false;
};

Queue.prototype.front = function () {
  if (this.head === this.tail) return `원소가 존재하지 않습니다.`;
  return this.q[this.head];
};

Queue.prototype.back = function () {
  if (this.head === this.tail) return `원소가 존재하지 않습니다.`;
  return this.q[this.tail - 1];
};

/* test */
let q = new Queue();
q.push(1);
q.push(2);
q.push(3);
q.push(4);
q.push(5);
q.push(6);
// console.log(q);
console.log(q.pop()); // 1
console.log(q.pop()); // 2
console.log(q.pop()); // 3
console.log(q.pop()); // 4
console.log(q.size()); // 2
console.log(q.isEmpty()); // false
console.log(q.front()); // 5
console.log(q.back()); // 6

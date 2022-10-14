function Deque(max = 100) {
  this.dq = Array(max);
  this.head = Math.floor(max / 2);
  this.tail = Math.floor(max / 2);
}

Deque.prototype.front = function () {
  return this.dq[this.head];
};

Deque.prototype.back = function () {
  return this.dq[this.tail - 1];
};

Deque.prototype.pushFront = function (num) {
  if (0 >= this.head) return console.error(`덱 크기 초과`);
  this.dq[--this.head] = num;
};

Deque.prototype.pushBack = function (num) {
  if (this.dq.length <= this.tail) return console.error(`덱 크기 초과`);
  this.dq[this.tail++] = num;
};

Deque.prototype.popBack = function () {
  this.tail--;
};

Deque.prototype.popFront = function () {
  this.head++;
};

Deque.prototype.size = function () {
  return this.tail - this.head;
};

Deque.prototype.isEmpty = function () {
  return this.head === this.tail;
};

/* 테스트 */
const dq = new Deque(10);
dq.pushBack(1);
dq.pushFront(2);
dq.pushFront(3);
dq.pushFront(4);
dq.pushFront(5);
dq.pushFront(6);
dq.pushBack(6);
dq.pushBack(7);
dq.pushBack(8);
dq.pushBack(9);
dq.pushBack(10);

console.log(dq);

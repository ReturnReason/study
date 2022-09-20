// 노드 생성자 : data, point를 가지고 있음
function Node(data) {
  this.data = data;
  this.next = null; // 포인터
}

// Linked List : head, length
function LinkedList() {
  this.head = null;
  this.length = 0;
}

// Size
LinkedList.prototype.size = function () {
  return this.length;
};

// Empty : length 0인지 T/F 로 반환
LinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};

// Print Node : 노드 출력
LinkedList.prototype.printNode = function () {
  let str = '';
  for (let node = this.head; node !== null; node = node.next) {
    str += `${node.data} -> `;
  }
  str += 'null';
  console.log(str);
};

// Append : 연결리스트 가장 끝에 노드 추가
LinkedList.prototype.Append = function (value) {
  let node = new Node(value);
  let current = this.head;

  if (this.head === null) {
    this.head = node;
  } else {
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }

  this.length++;
};

// n번째 위치에 노드 추가하기
// position을 입력하지 않으면 기본값 0
LinkedList.prototype.insert = function (value, position = 0) {
  if (position < 0 || position > this.length) return false;

  let node = new Node(value);
  let current = this.head;
  let index = 0;
  let prev;

  if (position === 0) {
    node.next = current;
    this.head = node;
  } else {
    while (index++ < position) {
      prev = current;
      current = current.next;
    }
    node.next = current;
    prev.next = node;
  }

  this.length++;
};

// Remove : 해당 value가 있으면 노드 삭제
LinkedList.prototype.remove = function (value) {
  let current = this.head;
  let prev = current;

  while (current.data !== value && current.next !== null) {
    prev = current;
    current = current.next;
  }

  if (current.data !== value) return null;
  if (current === this.head) {
    this.head = current.next;
  } else {
    prev.next = current.next;
  }

  this.length--;

  return current.data;
};

LinkedList.prototype.removeAt = function (position = 0) {
  if (position < 0 || position >= this.length) return null;

  let current = this.head;
  let index = 0;
  let prev;

  if (position === 0) {
    this.head = current.next;
  } else {
    while (index++ < position) {
      prev = current;
      current = current.next;
    }

    prev.next = current.next;
  }

  this.length--;

  return current.data;
};

// Index Of
LinkedList.prototype.indexOf = function (value) {
  let current = this.head;
  let index = 0;

  while (current !== null) {
    if (current.data === value) {
      return index;
    }
    index++;
    current = current.next;
  }
  return -1; // current가 끝지점(null)일 때 -1
};

// IndexOf 함수에서 이어서 사용할 remove2 함수
LinkedList.prototype.remove2 = function (value) {
  let index = this.indexOf(value);
  return this.removeAt(index);
};

const ll = new LinkedList();
ll.insert(1);
ll.insert(3);
ll.insert(2);
console.log(ll.remove(100));
console.log(ll.removeAt(1));
console.log(ll.removeAt(4));
console.log(ll.remove2(1));

ll.printNode();
console.log(ll.size());

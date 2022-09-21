function LinkedList() {
  this.head = null;
  this.length = 0;
}

function Node(data) {
  this.data = data;
  this.next = null;
}

// 노드 개수 출력
LinkedList.prototype.size = function () {
  return this.length;
};

// 노드가 비어있는지 확인
LinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};

// 현재 노드 모두 출력
LinkedList.prototype.printNode = function () {
  let currentNode = this.head;
  let print = [];
  while (currentNode !== null) {
    print.push(currentNode.data);
    currentNode = currentNode.next;
  }

  return print;
};

// 노드 맨 뒤에 추가
LinkedList.prototype.append = function (value) {
  let currentNode = this.head;
  let node = new Node(value);

  // 연결 리스트 비어있는지 확인 후
  // 비어 있는 경우 맨 앞 head에 추가
  if (this.length === 0) {
    this.head = node;
  } else {
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;
  }

  this.length++;
};

// n번째 위치에 노드 추가
LinkedList.prototype.insert = function (value, index = 0) {
  let idx = 0;
  let currentNode = this.head;
  let preNode;
  let node = new Node(value);

  if (this.length === 0) {
    this.head = node;
  } else if (index < 0 || index > this.length) {
    return console.log(`out of range`);
  } else {
    if (index === 0) {
      this.head = node;
      node.next = currentNode;
    } else {
      while (idx !== index) {
        preNode = currentNode;
        currentNode = currentNode.next;
        idx++;
      }
      // 새 노드 전 노드에게 새 노드 주소 주기
      // 새 노드에게 다음 노드 주소 주기
      preNode.next = node;
      node.next = currentNode;
    }
  }

  this.length++;
};

// 특정 값 노드 삭제
LinkedList.prototype.remove = function (value) {
  let index = 0;
  let node = this.head;
  let prevNode;

  if (this.length === 0) return; // 노드가 없는 경우 리턴

  while (node.data !== value && node.next !== null) {
    prevNode = node;
    node = node.next;
    index++;
  }

  if (index === 0) {
    this.head = node.next;
  } else {
    prevNode.next = node.next;
  }

  this.length--;

  //삭제한 노드 반환
  return node;
};

// 노드 위치 확인
LinkedList.prototype.indexOf = function (value) {
  let index = 0;
  let node = this.head;
  let isFound = true;

  if (this.length === 0) return;

  while (node.data !== value) {
    node = node.next;
    index++;

    if (node.next === null) {
      isFound = false;
      break;
    }
  }

  return isFound ? index : -1;
};

// 해당 위치 노드 삭제
LinkedList.prototype.removeAt = function (removeIndex) {
  let idx = 0;
  let node = this.head;
  let prevNode;

  if (removeIndex < 0 || removeIndex >= this.length) {
    return `out of range`;
  }

  if (removeIndex === 0) {
    this.head = node.next;
  } else {
    while (idx !== removeIndex && node.next !== null) {
      prevNode = node;
      node = node.next;
      idx++;
    }

    prevNode.next = node.next;
    node = node.next;
  }

  this.length--;
};

/* 연결 리스트 테스트 */
const ll = new LinkedList();
ll.append(456);
ll.append(3);
ll.append(1);
ll.append(2);
ll.insert('ㅋㅋ까르륵', 4);
console.log(ll.removeAt());

console.log(ll.printNode());
console.log(ll);

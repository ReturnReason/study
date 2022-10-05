function DoublyLinkedList() {
  this.length = 0;
  this.head = null;
  this.tail = null;
}

function Node(data) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

DoublyLinkedList.prototype.append = function (data) {
  let newNode = new Node(data);

  if (this.length === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.length++;

  // return console.log(`${data}를 노드에 추가했습니다.`);
};

DoublyLinkedList.prototype.pop = function () {
  if (this.length > 1) {
    this.tail = this.tail.prev;
    this.tail.next = null;
  } else {
    this.head = null;
    this.tail = null;
  }
  this.length--;
};

// n번째 위치에 노드 삽입
DoublyLinkedList.prototype.insert = function (index, data) {
  let currentIndex = 0;
  let newNode = new Node(data);
  let currentNode = this.head;

  if (index < 0 || index > this.length) {
    return console.log('인덱스 범위를 벗어남.');
  }

  // 현재 노드 0이면서 삽입할 인덱스 값이 0인 경우
  if (index === 0 && this.length === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else if (index === 0) {
    currentNode.prev = newNode;
    newNode.next = currentNode;
    this.head = newNode;
  } else if (index === this.length) {
    // 마지막에 추가하는 경우
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  } else {
    while (currentNode.next !== null) {
      if (currentIndex === this.length - 1) break;
      if (currentIndex === index) break;
      currentNode = currentNode.next;
      currentIndex++;
    }
    newNode.next = currentNode;
    newNode.prev = currentNode.prev;
    newNode.prev.next = newNode;
    currentNode.prev = newNode;
  }

  this.length++;
  // return console.log(`${data}를 노드에 추가했습니다.`);
};

// n번째 위치 노드 삭제
DoublyLinkedList.prototype.removeNode = function (index) {
  let currentIndex = 0;
  let currentHeadNode = this.head;
  let currentTailNode = this.tail;
  if (index < 0 || index >= this.length) {
    return console.log('인덱스 범위를 벗어남');
  }

  if (index === 0 && this.length === 1) {
    this.head = null;
    this.tail = null;
  } else if (index === 0) {
    this.head = currentHeadNode.next;
    this.head.prev = null;
  } else if (index === this.length - 1) {
    currentTailNode.prev.next = null;
    this.tail = null;
  } else {
    while (currentIndex !== index) {
      currentHeadNode = currentHeadNode.next;
      currentIndex++;
    }
    currentHeadNode.prev.next = currentHeadNode.next;
    currentHeadNode.next.prev = currentHeadNode.prev;
  }

  this.length--;
  return console.log(`${index}번째 노드가 삭제되었습니다.`);
};

// 특정 값을 가진 노드 삭제
DoublyLinkedList.prototype.removeNodeValue = function (value) {
  let currentIndex = 0;
  let currentNode = this.head;
  let isFound = false;

  if (this.length === 0) return console.log('삭제할 노드가 없습니다');

  while (currentNode.next !== null) {
    if (currentNode.data === value) {
      isFound = true;
      break;
    }
    currentNode = currentNode.next;
    currentIndex++;
  }

  // 마지막에 위치한 노드 data가 지울 value인 경우
  if (currentIndex === this.length - 1 && value === currentNode.data) {
    isFound = true;

    if (currentNode.prev === null) {
      this.head = null;
      this.tail = null;
    } else {
      currentNode.prev.next = null;
    }
  }

  if (!isFound) return console.log('해당 값이 존재하지 않습니다.');

  if (currentIndex === 0) {
    this.head = currentNode.next;
    currentNode.prev = null;
  } else if (currentIndex !== this.length - 1) {
    currentNode.prev.next = currentNode.next;
    currentNode.next.prev = currentNode.prev;
  }

  this.length--;
  return console.log(`${value} 값을 가진 노드가 삭제되었습니다.`);
};

// 현재 노드 순서대로 출력
DoublyLinkedList.prototype.printNode = function () {
  let currentNode = this.head;
  let nodes = [];

  if (this.length === 0) return console.log('출력할 노드 없음');

  if (this.length >= 1) {
    while (currentNode.next !== null) {
      nodes.push(currentNode.data);
      currentNode = currentNode.next;
    }
  }

  nodes.push(currentNode.data);
  return nodes;
};

// 이중 연결 리스트 맨 끝에서부터 출력 (리버스 출력)
DoublyLinkedList.prototype.printReverseNode = function () {
  let currentIndex = this.length - 1;
  let currentNode = this.tail;
  let nodes = [];

  if (this.length === 0) return nodes;

  while (currentIndex >= 0) {
    nodes.push(currentNode.data);
    currentNode = currentNode.prev;
    currentIndex--;
  }
  return nodes;
};

// 이중 연결 리스트가 비어있는지 확인
DoublyLinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};

// 현재 이중 연결 리스트 길이 출력
DoublyLinkedList.prototype.printLength = function () {
  return this.length;
};

let dll = new DoublyLinkedList();
dll.append(1);
dll.append(2);
// dll.append(3);
// dll.removeNodeValue("3번째");
// dll.insert(0, "0번째에 추가 할게요");
dll.removeNode(0);
dll.removeNodeValue(2);

console.log(dll.printLength());
console.log(dll);
console.log(dll.printNode());
console.log(dll.printReverseNode());

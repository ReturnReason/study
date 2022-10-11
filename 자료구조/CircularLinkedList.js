/* 
  원형 연결 리스트 직접 구현해보기
*/

function Node(data) {
  this.data = data;
  this.next = null;
}

function CLL() {
  this.length = 0;
  this.head = null;
}

// 맨 뒤에 노드 추가
CLL.prototype.append = function (data) {
  let node = new Node(data);

  if (this.length === 0) {
    this.head = node;
    node.next = node;
  } else {
    let currentNode = this.head.next;
    while (currentNode.next !== this.head) {
      currentNode = currentNode.next;
    }
    currentNode.next = node;
    node.next = this.head;
  }

  this.length++;
};

// 맨 뒤 노드 제거
CLL.prototype.pop = function () {
  if (this.length === 0) return;
  if (this.length === 1) {
    this.head = null;
  } else {
    let prevNode = this.head;
    let currentNode = this.head.next;
    while (currentNode.next !== this.head) {
      currentNode = currentNode.next;
      prevNode = prevNode.next;
    }
    prevNode.next = this.head;
  }
  this.length--;
};

CLL.prototype.isEmpty = function () {
  return this.length === 0;
};

CLL.prototype.length = function () {
  return this.length;
};

CLL.prototype.dropData = function (data) {
  if (this.length === 0) return `연결 리스트에 노드가 존재하지 않음.`;
  let currentNode = this.head;
  let prevNode = this.head;
  let index = 0;
  let foundData = false;
  let lastNode;

  for (let node = this.head.next; node !== this.head; node = node.next) {
    lastNode = node;
  }

  while (currentNode.data !== data && index < this.length) {
    if (currentNode.data === data) {
      foundData = true;
      break;
    } else {
      currentNode = currentNode.next;
      prevNode = currentNode;
      index++;
    }
  }

  if (currentNode.data === data) foundData = true;
  if (!foundData) return `찾는 데이터 값이 존재하지 않음`;

  if (this.length === 1) {
    this.head = null;
  } else if (index === 0) {
    this.head = currentNode.next;
    lastNode.next = this.head;
  } else {
    prevNode.next = currentNode.next;
  }

  this.length--;
  return `${data}값을 가진 노드가 삭제되었습니다.`;
};

CLL.prototype.insert = function (index, data) {
  if (this.length < index || 0 > index) {
    return `잘못된 인덱스 설정`;
  }

  let newNode = new Node(data);
  let currentNode = this.head;
  let prevNode;
  let lastNode;
  let currentIndex = 0;

  // 현재 노드가 없는 경우
  if (this.length === 0) {
    this.head = data;
  } else if (this.length === index) {
    // 가장 마지막에 추가하는 경우
    for (let node = this.head.next; node !== this.head; node = node.next) {
      lastNode = node;
    }

    lastNode.next = newNode;
    newNode.next = this.head;
  } else {
    // 중간에 추가하는 경우
    while (currentIndex !== index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }
    console.log({ currentNode, prevNode });
    newNode.next = currentNode;
    prevNode.next = newNode;
  }

  this.length++;
  return `${index}번째에 ${data}값을 가진 노드가 추가되었습니다.`;
};

CLL.prototype.dropDataAt = function (index) {
  if (index > this.length || index < 0) return `잘못된 인덱스 설정`;

  let currentIndex = 0;
  let currentNode = this.head;
  let prevNode;
  let lastNode;

  if (this.length === 0) return `삭제할 수 있는 노드가 존재하지 않습니다.`;

  // 맨 앞 노드 삭제하는 경우
  if (index === 0) {
    for (let node = this.head.next; node !== this.head; node = node.next) {
      lastNode = node;
    }
    currentNode = currentNode.next;
    this.head = currentNode;
    lastNode.next = currentNode;
  } else if (index === this.length) {
    // 맨 뒤 노드 삭제하는 경우
    for (let node = this.head.next; node !== this.head; node = node.next) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    prevNode.next = this.head;
  } else {
    // 중간 노드 삭제하는 경우
    while (currentIndex !== index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    currentNode = currentNode.next;
    prevNode.next = currentNode;
  }

  this.length--;
  return `${index}번째 노드가 삭제되었습니다.`;
};

CLL.prototype.printNode = function () {
  if (this.length === 0) return [];
  if (this.length === 1) return [this.head.data];
  let currentNode = this.head.next;
  let nodeList = [];

  nodeList.push(this.head.data);
  while (currentNode.next !== this.head) {
    nodeList.push(currentNode.data);
    currentNode = currentNode.next;
  }

  nodeList.push(currentNode.data);

  return nodeList;
};

let cll = new CLL();

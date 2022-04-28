const imgContainer = document.querySelector('.image-container');
const startBtn = document.querySelector('.start-btn');
const gameTxt = document.querySelector('.clear-txt');
const playTime = document.querySelector('.time');

const tileCount = 16;

let isPlaying = false;
let timeInterval = null;
let time = 0;

let tiles = [];
const dragged = {
  el: null,
  class: null,
  index: null,
};

startBtn.addEventListener('click', () => {
  setGame();
});

function createImgTiles() {
  let list = [];

  Array(tileCount)
    .fill()
    .forEach((any, idx) => {
      const li = document.createElement('li');
      li.setAttribute('data-idx', idx);
      li.setAttribute('draggable', true);
      li.classList.add(`list${idx}`);

      list.push(li);
    });

  /* 퍼즐 조각의 위치 정하기 */
  let i = 0;
  for (let y = 0; y > -400; y -= 100) {
    for (let x = 0; x > -400; x -= 100) {
      list[i].style.backgroundPosition = `${x}px ${y}px`;
      i++;
    }
  }

  return list;
}

/* 퍼즐조각 섞기 */
function shuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }

  return array;
}

function setGame() {
  isPlaying = true;
  clearInterval(timeInterval);

  imgContainer.innerHTML = '';

  timeInterval = setInterval(() => {
    playTime.innerText = time;
    time++;
  }, 1000);

  tiles = createImgTiles();
  tiles.forEach((tile) => {
    imgContainer.appendChild(tile);
  });

  setTimeout(() => {
    shuffle(tiles).forEach((tile) => {
      imgContainer.appendChild(tile);
    });
  }, 2000);
}

// 이벤트
imgContainer.addEventListener('dragstart', (e) => {
  if (!isPlaying) {
    return;
  }

  const obj = e.target;
  dragged.el = obj;
  dragged.class = obj.className;
  dragged.index = [...obj.parentNode.children].indexOf(obj);
  console.log(dragged.index);
});

imgContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  // console.log(e);
});

imgContainer.addEventListener('drop', (e) => {
  if (!isPlaying) {
    return;
  }

  const obj = e.target;

  if (obj.className !== dragged.class) {
    let originPlace;
    let isLast = false; //  마지막 요소인지

    if (dragged.el.nextSibling) {
      originPlace = dragged.el.nextSibling;
    } else {
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }
    const droppedInedx = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedInedx ? obj.before(dragged.el) : obj.after(dragged.el);
    isLast ? originPlace.after(obj) : originPlace.before(obj);
  }

  checkStatus();
});

function checkStatus() {
  const currentList = [...imgContainer.children];
  const unMatchedList = currentList.filter((child, idx) => {
    Number(child.getAttribute('data-idx')) !== idx;
  });

  if (unMatchedList.length === 0) {
    // gameTxt.style.display = 'block';
    let isPlaying = false;
    clearInterval(timeInterval);
  }

  // console.log(currentList);
  // console.log(unMatchedList);
}

/*
  
  0,0       -100,0        -200,0        -300,0      
  0,-100    -100,-100    -200, -100,    -300,100
  0,-200   -100, -200    -200,-200      -300,-200
  0,-300   -100,  -300    -200,-300     -300,-300
  
  */

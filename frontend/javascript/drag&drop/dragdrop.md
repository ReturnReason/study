> 자바스크립트 복습 겸 드래그 앤 드롭 이벤트 구현 공부

## 바닐라 자바스크립트로

## 드래그 앤 드롭 구현해보기

<br>

![](https://velog.velcdn.com/images/reasonz/post/9b642356-96e0-4ad5-a15c-8855fd96423c/image.png)

HTML과 CSS를 사용해 드래그할 요소와 드래그 박스를 만들었다.

```
<li draggable="true">💙</li>

```

드래그 요소에는 draggable 속성을 작성해주면 된다.

![](https://velog.velcdn.com/images/reasonz/post/569f784a-f930-420f-a5a2-4235c77fe0dc/image.gif)

# drag 이벤트 살펴보기

드래그 이벤트는 드래그 가능한 대상에서 발생할 수 있는 이벤트이다.

1. dragstart
   드래그가 처음 시작되면 1회 발생한다.

2. drag
   드래그 중일 때 계속 발생한다.

3. dragend
   드래그가 끝날 때 1회 발생한다.

## 드래그 이벤트 사용해보기

```javascript
const listItems = document.querySelector('.list-items');
listItems.addEventListener('drag', () => {
  console.log('드래그 이벤트');
});

listItems.addEventListener('dragstart', (e) => {
  e.target.style.opacity = 0.5;
  console.log('드래그 start');
});

listItems.addEventListener('dragend', (e) => {
  e.target.style.opacity = 1;
  console.log('드래그 엔드');
});
```

위 코드는 이벤트 버블링을 이용하여 각각의 li 요소에 이벤트를 부착하는 것이 아닌, 부모 ul 요소에 drag 이벤트를 달았다.

드래그 시작할 때 해당하는 요소의 불투명도가 50%가 되면서 시각적으로 어떤 요소가 드래그 중인지 확인할 수 있다.
드래그가 끝나면 다시 불투명도를 100%로 만들어 준다.

![](https://velog.velcdn.com/images/reasonz/post/2b505c61-71dd-4e5b-88c6-42e13455d431/image.gif)

## 드롭 박스에 적용할 drag & drop 이벤트 살펴보기

1. dragenter
   드롭될 박스 요소에 이 이벤트를 달면 드래그가 가능한 요소가 이곳에 닿았을 때(진입하면) 1회 발생한다.

2. dragover
   드래그 가능한 요소가 이 이벤트가 달린 요소 위에서 이동 중이거나 위치해 있으면 계속 발생한다.

3. dragleave
   드래그 가능한 요소가 이 이벤트가 달린 요소를 벗어났을 때 1회 발생한다.

4. drop
   dragover 이벤트와 함께 사용한다.
   dragover 이벤트와 함께 기본 동작 막기`prventDefault()`를 걸어야 제대로 실행된다.

![](https://velog.velcdn.com/images/reasonz/post/d080abef-dd8f-4e69-988d-651b097fde7c/image.gif)

```javascript
/* 드래그 이벤트가 도착하는 위치 */
dragHere.addEventListener('dragenter', (e) => {
  e.stopPropagation();
  console.log('드래그 엔터');
  e.target.style.background = 'pink';
});

dragHere.addEventListener('dragleave', (e) => {
  e.stopPropagation();
  console.log('드래그 리브');
  e.target.style.background = '';
});

dragHere.addEventListener('dragover', (e) => {
  e.preventDefault();
  console.log('드래그 오버');
});

dragHere.addEventListener('drop', (e) => {
  e.preventDefault();
  console.log('드롭');
  e.target.style.background = '';
});
```

자바스크립트로 style을 조작하는 코드 부분을 class 부착, 제거하는 코드로 변경하여 작성해주었다.

![](https://velog.velcdn.com/images/reasonz/post/e7c478b4-2a8a-461d-84bf-9df05fd23002/image.gif)

## 드래그 박스에 드롭했을 때 요소 옮기기

드래그 박스로 드롭했을 때 드래그 박스로 요소가 이동하려면,
현재 드래그 중인 요소가 무엇인지 알아야 하고
드래그 박스에 '여기에 드래그 하세요' 문구가 있는 경우에 이 문구를 지우고 ul태그의 자식 요소로 추가하도록 한다.

```javascript
/* 전체 JS 코드 */
const listItems = document.querySelector('.list-items');
const dragHere = document.querySelector('.drag-here');

let currentItem;

/* 드래그 이벤트 발생 요소 */
listItems.addEventListener('drag', (e) => {
  e.target.classList.add('dragging');
});

listItems.addEventListener('dragstart', (e) => {
  currentItem = e.target;
});

listItems.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
});

/* 드롭 이벤트 발생 요소 */
dragHere.addEventListener('dragenter', (e) => {
  e.stopPropagation();
  e.target.classList.add('drag-enter');
});

dragHere.addEventListener('dragleave', (e) => {
  e.stopPropagation();
  e.target.classList.remove('drag-enter');
});

dragHere.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dragHere.addEventListener('drop', function (e) {
  e.preventDefault();
  e.target.classList.remove('drag-enter');

  if (document.querySelector('#text')) {
    dragHere.removeChild(document.querySelector('#text'));
  }

  const dragBox = document.querySelector('.drag-list-box');
  dragBox.appendChild(currentItem);
  currentItem.classList.remove('dragging');
});
```

![](https://velog.velcdn.com/images/reasonz/post/d5ffc3a8-0b68-4814-94d5-7622d701fe26/image.gif)

금방 해결할 줄 알았는데 생각처럼 마음대로 동작을 안해서 애를 먹었다....😥
일단은 생각한대로 구현하긴 했는데 다음에 다시 구현하면서 더 나은 코드가 있다면 방법을 찾아봐야겠다.
요소들 사이에서 드래그 해도 위치가 이동되는 드래그 이벤트도 같이 구현해보면 좋을 것 같다.

---

> 참고 자료

> [MDN drag 이벤트](https://developer.mozilla.org/ko/docs/Web/API/Document/drag_event)

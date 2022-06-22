이틀 전에 혼자 드래그 앤 드롭 구현했을 때 동작은 잘 되는데 뭔가 아쉬운..? 느낌이 있어서 관련 영상 찾아서 따라 만들어보고 복습겸 다시 만들어보았다.

```html
<ul class="list">
  <li class="item" draggable="true">R</li>
  <li class="item" draggable="true">E</li>
  <li class="item" draggable="true">A</li>
  <li class="item" draggable="true">S</li>
  <li class="item" draggable="true">O</li>
  <li class="item" draggable="true">N</li>
</ul>
```

![](https://velog.velcdn.com/images/reasonz/post/74085f57-dd6d-4ad7-a94a-a63c7f26ce7f/image.png)

```javascript
const list = document.querySelector('.list');
let currentItemIndex = null;
let currentItem = null;

list.addEventListener('dragstart', (e) => {
  currentItem = e.target;
  const listArr = [...currentItem.parentElement.children];
  currentItemIndex = listArr.indexOf(currentItem);
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
});

list.addEventListener('drop', (e) => {
  e.preventDefault();

  const currentDropItem = e.target;
  const listArr = [...currentItem.parentElement.children];
  const dropItemIndex = listArr.indexOf(currentDropItem);

  if (currentItemIndex < dropItemIndex) {
    currentDropItem.after(currentItem);
  } else {
    currentDropItem.before(currentItem);
  }
});
```

## 작성한 코드 정리

```javascript
const list = document.querySelector('.list');
```

1. `list` 이름의 변수를 선언하여 class가 list인 요소를 선택하였다. ul 태그가 선택될 것이다.

```javascript
let currentItemIndex = null;
let currentItem = null;
```

2. `let`으로 선언한 `currentItemIndex`와 `currentItem`은 현재 drag를 시작한 요소의 인덱스와 HTML요소를 선택하기 위한 변수이다.

```javascript
list.addEventListener('dragstart', (e) => {
  currentItem = e.target;
  const listArr = [...currentItem.parentElement.children];
  currentItemIndex = listArr.indexOf(currentItem);
});
```

3. dragstart 이벤트가 발생하면 `2번`에서 선언한 변수에 currentItem에 `e.target`이 저장된다.
   여기서 e.target은 dragstart 이벤트가 발생한 HTML요소를 의미한다. 즉, currentItem 변수에는 해당하는 HTML 요소가 담길 것이다.
   const로 선언한 listArr 변수는 `...spread` 문법을 사용했다. spread문법은 이터러블한 데이터에 사용할 수 있는 문법으로 배열 내장 메소드인 indexOf를 사용하기 위해 사용한 문법이다. HTML 콜렉션은 유사 배열형태라 indexOf 메소드를 사용할수 없기 때문이다.
   위 코드에서 `e.target.parentElement.children`으로 접근하면 HTML 콜렉션 유사 배열이 출력되는데 이 유사배열을 배열로 변경시키는 코드인 것이다.
   listArr 변수에 유사배열을 스프레드 문법을 통해 배열로 만든 후, `currentItemIndex` 변수 값으로 현재 드래그가 시작된 요소의 `index` 번호를 저장한다.

```javascript
list.addEventListener('dragover', (e) => {
  e.preventDefault();
});
```

4. drop이벤트를 사용하기 위해서는 dragover 이벤트가 반드시 있어야 제대로 동작한다. 또, drop 이벤트가 발생되기 위해 `e.preventDefault();`로 기본 동작을 막았다. 기본동작을 막지 않으면 drop 이벤트가 발생되지 않는다.

```javascript
list.addEventListener('drop', (e) => {
  e.preventDefault();

  const currentDropItem = e.target;
  const listArr = [...currentItem.parentElement.children];
  const dropItemIndex = listArr.indexOf(currentDropItem);

  if (currentItemIndex < dropItemIndex) {
    currentDropItem.after(currentItem);
  } else {
    currentDropItem.before(currentItem);
  }
});
```

5. drop이벤트를 달면 현재 드래그 중인 요소가 드롭됐을 때 발생한다. 여기서 `e.target`은 `드롭된 위치에 있는 요소`가 선택된다.
   `currentDropItem`이라는 const 변수를 선언하여 e.target을 저장해주었다. e.target이라고 계속 사용해도 되지만 자주 사용되거나 헷갈릴 때는 변수에 담아서 사용하면 좋다.
   마찬가지로 `3번`에서 했던 것처럼 indexOf 배열 내장 메소드를 사용하기 위해 listArr 변수에 spread 문법을 사용해 배열을 담고 `dropItemIndex`에 indexOf 배열 내장 메소드를 사용해 현재 `drop 이벤트가 발생한 아이템의 인덱스를 저장`시켰다.

6. 위 코드에서 if, else부분은 삼항 연산자로 작성할 수도 있지만, if와 else안에 들어갈 코드가 아직은 한눈에 들어오지 않아서 if-else로 사용했다.
   조건을 살펴보면 `currentItemIndex < dropItemIndex` 이면 if문을, 아니면 else문을 실행할 것이다.

즉, `currentItemIndex`이 `dropItemIndex`보다 작을 때 참이 된다는 것인데 배열의 인덱스는 0부터 시작해서 1씩 커진다는 점을 생각해보면

```javascript
currentDropItem.after(currentItem);
```

현재 선택한 요소의 인덱스보다 놓은 곳의 인덱스가 크면 현재 선택한 요소가 더 앞쪽에 있다는 것이므로 drop된 요소의 뒤쪽(after)으로 보내면 된다.

```javascript
else {
    currentDropItem.before(currentItem);
}
```

그렇지 않으면 앞쪽(before)로 보내면 된다.

![](https://velog.velcdn.com/images/reasonz/post/0847a884-a997-4e52-b1db-64f7379c31ea/image.gif)

이렇게만 작성하면 위와 같은 움짤 결과물이 된다.
현재 선택한 요소는 원하는 위치에 놓을 수 있지만 drop된 위치의 요소는 한자리 밀려날뿐 서로 swap되어 두 요소가 서로 자리를 바꾸는 형태로 동작하지는 않는다.

다음번에는 선택한 요소와 드롭 자리의 요소의 위치를 서로 맞바꾸는 방법을 공부해봐야겠다.

---

> 참고 자료

> [드래그 이벤트, 바닐라로 손쉽게 만들어 보아요](https://www.youtube.com/watch?v=RkuoX9eeOEc&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

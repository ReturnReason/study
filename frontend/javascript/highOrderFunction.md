자바스크립트는 함수를 함수의 인자로 받을 수 있으며 함수가 함수를 반환하는 것도 가능하다.

변수처럼 사용할 수 있는 함수를 `일급 함수`라고 한다.

# 고차함수

함수의 파라미터로 넘겨받은 함수를 호출하거나, 반환하는 함수이다.

함수에서 중복이 발생하는 부분이 있다면 매개변수로 만들어보자.

```html
<div id="app">
  <p id="number">0</p>
  <button id="increase1">1 증가</button>
  <button id="increase2">2 증가</button>
  <button id="increase3">3 증가</button>
  <button id="increase4">4 증가</button>
</div>
```

```js
const $showNumber = document.querySelector('#number');
const $incBtn1 = document.querySelector('#increase1');
const $incBtn2 = document.querySelector('#increase2');
const $incBtn3 = document.querySelector('#increase3');
const $incBtn4 = document.querySelector('#increase4');

let num = 0;

$incBtn1.addEventListener('click', () => {
  $showNumber.innerText = num += 1;
});

$incBtn2.addEventListener('click', () => {
  $showNumber.innerText = num += 2;
});

$incBtn3.addEventListener('click', () => {
  $showNumber.innerText = num += 3;
});

$incBtn4.addEventListener('click', () => {
  $showNumber.innerText = num += 4;
});
```

그냥 보기만 해도 매우 잘못 만들어진 것 같은게 느껴지는 코드가 있다.
위 코드는 작명은 그렇다치고.. 동일한 코드가 반복되고 있다.

일단 이 코드의 중복되는 부분을 조금 수정해보면

```js
const $showNumber = document.querySelector('#number');
const $incBtn1 = document.querySelector('#increase1');
const $incBtn2 = document.querySelector('#increase2');
const $incBtn3 = document.querySelector('#increase3');
const $incBtn4 = document.querySelector('#increase4');

let num = 0;

const addNumber = (n) => {
  $showNumber.innerText = num += n;
};

$incBtn1.addEventListener('click', addNumber(1));
$incBtn2.addEventListener('click', addNumber(2));
$incBtn3.addEventListener('click', addNumber(3));
$incBtn4.addEventListener('click', addNumber(4));
```

이런 형태로 만들 수 있을 것 같다.
addNumber라는 변수에 함수를 넣어서 파라미터로 n을 받도록 했다.

> 하지만, 이 코드는 현재 정상적으로 동작하지 않는다.

`$incBtn1.addEventListener("click", 콜백함수);`

그 이유는 이벤트 리스너의 두번째 파라미터로 콜백함수가 들어와야 하는데 지금 함수를 밖으로 빼면서 return 값이 undefined인 상태이다. 고로 이벤트리스너 두번째 파라미터로 `undefined`를 넣은 것과 같다는 것이다.

정상적으로 동작시키기 위해서는 다음과 같이 코드를 수정하면 된다.

```js
const addNumber = (n) => {
  return () => {
    $showNumber.innerText = num += n;
  };
};
```

addNumber의 리턴 값으로 함수를 보내주면 된다는 것이다.

![](https://velog.velcdn.com/images/reasonz/post/8acc8786-9cf2-4537-8be5-9ba81c78f137/image.gif)

이제 정상적으로 동작한다.

> 화살표 함수는 중괄호와 return이 붙으면 생략이 가능하기 때문에 코드를 더 짧게 줄일 수 있다.

```js
const addNumber = (n) => () => {
  $showNumber.innerText = num += n;
};
```

생긴걸 처음 봤을 때는 이게 도대체 무슨 함수인가.. 싶었지만 return을 생략해서 이런 모양새가 되었다.

이 코드를 읽을 때는 함수가 함수를 리턴하고 있다고 이해하면 된다. (고차함수)

---

> 참고 자료

> [MDN 일급 함수](https://developer.mozilla.org/ko/docs/Glossary/First-class_Function)

> [제로초 함수 중복 제거하기](https://www.youtube.com/watch?v=I-Qp_QOZkjI&ab_channel=ZeroChoTV)

# 자바스크립트 콜백함수

<br>

콜백함수는 `다른 함수의 인자로 사용`되는 함수로 외부 함수에서 호출되는 함수를 의미한다.
즉, 함수의 파라미터로 함수가 들어가는 함수가 콜백함수라는 것이다.

```javascript
function sayHi(name) {
  console.log(`Hi, my name is ${name}`);
}

function name(callback) {
  callback('IU');
}

name(sayHi);
```

함수 두개를 만들었다. 하나는 sayHi라는 일반적인 파라미터를 받아서 인사를 출력하는 함수이고,
하나는 함수(callback)를 파라미터로 받아 내부에서 함수를 실행시키는 일명 콜백함수이다.
`name(sayHi)`는 name라는 함수에 sayHi라는 함수를 인자로 전달한다. name함수 안에서 받은 콜백 함수는 sayHi 함수를 실행시키고 전달받은 인자 'IU'를 해당 함수 내부의 파라미터 값으로 사용된다.
즉, 위 코드는 `sayHi = callback(name에 사용된 파라미터)`가 된다.

<br>

## 콜백함수는 왜 쓰이나?

콜백함수를 사용하면 순차적으로 실행하고 싶은 코드가 있을 때 순차적으로 실행시킬 수 있다.
자바스크립트는 동기식 언어로 코드를 한줄씩 처리하게 되는데 중간에 setTimeout이나 이벤트 리스너와 같이 순차적으로 실행해야 하는 코드가 있다면 그때 콜백함수를 사용한다.

```javascript
function first() {
  setTimeout(() => {
    console.log('0초 뒤에 실행할래!');
  }, 0);
}

function second() {
  console.log('두번째로 실행해주세요!');
}

first();
second();
```

first함수 안에는 setTimeout 함수가 있어 0초 뒤에 "0초 뒤에 실행할래!"라는 문구를 출력하도록 하는 코드를 작성하였다. (최소4ms이라 0초라 해도 0초가 아니긴 하지만..)
그 다음 second함수를 실행하도록 했다.

![](https://velog.velcdn.com/images/reasonz/post/73771fb4-bcd8-421f-9781-9dd6a1d82e66/image.png)

원하는 결과는 first() -> second() 각 함수의 출력결과이지만,
second함수의 결과값이 먼저 출력되고, 그 다음 first함수의 출력값이 콘솔에 찍혔다.
이 결과의 원인은 first 함수 내부에서 setTimeout을 사용했기 때문인데 setTimeout이나 이벤트리스너와 같은 함수들은 특정 조건(클릭이라던가, n초 후 실행)을 만족해야 내부 코드를 실행한다.
즉, setTimeout에 0초 후 실행하기 위해 잠시 임시로 저장되는 공간으로 따로 보내진다.
그 사이에 second함수가 먼저 실행되기 때문에 first보다 second가 더 먼저 실행된 것이다.

<br>

### 이런 경우에 first -> second 순으로 실행하려면 어떻게 해야 할까?

그때 바로 사용할 수 있는 것이 콜백함수일 것이다.

```javascript
function first(callback) {
  setTimeout(() => {
    console.log('0초 뒤에 실행할래!');
    callback();
  }, 0);
}

function second() {
  console.log('두번째로 실행해주세요!');
}

first(second);
```

![](https://velog.velcdn.com/images/reasonz/post/610b278e-7ca2-435b-b862-9e36a5bdcaa8/image.png)

first 함수의 파라미터로 second함수를 넣었고 first함수 안의 setTimeout 내부에서 callback함수를 호출하였다.

<br>

### 이벤트 리스너에서의 콜백함수

이벤트 리스너에서도 마찬가지로 이벤트리스너 함수 파라미터로 함수를 받는다.
즉, 이벤트리스너의 순차 실행을 위해서 파라미터에 콜백함수가 들어가는 것이다.
예를 들면 1. 클릭을 하고 나서 2. 해당 함수를 실행해주세요. 가 된다는 뜻이다.

```javascript
const button = document.querySelector('.button');

button.addEventListener('click', function () {
  // 콜백함수
  console.log('이 버튼이 클릭되면 실행해주세요.');
});
```

버튼이 클릭되기도 전에 해당 함수가 실행되면 안되기 때문에 이벤트리스너라는 곳에서 콜백함수를 사용하는 것이다.

<br>

## 콜백지옥

```javascript
function timeSleep(callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}

timeSleep(() => {
  console.log('1');

  timeSleep(() => {
    console.log('2');

    timeSleep(() => {
      console.log('3');
    });
  });
});
```

timeSleep이라는 함수를 사용해 1초마다 1, 2, 3을 하나씩 찍도록 코드를 작성하였다.
위 코드는 그나마 짧은 코드라 1, 2, 3을 순차적으로 찍겠구나 하고 예상을 해볼 수도 있을 지 모르겠다만 그냥 보기에도 이게 뭐지 싶을 정도로 가독성이 안좋고 코드의 뎁스가 깊어졌다.

<br>

```javascript
timeSleep(() => {
  console.log('1');
  timeSleep(() => {
    timeSleep(() => {
      console.log('3');
    });
    console.log('2');
  });
});
```

심지어 이렇게 작성해도 동일한 결과가 나타난다. (가독성이 매우매우매우 나쁘다.)

이게 지금은 3개지만 점점 많아지면 계속 계단형태로 깊어지는 현상이 나타날 것이다.
이러한 현상을 `콜백지옥`이라 한다.

콜백함수를 잘 사용하면 비동기 처리를 할 수 있어 순차적인 실행이 필요할 때 유용하게 잘 사용할 수 있지만 콜백지옥을 경험할 수도 있다는 점을 유의해야겠다.
<br>

> 콜백지옥을 해결하는 방안으로는 promise나 async await을 사용하면 된다.
> 콜백지옥을 해결할 수 있는 다른 비동기 처리도 하나씩 공부해봐야겠다.

<br>

---

> 참고 자료

> [MDN Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

> [모던 자바스크립트 튜토리얼 - 콜백](https://ko.javascript.info/callbacks)

> [코딩애플 - 콜백함수가 뭔지 한국어로 쉽게 설명하는 영상](https://youtu.be/-iZlNnTGotk)

# 이터러블(iterable)

이터러블(iterable)은 `반복할 수 있는` 이라는 의미를 가지고 있습니다.
Symbol.iterator라는 메서드를 가지고 있어야 하며, 가장 대표적으로 `배열`과 `문자열`이 있습니다.
또, 이터러블한 것은 `for ... of` 와 같은 반복문을 사용할 수 있습니다.

```js
for (let i of '안녕') {
  console.log(i);
}
```

![](https://velog.velcdn.com/images/reasonz/post/491bcb06-723d-4049-8a03-3a7f46d5c1f9/image.png)

위와 같이 문자열을 for ... of를 사용해서 반복을 돌려도 정상적으로 실행됩니다. 만약 iterable 하지 않은 것에 for of를 사용한다면 에러가 발생합니다.

![](https://velog.velcdn.com/images/reasonz/post/09da9b07-0d34-46c5-b7b6-bd47679ec4d9/image.png)

for of 반복문은 symbol.iterator를 가장 먼저 호출하지만, symbol.iterator를 가지고 있지 않기 때문에 obj는 iterable하지 않다며 타입 에러가 발생했습니다.

---

> 아래는 `[모던 자바스크립트 튜토리얼]` 홈페이지에 있는 소스 코드입니다.

```js
let range = {
  from: 1,
  to: 5,
};
```

객체를 iterable하게 동작시킬 수 있는 방법이 있는데,
Symbol.iterator라는 메서드를 추가하면 for of문을 사용할 수 있게 됩니다.

```js
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

살펴보면 1부터 5까지 반복하여 alert창에 해당 숫자를 보여주는 코드입니다.
여기서 range 오브젝트 안에 Symbol.iterator 메서드를 추가하여 이터레이터로 만든 것을 확인할 수 있습니다.

> 자바스크립트에서 `이터러블`은 메서드 Symbol.iterator가 구현된 객체를 의미합니다.

간혹 이터러블하면서 유사 배열인 객체가 있을 수 있지만, 유사배열과 이터러블은 특징이 다르기 때문에 무조건 유사 배열이라해서 이터러블 한 것도, 이터러블이라고 해서 유사배열인것이 아니라는 것을 기억하자!

> 유사 배열은 인덱스와 length 프로퍼티가 있어서 배열처럼 보이는 객체를 의미합니다. (배열 내장 메서드 pop과 같은 것은 사용할 수 없음)

## 이터러블이나 유사 배열을 Array로 만드는 방법

`Array.from(이터러블 또는 유사배열);` 메서드를 사용하면 배열로 만들수 있습니다.

![](https://velog.velcdn.com/images/reasonz/post/3d26d7f5-973e-41df-9a6e-d965885c715a/image.png)

"안녕하세요?" 라는 문자열을 Array.from 메서드를 사용했더니 ` ['안', '녕', '하', '세', '요', '?']` 배열이 만들어졌습니다.

> 직접 실습해본 것

객체를 배열로 만들어보았습니다.

```js
const test = {
  0: '안녕',
  1: '하세요',
  length: 8,
};
```

먼저 객체 안에 배열의 인덱스가 키값으로 지정되어야 하고 length 값도 있어야 합니다.
위 코드의 경우 8개의 길이를 가진 배열이 만들어지며 0번 인덱스에는 "안녕", 1번 인덱스에는 "하세요"가 담기고 나머지 2번 인덱스부터 7번 인덱스까지는 undefined로 채워집니다.

```js
const result = Array.from(test);
```

![](https://velog.velcdn.com/images/reasonz/post/ca2c8a9b-3db1-4cf9-af82-9f5c75914036/image.png)

여기서 test 오브젝트 안에 length가 없는 경우 빈 배열이 생성됩니다.
또, 인덱스가 될 key가 숫자로 인식되지 않는 문자열같은 거로 되어있으면 해당 인덱스는 undefined 가 담깁니다.
예를 들면 다음과 같습니다.

```js
const test = {
  '0ㅋㅋ': '안녕',
  1: '하세요',
  length: 8,
};
```

```js
// 출력 결과
[undefined, '하세요', undefined, undefined, undefined, undefined, undefined, undefined];
```

"0ㅋㅋ" 와 같이 숫자로 인식할 수 없는 키값인 경우 해당 인덱스는 undefined로 채워졌습니다.
단, 숫자로 인식할 수 있는 문자열 "0"과 같은 경우엔 정상적으로 인덱싱됩니다.

> iterable에 대해서 긴가민가했던 개념을 잡을 수 있었지만 굳이 Symbol.iterator 메서드까지 만들어서 for of 반복문을 사용해야하나? 에 대한 부분은 아직 이해하지 못하겠다. ㅎㅎ 우선은 그냥 이런게 있구나 정도만 알고 넘어가기로 했다.

---

> 참고 자료

[모던 자바스크립트 튜토리얼 iterable 객체](https://ko.javascript.info/iterable#ref-3324)

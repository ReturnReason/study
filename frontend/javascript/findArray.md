> 어제는 [String에서 특정 문자를 찾는 방법 8가지]를 공부했었다.
> 오늘은 배열에서 문자열을 찾는 방법을 정리해보기로 했다.

<br>

# 배열에서 특정 문자 찾는 방법

1. indexOf()
2. lastIndexOf()
3. includes()
4. find()
5. filter()
6. some()

<br>

## 1. indexOf()

배열 요소의 위치를 찾고자 하는 경우에 사용하는 메서드이다.
있으면 해당 요소의 배열 인덱스를 반환하고 없으면 `-1`을 반환한다.
대소문자와 공백을 구분한다.

```javascript
const arr = ['red', 'blue', 'green'];
console.log(arr.indexOf('blue')); // 1
```

조건문을 사용할 때 indexOf()를 사용한다면 해당 인덱스를 리턴한다는 점을 기억해서 사용하는 것이 좋다. indexOf()가 요소를 찾지 못하면 -1을 리턴하기 때문도 있고 0번째 요소인 경우는 0을 리턴하기 때문에 false로 판단할 수 있는 등 원하지 않는 결과가 나올 수 있기 때문이다.

### Array.indexOf()에 2번째 인자로 시작할 인덱스 번호를 넣을 수 있다.

첫 번째 인자는 배열에서 찾을 요소를 넣었다면, 두번째 인자는 선택사항으로 해당 배열에서 시작하고자 하는 위치를 넣어 검색할 수 있다.

```javascript
const arr = ['red', 'blue', 'green', 'pink'];
console.log(arr.indexOf('blue', 2)); // -1
```

기본값은 0이며 배열의 크기보다 인덱스를 크게 잡는 경우 -1이 리턴된다.

<br>

## 2. lastIndexOf()

배열에서 주어진 값 중 동일한 결과가 있다면 가장 마지막에 있는 결과값을 반환하는 메서드이다.
요소가 존재하지 않으면 `-1`을 반환하는 등 indexOf()와 특징은 동일하다.

```javascript
const arr = ['red', 'blue', 'green', 'blue'];
console.log(arr.indexOf('blue')); // 1
console.log(arr.lastIndexOf('blue')); // 3
```

indexOf()를 사용했을 때는 가장 앞에 있는 1번째 위치의 blue 인덱스를 반환했고
lastIndexOf()를 사용했을 때는 가장 끝에 있는 blue의 인덱스 3을 반환함을 확인할 수 있었다.

### Array.lastIndexOf()에 두번째 인자로 역순으로 검색을 시작할 인덱스를 넣을 수 있다.

기본값은 `array.length-1`이다.
음수를 넣더라도 검색 순서는 뒤에서 앞으로 시작된다.
두번째 인자 값이 음수라면 배열의 마지막부터 시작하는 인덱스로 처리된다.

<br>

## 3. includes()

특정 요소를 포함하고 있는지 판별하는 메서드이다.
`true` 또는 `false`를 반환한다. 문자나 문자열 비교시 대소문자를 구분한다.
엄격한 비교 `===`를 사용하므로 비교 연산자가 사용된다면 사용에 주의가 필요하다.
객체와 객체를 비교하는 경우 같은 객체를 가르키는지에 대한 여부를 반환하기 때문이다.
(객체가 가진 값이 같은가를 비교하지 않고 객체의 참조값이 같은가를 비교한다.)
객체와 객체를 비교하는 경우엔 include()가 아닌 다른 메서드를 사용하는 것이 좋다.

```javascript
const arr = [
  ['빨강', 'red'],
  ['파랑', 'blue'],
];

arr.forEach((elem) => {
  if (elem.includes('red')) {
    console.log(elem); // (2) ["빨강", "red"]
    console.log(elem.includes('red')); // true
  }
});
```

### includes()의 두번째 인자로 검색을 시작할 인덱스를 넣을 수 있다.

```javascript
console.log(['하나', '둘', '셋'].includes('하나', 1)); //false
```

배열의 길이보다 크거나 같으면 `false`가 반환된다.

<br>

## 4. find()

첫번째 인자로 콜백함수를 넣어 함수를 `만족하는 첫번째 값을 반환`하는 메서드이다.
만족하지 않으면 `undefined`를 반환한다.

```javascript
const arr = [
  {
    name: '아이유',
    age: 30,
  },
  {
    name: '은하',
    age: 26,
  },
];

const result = arr.find((elem) => {
  return elem.name === '아이유';
});

console.log(result); // {name: "아이유", age: 30}
```

find()의 첫번째 인자 콜백함수는 최대 3개의 인자를 가질 수 있다.

```
arr.find((elem, idx, arr) => {
  console.log(elem, idx, arr); //처리할 요소/인덱스/find를 호출한 배열
})
```

### find()의 두번째 인자는 this로 사용할 객체가 들어간다.

콜백이 호출될 때 this로 사용할 객체를 선택사항(옵션)으로 넣어줄 수 있다.

> 인덱스를 반환해주는 [findIndex()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)라는 메서드도 존재한다.

<br>

## 5. filter()

find()는 조건에 해당하는 첫번째 값 하나만 리턴하는 반면
`filter()`는 조건에 해당하는 모든 값을 배열로 리턴하는 메서드이다.
파라미터와 사용방법은 find()함수와 동일하다.

```javascript
const music = [
  {
    artist: '아이유',
    song: '좋은날',
  },
  {
    artist: '아이유',
    song: '블루밍',
  },
  {
    artist: 'VIVIZ',
    song: 'BOP BOP!',
  },
];

const result = music.filter((elem) => {
  return elem.artist === '아이유';
});

console.log(result);
```

![](https://velog.velcdn.com/images/reasonz/post/9b0eb6a3-7336-471d-aa64-d6469b428b75/image.png)
찾고자 하는 요소에 해당하는 모든 것을 배열로 반환해주었다.

<br>

## 6. some()

빈 배열에서 호출하면 `false`가 반환된다.
배열 안의 모든 요소중 최소 1개 이상이 주어진 콜백함수를 통과하면 `true`를 반환한다.
첫번째 인자로는 콜백함수를 받는다. 콜백함수는 최대 3개의 인자를 사용할 수 있다.
`some(콜백함수(처리할 요소, 인덱스, 호출한 배열), thisArg{})`
두번째 인자는 선택사항으로 콜백함수 실행시 this로 사용될 값을 넣어줄 수 있다.

```javascript
const arr = ['아이유', '이지은', '이지금'];

console.log(
  arr.some((elem) => {
    return elem === '이지금';
  })
); // true
```

---

> 반복문을 사용해서 순회해도 문자열을 찾을 수 있다.

---

> 참고 자료

> [MDN lastIndexOf()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

> [MDN find()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

> [MDN includes()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

> [MDN find()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

> [MDN some()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

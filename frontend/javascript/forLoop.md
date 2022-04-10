# 자바스크립트 반복문 💫

반복문은 `반복적으로 실행`해야하는 코드가 있을 때 사용한다.
처음에 for in문과 for of문을 접했을 때는 생긴게 비슷해서 누가 어떤때 쓰는 거였지..하고 헷갈렸었다. 지금은 헷갈리진 않지만 한번 정리하고 가면 좋을 것 같아서 다른 반복문들과 정리해보았다.

### 반복문의 종류

1. for
2. for...in
3. for...of
4. forEach() - (Array 메소드)
5. while
6. do...while

## for

가장 일반적인 for문의 형태는 다음과 같다.
`console.log(i)`를 총 10번 반복하는 반복문이다.

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

for문 안의 구성이 각각 의미하는 바를 살펴보면,
`let i=0` : 변수 let i를 선언하고 0으로 할당 (반복문 초기값 설정)
`i<10` : for문을 얼마나 돌릴 것인지 조건을 적는 부분(조건이 참이면 실행)
`i++` : 루프가 한번 돌때마다 변수 증감식
여기에서는 i가 0부터 시작해서 10보다 작을 때까지 이므로 0~9. 총 10번 반복할 것이다.
i의 값은 루프가 한 번 돌때마다 1씩 증가하여 console.log는 1, 2, 3, .... 9를 순서대로 출력하고 for문은 종료된다.

## for...in

for in문은 `object` 에 사용할 수 있는 반복분이다.
배열에도 사용할 수 있지만 배열 반복에는 추천되지 않는다.

```javascript
const obj = {
  name: '이름',
  age: '나이',
};

for (const key in obj) {
  console.log(key); // key값 출력
  console.log(obj.name, obj.age); // value 값 출력

  console.log(`key 값 : ${key}`); // 1. key값 : 이름 // 2. key값 :age
  console.log(`value 값 : ${obj[key]}`); // 1. value 값 : 이름 // 2. value값 : 나이
}
```

기본 for문과 생김새는 비슷하다. 대신 `in` 키워드를 사용한다.
`obj.name`과 같이 사용하려면 object내에 name이라는 key값을 가진 value가 존재해야한다.
없는 key값을 사용하게 되면 `undefined`가 출력된다.
객체의 모든 `value`값을 얻으려면 `obj[key]`로 객체를 순회하여 얻을 수 있다.

## for...of

for of문은 반복 가능한 객체(Array, Map, Set, String, TypedArray, arguments 객체 등 포함)에 대해 사용할 수 있다. 보통은 Array(배열)에 사용한다고 흔히 알려져 있다.

```javascript
const array = ['1번', '2번', '3번'];

for (const element of array) {
  console.log(element); // 배열[0] ~ 끝까지 순차적 출력
  console.log(array); // 배열 전체 출력
}
```

배열에 들어있는 0번째~마지막 번째 요소까지 순차적으로 출력된다.
배열안에 있는 요소를 꺼내쓸 때 사용하면 좋다.

## forEach()

배열에 사용되는 메서드이다. 인자에 콜백함수를 넣어 사용한다.

```javascript
const array = ['1번', '2번', '3번'];

array.forEach((element) => {
  console.log(element);
});
```

## while

조건이 참이면 실행되는 반복문이다. 이전에 살펴본 for문처럼 반복 실행을 해준다.

```javascript
while (condition) {
  // condition이 참이면 실행
}
```

`while`의 `()`안의 조건이 true면 실행, false면 실행되지 않는다.
즉, `while(condition)`이 false이면 단 1회도 실행하지 않는다는 것이다.

## do...while

앞에서 살펴본 while과는 달리 `do{}`에 작성된 코드는 최소 1번 실행된다는 것이다.
최소 1번 실행 후, `while` 조건이 `false`인 경우 더이상 실행되지 않는다.

```javascript
do {
  // 거짓이더라도
  //do에 작성된 코드는 무조건 1회는 실행
} while (condition);
```

적어도 1번은 실행하고 싶은 코드가 있을 때 사용된다.

<br>

---

<br>

아직까지는 자바스크립트를 배우면서 while, do while을 사용해 본적은 없다.
기본 for문이 성능이 가장 좋은 것으로 알려져 있는데 용도에 알맞게 사용하는 게 좋을것 같다.
조금 더 자바스크립트에 대한 연륜(?)이 생기면 성능 최적화하는 부분도 공부해봐야겠다.

<br>

---

> 참고 자료

> [MDN for...in
> ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...in)

> [MDN for...of](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)

> [MDN forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

> [MDN while](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/while)

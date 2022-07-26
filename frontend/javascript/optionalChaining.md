# 옵셔널 체이닝

Optional chaining 연산자 `?.`
옵셔널 체이닝은 참조, 기능이 undefined나 null일 가능성이 있을 때 사용하면 된다.

> `.` 체이닝 연산자와 동작은 유사하지만
> `?.`는 참조가 null이나 undefined이면
> 에러발생 대신 리턴 값을 `undefined`로 만든다.

`?.` 는 존재하지 않아도 괜찮은 대상에만 사용해야 한다.
반드시 필요한 값이라면 `?.` 를 사용하지 않는 것이 좋다.
`?.` 앞의 변수는 반드시 선언되어 있어야 한다.

```js
const person = {};
```

현재 person이라는 객체는 비어있지만 person의 hobby.title 값을 출력하는 코드를 작성해보았다.

일반적인 체이닝 연산자를 사용하면 다음과 같은 에러가 발생한다.

```js
console.log(person.hobby.title);
```

```js
// 실행 결과
TypeError: Cannot read properties of undefined (reading 'title')
```

체이닝 연산자를 사용하니 `타입 에러가 발생`했다.

하지만, 다음과 같이 옵셔널 체이닝 `.?` 을 사용하면 에러가 발생하지 않는다.

```js
console.log(person.hobby?.title);
```

```js
// 실행 결과
undefined;
```

person이라는 객체가 hobby.title 을 가지고 있는 title이 출력되었겠지만 hobby.title이 정의되지 않았기 때문에 일반 체이닝 연산자에서는 에러가 발생했다.

옵셔널 체이닝의 경우 hobby가 undefined였기 때문에 평가를 멈추고 undefined를 반환하여 에러가 발생하지 않는다.

---

> 참고 자료

> [MDN Optional chaining](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

> [모던 자바스크립트 튜토리얼 옵셔널 체이닝](https://ko.javascript.info/optional-chaining)

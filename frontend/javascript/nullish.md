> 추가된지 얼마 안된 `??` 연산자이다.

# Nullish coalescing operator(널 병합 연산자)

`??` 연산자는 `null` 이나 `undefined` 가 아닌 값이 있는 변수를 찾을 때 사용할 수 있다.

### 널 병합 연산자 사용해보기

```js
const hi = '안녕하세요' ?? '안녕';
console.log(hi);
```

```js
/* 실행 결과 */
안녕하세요;
```

첫번째로 hi에 `'안녕하세요'` ?? `'안녕'` 을 작성해보았다.
실행 결과로는 `안녕하세요`가 출력되었다.

```js
const hi = null ?? '안녕';
console.log(hi);
```

```js
/* 실행 결과 */
안녕;
```

두번째는 첫번째 값을 `null`로 작성해보았다.
이번에는 `안녕`이 출력되었다.

`??` 앞에 있는 값이 null이나 undefined 인 경우에는 `??` 의 뒤에 있는 값이 반환된다.

## || 와 ?? 차이점

널 병합 연산자(`??`)의 경우 null, undefined 일 때 `??` 연산자 뒤의 값이 반환된다.

논리 연산자 (`||`)는 falsy 값인 경우 오른쪽 피연산자가 반환된다.

```js
const hi = 0 ?? '안녕';
console.log(hi);

const hi2 = 0 || '하잉!';
console.log(hi2);
```

```js
/* 출력 결과 */
0
하잉!
```

널 병합 연산자는 undefined, null 일 때만 오른쪽 피연산자를 반환하기 때문에 `안녕` 이 아닌 `0` 이 출력되었다.

or 논리 연산자는 undefined, null을 포함하여 왼쪽 피연산자가 falsy값인 경우 오른쪽 피연산자를 반환한다.
그렇기 때문에 왼쪽 피연산자에 undefined, null을 제외한 falsy 값을 다룬다면 `||` 와 `??`는 출력결과에서 차이가 있다.

---

> 참고 자료
> [MDN Nullish coalescing operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

> [모던 자바스크립트](https://ko.javascript.info/nullish-coalescing-operator)

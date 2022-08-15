> Array 생성자로 배열 생성 후 배열 내장 메소드를 체이닝해서 사용하는 것을 보고 코드를 이해하기 위해 정리해보았다.

```js
const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1);
```

참고할 코드는 제로초님 자바스크립트 영상 중 [공뽑기 영상](https://www.youtube.com/watch?v=pj02ViXlm44&list=PLcqDmjxt30RvEEN6eUCcSrrH-hKjCT4wt&index=57)에 있는 코드이다.

빈 배열을 만들고 arr.push()해서 반복문을 돌려도 동일한 결과를 얻을 수 있긴 하다.

```js
for (let i = 0; i < 45; i++) {
  arr.push(i + 1);
}
```

하지만 저 코드를 이해하고 싶으므로 조금 구글링을 해보고 정리해보았다.

---

## Array() 생성자

```js
Array(); // []
```

```js
new Array(); // []
```

배열을 생성할 때 사용할 수 있다.
반환 값으로 `()` 안에 넣은 값을 담은 배열이 반환된다. 아무것도 넣지 않으면 빈 배열이 반환된다.

## fill()

배열 내장 메소드이다.

```js
arr.fill(value, start, end);
```

첫번째 인자인 value만 필수 값이고, 나머지 두번째, 세번째 인자 start(시작 인덱스)와 end(끝 인덱스)는 옵션이다.

반환 값으로는 fill 인자로 받은 값으로 변형한 배열을 반환환다.

```js
Array(1, 2, 3).fill();
```

fill에 아무런 인자도 넣지 않으면 `undefined` 로 채워진다.

```js
/* 출력 결과 */
[undefined, undefined, undefined];
```

## map()

```js
arr.map(callback(currentValue, index, array));
```

매개변수로 `콜백함수`를 받는데 콜백함수는 세가지 인자를 가질 수 있다. currentValue, index, array 로 구성되어 있으며, index와 array는 선택사항이다.
리턴 값으로는 배열 각 요소에 대해 실행할 결과값을 모아 새로운 배열을 만들어 반환한다.

```js
[1, 2, 3].map((v, i) => v + i);
// 실행 결과 :  [1, 3, 5]
```

위 코드에서 v는 배열의 각각 요소인 1, 2, 3을 가르키게 된다. i는 index를 나타내며 0, 1, 2가 될 것이다.
즉, map 메소드는 배열 인자인 1, 2, 3 각각에 대해서 v + i 한 값을 새로운 배열의 요소로 담은 뒤 해당 배열을 반환한다.

## map(Number)

```js
['1', '2', '3'].map((v) => parseInt(v));
```

```js
['1', '2', '3'].map((v) => Number(v));
```

parseInt나 Number를 사용해서 문자열을 숫자로 변경할 때 유용하게 사용할 수 있는 방법이 있다.
위 코드를 사용하더라도 문제없이 숫자 값으로 변환되지만

```js
['1', '2', '3'].map(Number);
```

이렇게 작성해줘도 숫자로 변환된 배열이 반환된다.

---

대충 개념을 익혔으니 처음에 이해하고자 했던 코드를 다시 확인해보고자 한다.

> 1부터 45번의 숫자를 넣은 새로운 배열을 만들기

```js
const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1);
```

Array의 길이가 45인 배열을 만든뒤 전체 요소를 `undefined`로 초기화한다.

fill 메소드는 꼭 빈값을 넣지 않아도 상관은 없다. 어차피 map 메소드에서 덮어씌워질 부분이기 때문이다.

map 메소드의 인수의 v는 배열의 각 요소를 의미하고, i는 해당되는 요소의 배열 인덱스를 의미한다.

즉, 요소의 0번째 인덱스부터 44번째 인덱스까지 map 메소드가 반복하며 인덱스 + 1의 값을 리턴할 것이다. 이 리턴된 값을 새로운 배열에 담아서 반환한다.

```js
/* candidate 변수 값 */
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
```

candidate 변수에 1부터 45개의 요소 배열을 생성하는 간단한 코드! 임에도 Array().fill()을 체이닝해서 사용하는 것이 생소해서 어렵게 느껴졌던 것 같다.

막상 정리해보니 별거 아니였구나! 하는 생각도 들고 이런 식으로도 코드를 짤 수 있구나 라는 걸 알 수 있었다. ㅎㅎ

---

> 참고 자료
> [MDN Array() 생성자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)

> [MDN fill()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

> [MDN map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

# JavaScript Array Method

오늘은 자바스크립트에서 자주 사용되는 메소드 중
`sort(), map(), filter()`에 대해 사용해보면서 정리해보고자 한다.

- 위 세가지 메소드 중 `map`과 `filter`는 기본 배열을 변형시키지 않는다.
  새로 정의한 배열을 리턴 값으로 반환한다.

- `sort`는 기본 배열을 변형시키므로 사용하기 전 주의가 필요하다.
  기본 배열을 미리 복제 해놓거나 하는 등의 상황에 따라 판단하면 될 것 같다.

---

<br>

## Array.prototype.map()

map() 메소드는 배열의 모든 요소에 특정 작업을 시행하고
그 결과값을 반환해 주는 메소드이다.

```javascript
const mapArray = [1, 3, 5, 7, 9];

const mapArray2 = mapArray.map((element) => {
  return element ** 2;
});

console.log(mapArray); // [1, 3, 5, 7, 9]
console.log(mapArray2); // [1, 9, 25, 49, 81]
```

위 코드에서는 `map()` 메소드를 사용하여 기존 배열의 각 요소마다 거듭제곱을 해주었고
거듭제곱된 값이 새로운 배열로 반환되는 것을 확인할 수 있었다.

## Array.prototype.filter()

filter() 메소드는 배열의 요소가 주어진 조건에 만족하면 그 요소들을 새로운 배열로 만들어 반환하는 메소드이다.

```javascript
const price = [10000, 50000, 70000, 90000];

const result = price.filter((price) => {
  return price > 50000;
});
console.log(result); // [70000, 90000]
```

위 코드는 5만원 이상의 가격만 새로운 배열로 정의하여 반환하는 코드이다.
특정 가격 이상/이하거나, 어떠한 것을 필터링해야 할 때 사용하면 좋을 것 같다.

## Array.prototype.sort()

`sort`는 기본 배열을 변형시키므로 사용할 때 주의하여야 한다.
기본 사용법은 다음과 같다.

```javascript
const level = [10, 60, 100, 15, 300, 200];
level.sort();
console.log(level);
```

그냥 `sort()`만 사용한다면 문자열 정렬이 되기 때문에 결과값이 `[10, 100, 15, 200, 300, 60]` 되었다. 만약, 숫자를 정렬하고 싶다면 다음과 같이 작성해야 한다.

```javascript
const level = [10, 60, 100, 15, 300, 200];
level.sort((a, b) => a - b);
console.log(level); // [10, 15, 60, 100, 200, 300]
```

sort를 재정의해서 사용해야 하는데 이것을 `compareFunction`이라 한다.
`https://developer.mozilla.org/ko/`이 주어지지 않았을 때는 `String`값을 기준(유니코드 순서로 비교)으로 정렬이 된다.
위 코드에서는 `compareFunction`의 인자로 a와 b를 넣고 a - b의 값을 return하도록 했다.
a와 b를 비교하고 a가 양수이면 b의 뒤로, a가 음수이면 b를 a 앞으로 보내는 방식으로 정렬된다.
즉, 오름차순 정렬이 진행된다. 내림차순 정렬은 이와 반대로 `b - a`를 return하면 된다.

<br>
<br>

> Note : 정리하면서 filter와 map 사용에 대해서는 어느 상황에 어떤 메소드를 써야하는지 조금 헷갈렸던 부분을 해소하였다. sort 메소드의 compareFunction 사용에 대해서는 문자열 역순 정렬 같은 부분은 조금 더 공부해봐야겠다. 사용해보고 추후에는 직접 위와 같은 함수를 만들어보는 시간도 가져보려한다.

<br>

---

<br>

> 참고 자료

[MDN](https://developer.mozilla.org/ko/)

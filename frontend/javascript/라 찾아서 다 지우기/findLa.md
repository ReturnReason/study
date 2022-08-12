> 제로초님 자바스크립트 강의에 나온 퀴즈 풀어보기

### 문제 1. 다음 배열에서 '라'를 모두 제거하세요. (indexOf와 splice 사용)

```js
const arr = ['가', '라', '다', '라', '마', '라'];
```

#### 1번 문제 풀이

1. 먼저 '라'의 위치를 확인하기 위해 `indexOf`를 사용하였습니다.

```js
arr.indexOf('라'); // index 앞에서부터 '라'의 위치 찾기 1번째 인덱스 반환
```

2. 가장 맨 앞에 있는 '라'의 위치인 1이 반환된 것을 확인하였으므로 splice 메소드를 사용해서 1번째 위치에 있는 '라'를 삭제해 주었습니다.

```js
arr.splice(1, 1); // '라' 가 반환됨
// 현재 arr ['가', '다', '라', '마', '라']
```

splice는 `기존 배열을 수정`한다는 점과 `splice한 값을 반환`한다는 특징이 있습니다.
기존 배열이 수정되는 것을 원하지 않으면 기존 배열은 그대로 두고 사본을 만들어서 사용해야 합니다.

```js
// 현재 배열
['가', '다', '라', '마', '라'];
```

마찬가지로 1 ~ 2번에 했었던 것과 동일하게 '라'의 인덱스 확인 후 splice를 사용하여 지워줍니다.

![](https://velog.velcdn.com/images/reasonz/post/5c6e3f33-fc49-4368-a850-2e895c94e437/image.png)

arr 배열에 있는 모든 '라'를 제거하였습니다.
마지막으로 정말 다 지웠는지 확인하기 위해 한번 더 `indexOf`를 사용해보았습니다.

![](https://velog.velcdn.com/images/reasonz/post/bd7473de-027b-4066-b8d9-f5060763af0b/image.png)

indexOf 메소드는 배열에 해당 요소가 존재하지 않으면 `-1`을 반환하기 때문에 배열에 '라'가 모두 지워졌음을 확인할 수 있었습니다.

> indexOf 대신 lastIndexOf를 사용해도 되지만 문제에서 indexOf를 사용하라 했으므로 위와 같이 풀어보았다.

## 반복되는 것이 있다면 반복문

앞서 풀어본 퀴즈는 같은 작업을 여러번 반복하여 코드를 작성해주었습니다.
만약 '라' 가 1억개가 있었다면 indexOf로 찾고, splice로 제거해주는 행동만 1억번을 해야 하기 때문에 데이터가 많을수록 매우 비효율적인 풀이였다는 것을 알 수 있습니다.

위에서 풀어본 문제를 반복문을 사용해보도록 하겠습니다.

```js
while (1) {
  const findRa = arr.indexOf('라');
  if (findRa !== -1) {
    arr.splice(findRa, 1);
  } else {
    break;
  }
}
```

저는 while 반복문을 사용해서 풀어보았습니다.
먼저 while의 조건에 1(true)를 넣어서 무한 반복문을 만들어 준 후, `arr.indexOf('라')` 를 findRa 변수에 담아주었습니다.

이렇게 되면 '라'가 배열에 있는 경우 -1이 아닌 0 이상의 인덱스가 findRa 변수에 저장될 것입니다.

이후 조건문을 사용하여 findRa가 `-1(배열에 없는 경우 반환되는 값)` 가 아니라면 splice를 사용해 해당 위치에서 1개의 요소를 제거합니다. 현재 findRa 변수가 '라'의 위치 인덱스를 가지고 있으므로 이렇게 하면 원본 배열에서 '라' 가 제거됩니다.

만약 배열에 '라' 가 존재하지 않는 경우 반복문을 중단해야 하므로 else문에서 `break;` 넣어 반복문을 종료시켜주었습니다.

![](https://velog.velcdn.com/images/reasonz/post/ce24f7fe-373d-41a6-a3e8-6f9f5f0a6de7/image.png)

arr 배열의 요소를 확인해보면 '라' 가 모두 제거되었음을 확인할 수 있습니다.

> 문제를 풀어보고 제로초님 강의를 다시 재생시켰는데 while의 조건에 arr.indexOf('라') > -1 과 같은 것을 넣어도 되겠구나! 라는 것을 알 수 있었다.

```js
/* 제로초님의 문제 풀이 코드 */
while (arr.indexOf('라') > -1) {
  arr.splice(arr.indexOf('라'), 1);
}
```

```js
/* 제로초님의 문제 풀이 코드 */
let index = arr.indexOf('라');
while (index > -1) {
  arr.splice(index, 1);
  index = arr.indexOf('라');
}
```

- 반복문을 만들기 어렵다면 절차를 먼저 써보고 반복되는 것을 반복문으로 만들어보자.

---

> 참고 자료

> [자바스크립트 강좌 2-23. 배열 메서드 응용하기](https://www.youtube.com/watch?v=EHEzT5kUxpg&list=PLcqDmjxt30RvEEN6eUCcSrrH-hKjCT4wt&index=27)

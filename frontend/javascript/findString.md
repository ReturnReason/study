> 사용자가 인풋 값에 입력한 문자를 포함하고 있는지 확인하는 기능을 만드려고 하니
> 정리해두지 않으면 까먹고 또 같은 것은 찾고 있을 것 같아서 기록하면서 기억해보려 한다.
> 또, 문득 문자 찾기 방법에는 어떤 것들이 있고 무슨 값을 반환하는지 공부하고자 한다.
> 이번 정리는 문자열에서 찾는 방법만 정리해보았다. 내일은 배열에서 찾는 방법을 정리해야겠다.

<br>

# 문자열에서 문자 찾는 방법

1. indexOf()
2. lastIndexOf()
3. startsWith()
4. endsWith()
5. search()
6. match()
7. 정규식
8. includes()

<br>

## 1. indexOf()

먼저 `indexOf()`를 사용하여 원하는 문자를 찾기로 했다.
배열안에 객체를 선언한 뒤 title에 `findWord`라는 변수에 입력한 글자가 문자열에 존재하는지 확인해보는 것이다.
`indexOf()`는 찾고자 하는 결과값이 있으면 **첫번째 인덱스(최초 인덱스)를 반환**한다!

> 공부 노트 : 아래 코드가 얼핏 보면 배열에서 찾는 것 같아서 문자열에서 indexOf 사용한 것과 배열에서 사용한 것의 결과물이 달라서 헷갈렸었다..!
> 하지만 아래 코드는 배열 자체에서 찾는 것이 아니라, 배열 안의 `item.title`을 찾는 것이므로 String을 검색하는 것이었다. (typeof가 있어서 참 다행이야^ㅇ^ 고마워요 typeof)

<br>

```javascript
const product = [
  {
    title: '갤럭시',
    brand: '삼성',
  },
  {
    title: '아이폰',
    brand: '애플',
  },
];

let findWord = '갤럭시';

product.forEach((item) => {
  if (item.title.indexOf(findWord) !== -1) {
    console.log(item, item.title);
    console.log('찾는 문자가 있습니다 💗 반환값 : ', item.title.indexOf('갤럭시'));
  }
});

/* 
	forEach를 사용하지 않았다면
    console.log(product[0].title.indexOf(findWord));
    와 같이 사용하면 된다.
*/
```

![](https://velog.velcdn.com/images/reasonz/post/95a4e1a6-99d3-4bf0-8c44-09bbf235cc5b/image.png)

중요한 점은 `indexOf()`는 찾는 값이 없으면 `-1`을 반환한다는 점을 기억해야 한다.
위 예시에서 if문 조건에 `item.title.indexOf(findWord)` 라고만 넣었다면 엉뚱한 결과물이 console에 찍혔을 것이다. (0이 false, -1은 true로 처리되기 때문이다.)
해당 문자를 포함하지 않는 결과값이 필요한 거라면 사용할 수도 있을지도(..!?)

<br>

### 중간에 있는 글자는 결과값이 어떨까?

```javascript
const product = [
  {
    title: '갤럭시Z플립',
    brand: '삼성',
  },
  {
    title: '아이폰SE',
    brand: '애플',
  },
  {
    title: '갤럭시노트',
    brand: '삼성',
  },
  {
    title: "글자 중간에 '갤럭시' 있다면?",
    brand: '삼성',
  },
];

let findWord = '갤럭시';

product.forEach((item) => {
  if (item.title.indexOf(findWord) !== -1) {
    console.log(item, item.title);
    console.log('찾는 문자가 있습니다 💗 반환값 : ', item.title.indexOf('갤럭시'));
  }
});
```

product.title의 값에 블라블라~갤럭시~~어쩌구 하는 값을 추가했다.

![](https://velog.velcdn.com/images/reasonz/post/a0b0307e-cb81-465e-9721-67d56a9920cc/image.png)

갤럭시가 시작하는 인덱스인 9를 반환하는 것을 확인할 수 있었다.
하지만 다음과 같이 띄어쓰기가 된 `갤럭 시`의 값은 찾지 못했다.

<br>

```javascript
const product = [
  {
    title: '갤럭 시 같지만 아님',
    brand: '몰루',
  },
];
```

하지만, 공백을 제거하는 trim()을 같이 사용한다면 `갤럭 시`같은 값도 찾을 수 있다.

```javascript
item.title.trim().indexOf('갤럭시');
```

<br>

### indexOf에 두번째 인자값을 넣으면? (Option)

`indexOf()`는 첫번째 인자로 배열에서 찾을 요소를 넣고 두번째 인자로는 배열의 몇번째부터 검색할지 정할 수 있다. 두번째 인자를 생략하면 기본값이 0이라 0번째부터 검색되는 것이고 넣은 두번째 인자가 배열의 길이보다 크거나 같으면 -1이 반환된다는 특징이 있다.

```javascript
const str = '갤럭시';
console.log(str.indexOf('갤', 1)); // -1
console.log(str.indexOf('시', 1)); // 2
```

첫번째 찾고자 하는 "갤" 문자는 문자열의 0번에 있기 때문에 `-1`을 반환했다.
두번째 찾고자 하는 "시"는 옵션으로 넣은 값이 문자열의 1번째부터 찾기 시작하는데 문자열의 2번째 자리에 있어서 2를 반환하는 것을 확인할 수 있다.
`음의 정수값`을 2번째 인자(옵션)으로 `넣으면 전체문자열을` 대상으로 찾는다.
예를 들어, 2번째 인자로 -1을 넣어도 전체문자열에서 찾아서 해당 문자열의 위치를 정상적으로 반환한다.

<br>

### 대소문자를 넣어보면 어떨까?

```javascript
const str = 'REAson';
console.log(str.indexOf('REASON')); // -1
console.log(str.indexOf('reason')); // -1
```

앞에서 확인해본 코드들은 한글을 찾았기 때문에 문제가 없었지만, 영어로 된 문자를 찾으려니 문제가 발생했다.
`문자열.indexOf()`가 대소문자를 구분한다는 것이다.

```javascript
const str = 'REAson';
console.log(str.toUpperCase().indexOf('REASON')); // 0
console.log(str.toLowerCase().indexOf('reason')); // 0
```

대문자로 변경하는 `toUpperCase()`나, 소문자로 변경하는 `toLowerCase()`를 함께 사용해야 원하는 결과값을 확인할 수 있었다.

> indexOf()를 사용할 때 영문은 대소문자를 구분한다는 점,
> 찾은 문자의 가장 첫번째 인덱스만 반환한다는 점이 특징이므로 기억해두자.

<br>

## 2. lastIndexOf()

indexOf()와 동일하지만 다른점이라 하면 문자의 가장 맨 끝에서부터 찾는다는 점이다. (그렇다고 결과값이 맨 뒤 문자열을
`lastIndexOf()`도 찾는 문자가 없는 경우 `-1`을 반환하며, 대소문자를 구분한다.

```
const str = "Hi, there! my name is Reason!"
const searchStr = "Reason";
console.log('찾고자 하는 글자 위치 :' ,str.lastIndexOf(searchStr));

// 찾고자 하는 글자 위치 : 22
```

두번째 인자로도 탐색을 시작할 인덱스를 옵션으로 넣을 수 있는데 문자열의 길이보다 2번째로 넣은 인자의 값이 더 크면 모든 문자열을 탐색하고, 2번째로 넣은 인자가 음수, 0, 문자열 길이보다 짧으면 `-1`을 리턴한다.

```javascript
const str = 'Hi, there! my name is Reason!';
const searchStr = 'Reason';
console.log('찾고자 하는 글자 위치 :', str.lastIndexOf(searchStr, 0));
console.log('찾고자 하는 글자 위치 :', str.lastIndexOf(searchStr, -100));
console.log('찾고자 하는 글자 위치 :', str.lastIndexOf(searchStr, 100));
```

![](https://velog.velcdn.com/images/reasonz/post/591777af-2fce-4d10-9f5c-ff1fb7b35244/image.png)

lastIndexOf()는 어느 상황에 쓰일까 궁금했는데 파일의 확장자명 등을 검색할 때 사용된다고 한다.

<br>

## 3. startsWith()

어떤 문자열이 특정 문자로 시작하는지 확인해서 결과를 `true` 또는 `false`로 반환된되는 메소드이다. 띄어쓰기(공백), 대/소문자를 구분한다.

```javascript
const str = 'Hi, Reason';
const str2 = 'Reason, hi!';
console.log(str.startsWith('Reason')); //false
console.log(str2.startsWith('Reason')); //true
```

### startsWith()에 두번째 인자값을 넣으면?

첫번째 인자값으로는 탐색할 문자열을 넣었다. 두번째 인자값을 넣게되면 탐색할 위치를 정할 수 있다.
두번째 인자값을 넣지 않고 사용하면 `기본값은 0`이다.

```javascript
const str = 'Hi, Reason';
console.log(str.startsWith('Reason', 4)); //true
```

<br>

## 4. endsWith()

`startsWith()`는 특정 문자로 시작하는지(옵션을 넣으면 해당 인덱스부터) 확인하는 메서드였다면, `endsWith()`는 어떤 문자열에서 특정 문자열로 끝나는지 확인할 수 있는 메서드이다.
`true`또는 `false`로 반환된다.

```javascript
const str = '안녕하세요! 안녕 하세요';
console.log(str.endsWith('세요')); //true
console.log(str.endsWith('안')); //false
console.log(str.endsWith('안녕', 2)); // true
```

### endsWith()의 두번째 인자는 찾고자하는 문자열의 길이값이다.

기본값은 문자열 전체이고 문자열의 길이 값은 전체 길이 안에서로 한정된다.
`endsWith("안녕", 2)`, `endsWith("안녕하", 3)`와 같은 형태로 작성하면 된다.
마찬가지로 두번째 인자는 옵션이기 때문에 넣지 않아도 된다.

<br>

## 5. search()

정규표현식을 사용해서 같은 문자열인지 찾는 메서드이다.
`str.search(정규표현식)`과 같은 형태로 작성된다.
`(정규표현식)`에 넣은 매개변수는 [RegExp(정규표현식)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp)로 암묵적 변환이 된다.
찾지 못하면 `-1`을 반환하고 찾으면 해당 인덱스를 반환한다.

```javascript
const email = 'email : reasonz@daum.net';
console.log(email.search(/\S+@+\S+\.+\S/)); // 8
```

정규표현식 작성에 대한 내용은 자세히 알지 못하므로 아는 얕은 지식(?)으로 대충 만들어보았다.
나중에 정규표현식도 좀 더 살펴봐야겠다.

<br>

## 6. match()

문자열이 정규식과 매치하는 부분을 검색하여 일치하지 않으면 `null`을 반환하고 정규식과 일치하면 첫번째 요소로 포함하는 `Array`가 반환된다.
5번에서 살펴봤던 `search()`메서드처럼 `match()`의 매개변수로 정규표현식을 넣어주면 된다.
또, 정규식에 `g`플래그가 포함되어 있지 않으면 `RegExp.exec()`와 같은 결과가 반환된다고 한다.
포함되어 있는 경우에만 일치하는 하위 문자열을 포함한 `Array`가 반환된다는 특징이 있다.

```javascript
const email = 'email : reasonz@daum.net';
console.log(email.match(/\S+@+\S+\.+\S+/)); // (1) ["reasonz@daum.net"]
```

아까 살펴본 `search()`는 해당되는 인덱스의 값(없으면 -1)만 반환했는데 `match()`를 사용하니 정규식으로 찾은 내용을 배열로 반환해주는 것을 확인할 수 있었다.
`search()`를 사용할 때는 내가 작성한 정규식이 어디서부터 얼만큼 해당하는지 확인하는게 불가능했었는데 `match()`를 사용하니 정확히 내가 어떤 부분을 정규식으로 뽑아냈구나!를 알 수 있었다.

```javascript
const text = 'A, B, C, a, b';
const reg = /[A-Z]/i;
const reg2 = /[A-Z]/gi;
console.log(text.match(reg)); //(1) ["A"]
console.log(text.match(reg2)); //(5) ["A", "B", "C", "a", "b"]
```

`g`플래그가 포함된 것과 포함되지 않은 것의 차이가 궁금해서 사용해보았다.
`i`플래그는 대소문자 무시 옵션으로 넣은 것인데 `g`플래그를 사용하지 않은 첫 번째 출력결과는` ["A"]` 단 하나만 출력된 것을 확인할 수 있었다.
`g`플래그를 넣은 결과`["A", "B", "C", "a", "b"]` 해당하는 모든 문자가 배열의 요소로 담겨 반환되었다.

<br>

## 7. 정규식

앞서 살펴본 5, 6번처럼 정규식을 이용해 문자를 찾는 방법이 있다.

```javascript
const reg = /[A-Z]/;
console.log(reg.test('reason')); //false
console.log(reg.test('Reason')); //true
```

`정규식.test(찾을문자)`와 같은 형태로 작성하면 `true` 또는 `false`로 반환된다.

<br>

## 8. includes()

하나의 문자열이 다른 문자열에 포함되어 있는지 확인 후 `true` 또는 `false`를 출력하는 메서드이다.

```javascript
const word = '이것은 이것이고 저것은 저것이다';
const findWord = '이것';

console.log(word.includes(findWord)); //true
console.log(word.includes(findWord, 10)); //false
```

`includes`의 첫번째 인자로 찾고자 하는 문자를 담으면 된다.
두번째 인자는 옵션인데 찾기 시작할 인덱스 위치를 넣으면 된다. 기본값은 0으로 설정되어 있다.
`includes()`도 대/소문자를 구분한다.

```javascript
const word = '얘는 대소문자를 구분해요. aAbBcC';
const findWord = 'aabbcc';

console.log(word.includes(findWord)); //false
console.log(word.toLowerCase().includes(findWord)); //true
```

> 정리하면서 알게된 점
> Array에서만 사용할 수 있다고 생각했던 메소드도 String에서 동일한 메소드가 있다는 점, 생각보다 문자열을 찾을 수 있는 내장 메소드가 많다는 것을 알았다.
> 정규식을 사용해 찾는 방법은 아직 익숙하지 않지만 다양한 방법이 있는 만큼 한가지 방법만 사용해서 문자열을 찾는거 보다 상황에 따라 여러가지 사용하면서 연습해봐야겠다.

<br>

---

> 참고 자료

> [MDN String.indexOf()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)

> [MDN String.lastIndexOf()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)

> [MDN startsWith()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

> [MDN endsWith()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)

> [MDN String.search()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/search)

> [MDN String.match()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/match)

> [MDN String.includes()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

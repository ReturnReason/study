# 웹 스토리지(Web Storage)

클라이언트에 데이터를 저장하는 방법으로 서버나 DB에 저장하지 않아도 되는 데이터를 저장할 때 사용한다. 최대 5MB까지(브라우저마다 차이 있음) 저장할 수 있다. 쿠키의 문제점을 극복하기 위한 저장공간이기도 하다.
데이터가 유실되는 것을 방지하고자 사용된다. 웹 스토리지에는 `LocalStorage`와 `SessionStorage`가 있다.
key와 value 형태로 저장할 수 있으며 문자열만 저장할 수 있다는 특징이 있다.
쿠키보다 더 큰 용량을 가지고 있어 더 많은 데이터를 저장할 수 있다.

<br>

## 1. localStorage

- 브라우저를 종료하더라도 로컬 스토리지에 저장된 데이터는 남아있게 된다.
- 사용자가 캐시 삭제와 같이 직접 삭제하지 않는 동안은 반영구적으로 존재한다.
- 문자열만 저장할 수 있다. Object나 Array를 저장하려고 하면 강제로 문자열로 변환된다.
- 도메인이 같은 경우에만 데이터에 접근할 수 있다. 도메인이 다르면 데이터에 접근할 수 없다.

<br>

### LocalStorage 메소드

```javascript
localStorage.setItem('키', '값');
console.log(localStorage.getItem('키')); // 값
```

`localStorage.setItem(key, value)` 메소드의 파라미터로 key, value를 넣어주면 localStorage에 Key와 value가 저장된다. key를 넣어 해당 값을 받아오려면 `localStorage.getItem(key)` 를 사용하면 된다.

```javascript
localStorage.removeItem('키');
console.log(localStorage.getItem('키')); // null
```

로컬 스토리지에 저장된 key와 value를 삭제할 때는 `localStorage.removeItem(key)`을 사용하면 된다.

<br>

#### 그 외 메소드

- clear() : 모든 key, value 삭제
- key(index) : 인덱스(index)에 해당하는 키 반환
- length : 저장된 항목의 개수 반환

<br>

## 참고사항

문자열이므로 배열로 저장한 데이터를 문자열로 강제 변환하기 때문에 인덱스를 사용한 접근은 불가능하다. 하지만, JSON을 이용하면 배열이나 객체의 형태로 저장할 수 있다.

```javascript
const arrayTest = [1, 2, 3];
const newArry = JSON.stringify(arrayTest);
console.log(newArry, typeof newArry); // [1,2,3] string
// 선언한 배열을 문자열로 변환

localStorage.setItem('numberArray', newArry);
const testResult = localStorage.getItem('numberArray');
// 변환한 문자열을 로컬스토리지에 저장 후
// 로컬스토리지에 저장된 'numberArray'의 value를 testResult로 가져와 저장함

const convert = JSON.parse(testResult); // 문자열을 다시 변환
console.log(convert, typeof convert); // [1, 2, 3] "object"
```

<br>

## 2. SessionStorage

- 브라우저를 종료하면 삭제된다.
- 세션마다 데이터가 저장된다.
- 브라우저의 탭에 한정된 범위로 각 탭마다 세션 정보를 저장한다.
- 도메인이 같더라도 세션이 다르면 데이터에 접근할 수 없다.
- 로컬 스토리지와 마찬가지로 문자열만 저장할 수 있다.

<br>

### Session Storage 메소드

기본적으로 localStorage와 동일한 메소드를 가져서 사용 방법도 동일하다.
세션스토리지는 현재 사용중인 탭에 한정적이기 때문에 로컬스토리지 만큼 자주 사용되지는 않는다.

```javascript
sessionStorage.setItem('key', 'value');
const result = sessionStorage.getItem('key');
console.log(result);
```

세션 스토리지는 브라우저의 탭마다 개별적으로 저장되는 특성으로 인해
탭이 다르면 `sessionStorage.getItem(key)`를 실행했을 때 `null`값이 반환될 수 있다.
그러한 이유에서 자주 사용되지 않는다.

<br>

---

> 참고 자료

> [TCP SCHOOL Web Storage](http://www.tcpschool.com/html/html5_api_webStorage)

> [웹용 스토리지](https://web.dev/storage-for-the-web/)

> [모던 자바스크립트 튜토리얼 - localStorage와 sessionStorage](https://ko.javascript.info/localstorage)

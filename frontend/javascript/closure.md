자바스크립트 클로저라는 말은 많이 들어봤지만 정확히 무엇인지 설명할 수도, 무엇인지도 모른다는 것을 깨닫고 이번 기회에 클로저 개념을 내것으로 만들어야겠다!하는 생각에 정리해보고자 한다.

클로저를 알기 전에는 렉시컬 스코프 개념을 꼭 알고 넘어가야 클로저를 이해할 수 있기 때문에 렉시컬에 대해 먼저 정리해보았다.

## 렉시컬 환경(Lexical Environment)

렉시컬 환경 객체는 `환경 레코드`와 `외부 렉시컬 환경`으로 구성된다.

환경 레코드 : 모든 지역 변수를 프로퍼티로 저장하고 있는 객체
외부 렉시컬 환경에 대한 참조 : 외부 코드와 연관되어 있다.

## 전역 렉시컬 환경

스크립트 전체와 관련된 렉시컬 환경을 전역 렉시컬 환경이라 한다. 전역 렉시컬 환경은 외부 참조가 존재하지 않는다.

```js
const name = '아이유';

function sayHi() {
  const name = '지은';

  console.log(`${name}, 안녕!`);
  sayHello();
}

function sayHello() {
  console.log(`${name}님, 안녕하세요!`);
}

sayHi();
```

먼저 위와 같은 코드가 있을 때 실행 결과는 어떻게 될까?

```js
/* 실행 결과 */
지은, 안녕!
아이유님, 안녕하세요!
```

sayHi 함수 안에서 sayHello를 호출했다.
name라는 변수는 현재 전역 렉시컬 환경에 1개, sayHi 함수 안에 1개가 존재한다.

이때 함수는 동일한 이름의 변수 중 어떤 것을 선택해서 출력할까?
자바스크립트는 이름이 동일한 변수가 있을 때 가장 가까운 변수를 가져와 사용한다.
예를 들어, sayHi 함수 안에서 변수 name을 콘솔에 출력할 때 함수 안에 name이 있으면 내부의 name를 사용한다는 것이다.

> 그렇다면, sayHello를 호출한 것은 sayHi 함수 내부인데 왜
> "지은" 이 아니라 "아이유"가 출력됐을까?

함수 호출 시점이 아닌 `함수 선언 시점`을 기준으로 결정되기 때문이다.

함수 선언 시점 sayHello는 내부에 name을 갖고 있지 않기 때문에 외부의 name인 "아이유"가 담겨있는 변수를 사용하게 되는 것이다.

```js
const name = '아이유';

function sayHi() {
  const name = '지은';
}

sayHi();
```

이 코드만 가지고 살펴보면 다음과 같다.

![](https://velog.velcdn.com/images/reasonz/post/b9ce21e8-c74d-4ce0-91f3-82f92151991f/image.png)

렉시컬 환경은 함수를 호출할 때 자동으로 만들어 진다.
여기서는 sayHi 함수를 호출해서 sayHi라는 내부 렉시컬 환경이 만들어졌다.

sayHi 함수 안에서 console.log 등으로 name를 출력해보면 "아이유"가 아닌 "지은"이 출력되는 이유도 sayHi 함수(내부 렉시컬 환경)가 name 변수를 가지고 있기 때문에 본인 것을 가져다 쓰기 때문이다.
내 눈 앞에 있는 것을 쓰면 되기 때문에 바깥까지 나가지 않는다고 생각하면 될 것 같다.

```js
const name = '아이유';

function sayHi() {
  const name = '지은';

  return function sayHello() {
    console.log(`${name}님, 안녕하세요!`);
  };
}

const hi = sayHi();
hi();
```

이번에는 sayHi 함수의 return값으로 익명 함수를 반환하도록 해보았다.

```js
/* 실행 결과 */
지은님, 안녕하세요!
```

name의 값은 현재 `아이유` 또는 `지은` 두가지 중 하나를 출력할 것이라고 예상해 볼 수 있을 것이다.
그리고 sayHello가 선언된 위치와 가까운 name은 "지은" 이기 때문에 `지은님, 안녕하세요!` 가 출력된 것이다.

### **앞서 살펴본 코드와 차이점은 무엇일까?**

```js
const name = '아이유';

function sayHi() {
  const name = '지은';

  console.log(`${name}, 안녕!`);
  sayHello();
}

function sayHello() {
  console.log(`${name}님, 안녕하세요!`);
}

sayHi();
```

이 코드의 sayHello 함수 출력 결과는 `아이유님, 안녕하세요!` 였다.
함수 선언 시점을 기준으로 name가 결정된다는 것!을 기억해두자.

### 가장 헷갈렸던 코드

```js
function counter() {
  let count = 0;

  return function () {
    return count++;
  };
}

const result = counter();
console.log(result());
console.log(result());
console.log(result());
console.log(result());
```

처음 이 코드를 봤을 때 return이 함수인 것도 흠칫했었지만, 이 리턴 함수를 변수에 담아서 호출 했을 때 예상 결과가 생각했던 것과 달랐던 기억이 있다.

리턴 받아온 함수는 count라는 변수가 없는데 어떻게 count++가 동작하지? 라는 의문이었다. ㅋㅋ

```js
/* 실행 결과 */
0;
1;
2;
3;
```

어떻게 이런게 가능할까?! 싶었는데 이 부분은 `클로저`와 연관이 있었다.

# 클로저

외부 변수를 기억하고 있으면서 이 외부 변수에 접근할 수 있는 함수를 클로저라 한다.
클로저를 사용하면 프라이빗 메소드 처럼 사용할 수도 있다.

> 자바스크립트가 함수를 리턴하고 리턴한 함수가 클로저를 형성하게되는데 클로저가 형성된 시점을 기준으로 유효 범위에 있는 모든 변수가 지역변수로 구성된다.

즉, 위에서 살펴본 이 코드의 경우

```js
function counter() {
  let count = 0;

  return function () {
    return count++;
  };
}

const result = counter();
console.log(result());
```

counter가 리턴하고 있는 익명 함수는 counter 함수에 선언되어 있는 count 변수에 접근할 수 있는 상태이다. 그렇기 때문에 이 상태를 유지한채로 result라는 변수에 담겨진 것이다.

쉽게 다시 말하자면

```js
function(){
  return count++;
}
```

이 함수만 봤을 때는 count라는 변수가 존재하지 않는다.
그럼에도 return 값으로 count를 증가시키려고 하기 때문에 바깥에 있는 렉시컬 환경에서 count 값이 있는지 확인하러 찾아 떠날 것이다. (내 방에 물건이 없으면 방 밖으로 나가서 찾는 것처럼)

```js
function counter() {
  let count = 0;

  return function () {
    return count++;
  };
}
```

그리고 밖에 나간 함수는 counter라는 함수 내부를 뒤적이게 된다. 여기에 count 변수가 있기 때문에 count 발견!! 이거 써야지~ 하고 얘를 가져다 쓴다는 것이다.

그렇기 때문에 이 익명함수는 바깥의 count를 필요로 하는 애라서 클로저가 발생했을 때 유효 범위에 있는 count도 함께 구성되었던 것이다. (매개 변수가 있었다면 이 매개 변수도 클로저에 같이 구성된다.)

---

> 참고 자료

> [모던 자바스크립트 튜토리얼](https://ko.javascript.info/closure)

> [MDN 클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

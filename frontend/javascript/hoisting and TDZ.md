## 자바스크립트 변수의 호이스팅

> 호이스팅(hoisting)이란?
> 코드가 최상단에 위치하지는 않지만, 최상단으로 끌어 올려진 것처럼 동작하는 것을 의미한다.

<br>

우선 호이스팅 전에 알아두어야 할 중요한 내용이 있다. 호이스팅은 `스코프` 단위로 일어난다는 것이다.

```javascript
console.log(msg); //undefined
var msg = "오늘의 공부";
```

var로 선언한 모든 변수는 최상위로 끌어올려진 것처럼 동작하는 `호이스팅(hoisting)`이 일어난다. 위 코드를 살펴보면 msg가 선언되기도 전에 `console.log()`를 사용했지만, 에러가 나지 않고 `undefined`가 출력되는 것을 확인할 수 있다. 이는 var는 선언하기 전에 사용할 수 있기 때문이다. <br>
<br>

> var는 선언과 초기화(undefined) 단계가 함께 일어난다.

### 하지만 '오늘의 공부' 메시지가 출력되지 않은 이유는 무엇일까?

선언은 호이스팅 되더라도 할당은 호이스팅되지 않는 특징 때문이다. var로 선언한 변수의 이름은 호이스팅되어 동작하지만 할당한 것은 호이스팅 되지 않기 때문에 `undefined`가 출력되는 것이다. 즉, 할당한 메시지 '오늘의 공부'는 해당 코드줄에 도착하여야 정상적으로 할당된다는 의미이다.
<br>
<br>

### var만 호이스팅이 일어나는가?

```javascript
console.log(message);
/* Uncaught ReferenceError: message is not defined at <anonymous> */
let message = "2022.04.02 오늘의 공부";
```

호이스팅이 일어나지 않는 것처럼 보이지만 `let`도 호이스팅이 일어난다. let 뿐만 아니라 const도 호이스팅이 일어난다. 그런데 왜 `ReferenceError` 가 발생하는 걸까? 바로 TDZ 때문이다.
<br>
<br>

# TDZ (Temporal Dead Zone)

[TDZ 예제와 함께 설명된 링크](https://www.freecodecamp.org/news/javascript-temporal-dead-zone-and-hoisting-explained/)

```javascript
/*
	console.log(message); 
 	이곳이 곧 TDZ 영역(참조 오류 발생) 	*/
let message = "2022.04.02 오늘의 공부";
console.log(message); // '2022.04.02 오늘의 공부'
```

> TDZ로 인해 호이스팅이 일어나지 않는 것처럼 착각 할 수 있지만 let, const도 호이스팅이 일어난다.

TDZ 영역에 있는 변수를 사용하고자 할 때 참조 오류(ReferenceError)를 발생시켜서 변수 호이스팅으로 인해 오류가 발생하는 것을 방지하고자 TDZ가 존재한다고 보면 될 것이다.

`var`의 호이스팅은 에러를 발생시키지 않아 예측하지 못하는 문제(버그)가 발생할 수 있기 때문이다.
<br>
<br>

```javascript
let test = "테스트";

function testMsg() {
    console.log(test);
    let test = "뭐가 출력될까?";
}

testMsg();
```

<br>
호이스팅에 대해 잘 몰랐을 때는 당연히 '테스트'가 출력될 것이라고 예측했었다.

스코프 단위로 일어나는 호이스팅에 주목해야 한다.
같은 이름의 변수 `test`를 하나는 함수 바깥, 하나는 함수 내부에 선언했다.
<span style="color:#3ba9e8">함수 내부에 선언한 변수 test의 위치로 인해 `참조 에러`가 발생한다.</span>
`let`도 호이스팅이 일어나기 때문에 발생하는 오류인데`console.log(test);`가 `TDZ 영역`에 있기 때문이다.

> let 변수는 var 변수와 달리 선언 단계와 초기화 단계가 분리되어 있다. 그래서 참조 에러를 발생 시키는 것이다.

<br>

`const` 변수는 선언, 초기화, 할당이 동시에 이뤄져야 하는 변수이기 때문에 특별히 언급하지 않았는데
선언, 초기화, 할당 중 한가지만 빠져도 `Uncaught SyntaxError: Missing initializer in const declaration` 에러를 내거나, 선언 전에 사용하면 `Uncaught ReferenceError: is not defined` 에러가 발생한다.
<br>
<br>

---

var로 코딩하는 일은 없었지만, 호이스팅에 대한 지식을 공부할 필요가 있었기 때문에 정리해보았다.

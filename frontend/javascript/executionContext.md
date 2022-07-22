# 실행 컨텍스트 (Execution Context)

실행 컨텍스트를 알아야 scope, context, closure등 자바스크립트의 주요 동작에 대해 이해할 수 있다.
실행 컨텍스트는 실행 가능한 코드가 실행되기 위해 필요한 환경이다.
여기서 환경은 코드 실행에 영향을 주는 조건이나 상태를 의미한다. 코드 실행에 필요한 조건, 상태를 모아둔 객체를 뜻한다.

> **실행 가능한 코드란?**
> 일반적으로 전역 코드, Eval 코드, 함수 코드가 있다.

전역 코드는 전역 영역에 존재하는 코드를 의미하고 Eval 코드는 eval 함수로 실행되는 코드, 함수 코드는 함수 내에 존재하는 코드를 의미한다.

### 실행 컨텍스트는 스택에 쌓인다.

```js
function test() {
  console.log('테스트1 함수입니다.');

  test2();
}

function test2() {
  console.log('테스트2 함수입니다.');
}

test();
```

위 코드는 test함수와 test2 함수가 정의되어있다.
그리고 마지막 줄에서 test 함수를 호출하고 있는데
실행 컨텍스트는 스택이 생성되고 소멸되는 형태로 동작한다.

위 코드를 실행 컨텍스트 스택 구조로 간단하게 살펴보면 다음과 같다.

![](https://velog.velcdn.com/images/reasonz/post/a8d0b2a3-dd5c-4371-b376-b1fd000bf783/image.png)

1. 먼저, 자바스크립트 엔진이 콜 스택에 전역 실행 컨텍스트(Global Execution Context)를 쌓는다.
   실행 컨텍스트 스택 안에 전역 실행 컨텍스트가 생성되었다.

![](https://velog.velcdn.com/images/reasonz/post/957f5220-587f-44f1-997b-941ba0657fea/image.png)

2. test2 함수를 호출하였기 때문에 test 함수가 콜 스택에 쌓이게 된다.

![](https://velog.velcdn.com/images/reasonz/post/98f04075-d450-4e15-8ebc-d729261e5cf5/image.png)

3. test 함수에서는 console.log 함수를 사용하고 있기 때문에 console.log가 스택에 쌓일 것이다.
   이 console.log는 "테스트1 함수입니다."라는 텍스트를 콘솔에 출력하고 함수 실행이 종료되었으므로 실행 컨텍스트에서 빠져나간다.

![](https://velog.velcdn.com/images/reasonz/post/b452b01a-d628-4ca1-80d1-655a69264f52/image.png)

다음으로는 test2 함수를 호출하고 있기 때문에 test2 함수도 실행 컨텍스트에 쌓일 것이다.

![](https://velog.velcdn.com/images/reasonz/post/23ded508-69f1-42c9-b027-5a35bfb0e8b9/image.png)

4. test2 함수도 실행 컨텍스트 스택에 쌓였다.
   이제 test2 함수 안의 console.log함수가 스택에 쌓일 것이다.

![](https://velog.velcdn.com/images/reasonz/post/48442b6c-3dc0-4723-b24c-f36c37326a34/image.png)

이 console.log 함수는 테스트2 함수입니다.를 콘솔에 찍고 스택을 빠져나가게 된다.

![](https://velog.velcdn.com/images/reasonz/post/dff85cce-a2ea-42ee-a665-13220752cf58/image.png)

5. test2 함수가 끝에 도달하여 종료되었으므로 test2 함수가 이제 스택에서 빠져나간다.

![](https://velog.velcdn.com/images/reasonz/post/6ec6c3c9-c4d9-42a0-8c6a-7322ede0c12c/image.png)

마찬가지로 test 함수도 test2 함수 호출 이후에 코드가 없으므로 test 함수도 종료되어 콜 스택을 빠져나간다.

![](https://velog.velcdn.com/images/reasonz/post/3c47c206-4049-432e-8613-27ef5e9aa37b/image.png)

6. 전역 코드가 모두 실행되었으므로 전역 실행 컨텍스트도 스택을 빠져나가게 된다.

![](https://velog.velcdn.com/images/reasonz/post/fbc590d1-3b2b-452b-8a6b-c6b868788db4/image.png)

> 콜 스택은 차례로 쌓여서 사용될 때는 가장 마지막에 들어온 스택이 먼저 빠져 나가는 LIFO ( Last In First out ) 구조를 가진다.

# 호이스팅

```js
console.log(hi); // undefined
var hi = '안녕';
console.log(hi); // 안녕
```

변수를 선언하기 전에 console.log에서 변수를 참조하고 있다. 자바스크립트에서는 에러가 발생하지 않고 `undefined`가 출력되는데 이를 호이스팅(최상단에 끌어올려진 것 처럼 동작)이라 한다.

### 왜 호이스팅 현상이 발생할까 ?

실제로 해당 코드를 최상단으로 끌어 올린 것이 아니라 자바스크립트 엔진이 실행 컨텍스트가 생성 되었을 때 실행 컨텍스트(Environment Record, 환경 레코드)에 미리 기록해놓기 때문이다.

var 로 선언한 변수는 선언, 초기화, 할당 3가지 단계가 한번에 이루어지게 된다.

> 실행 컨텍스트가 생성 되었을 때 자바스크립트 엔진이 변수 객체를 생성하여 이곳에 변수, 매개변수, 인수 정보, 함수 선언(표현식은 미포함)의 정보를 담게 된다.

자바스크립트 엔진은 코드 실행시 콜 스택에 전역 실행 컨텍스트를 콜스택에 넣고 전체 코드를 스캔하여 선언할 것이 있다면 먼저 선언을 하게 된다.

```js
var hi = '안녕';
```

그러므로 호이스팅이 일어나는 var 변수 hi를 환경 레코드에 기록하게 된다.
var 키워드로 선언되었으므로 hi 변수는 `undefined`로 값이 초기화가 된다.

> 이 과정을 `생성 단계`라고 한다.
> 생성 단계에서는 실행 컨텍스트를 생성하여 환경 레코드를 기록한다.

이후 실제로 코드를 실행하는 단계를 `실행 단계`라고 한다. 선언문을 제외한 나머지 코드를 순차적으로 실행하고 환경 레코드를 참조하거나 업데이트하는 일을 수행하기도 한다.

```js
console.log(hi); // undefined
var hi = '안녕';
console.log(hi); // 안녕
```

즉, 위 코드가 var로 선언된 hi 변수 코드보다 먼저 console.log에서 hi 변수를 참조하고 있음에도 에러가 발생하지 않고 `undefined`가 출력되는 이유는 실행 단계에서 환경 레코드에 기록되어 있는 hi 변수를 참조하기 때문이다.

그리고 var hi = '안녕' 코드를 만났을 때 비로소 변수 값을 할당하게 된다. 선언은 이미 생성 단계에서 환경 레코드에 기록했기 때문에 할당만 실행된다.

```js
console.log(hi);
```

그리고 마지막 코드에서 다시 한번 hi 변수를 참조하고 있는데
자바스크립트 엔진이 환경 레코드를 다시 참조 했을 때는 업데이트 된 hi 변수의 값이 '안녕' 이기 때문에 이 시점에서는 '안녕'이 출력된다.

### var 대신 let, const로 선언하면?

```js
console.log(hi);
const hi = '안녕';
console.log(hi);
```

자바스크립트 엔진이 처음에 전체 코드를 스캔할 때 hi 변수가 기록되긴 하지만 const로 선언되어 있기 때문에 var 변수 처럼 기록과 함께 값을 초기화하지는 않는다.

이때 값이 초기화되지 않은 상태로 첫번째 줄 코드에서 hi 변수를 참조하려고 하고 있기 때문에 `Uncaught ReferenceError: hi is not defined` 에러가 발생한다.
기록만 되어 있고 초기화가 되어 있지 않기 때문에 값을 받아올 수 없기 때문이다.

let도 const와 마찬가지로 동작하는데 let 과 const로 선언한 변수는 해당 변수에 값이 할당 되기 전에 해당 변수를 참조하려고 하면 에러가 발생하는데 이를 `TDZ(Tmporal Dead Zone)`라 부른다.

> ** var 키워드는 선언, 초기화가 함께 이루어진다.**
> 선언 단계에서 메모리 공간 확보 및 메모리 주소 식별자를 연결해둔다. 초기화 단계에서는 undefined로 값을 초기화 시킨다. (그래서 실제 변수 할당 코드 전에 참조해도 에러가 발생하지 않고 undefined가 출력된다.)

> **let, const 키워드는 undefined로 값을 초기화 시켜놓지 않는다. ** 할당하는 코드가 실행되기 전까지는 변수는 아무런 값이 없다. (그래서 TDZ가 발생한다.)
> let과 const는 선언 라인을 만나야만 변수를 참조할 수 있다.

## 함수 호이스팅

함수는 함수 표현식과 선언식이 있다.
함수 표현식은 함수를 변수에 담아서 사용하는 방법이다.
선언식은 일반적으로 알고 있는 함수의 형태이다.

```js
func();
const func = () => {
  console.log('함수 표현식');
};
```

> Uncaught ReferenceError: func is not defined

위 코드는 참조 에러가 발생한다. 함수 표현식의 경우도 마찬가지로 변수의 호이스팅과 동일하게 동작하기 때문이다.

```js
func();
function func() {
  console.log('함수 선언식');
}
```

함수 선언문 방식으로 함수를 작성한 경우에는 자바스크립트 엔진이 완성된 함수 객체를 환경 레코드에 기록해 두기 때문에 선언과 동시에 함수가 생성되어 선언 전에도 함수를 사용할 수 있게 된다.

## 외부 환경 참조 (Outer Environment Reference)

바깥 Lexical Environment를 가르킨다.
렉시컬 환경(정적 환경)은 앞서 살펴봤던 환경 레코드와 외부 환경 참조를 포함한다.

#### 콜 스택 안에 동일한 식별자가 여러개가 있을 때 자바스크립트 엔진은 어떻게 외부 환경 참조를 사용하여 의사 결정을 할까?

예를 들어, 당장 가위가 필요한 상황이라고 해보자. ✂
현재 가위의 위치는 내 방 책상 위에 가위A가 있고 방 바깥의 테이블에 놓인 가위B가 있는 상황이다. (현재 나는 방 안에 있다.)

이때 나는 어떤 가위를 사용할까? 대개 자기 자신과 가까운 위치에 있는 가위A를 선택할 것이다. 똑같은 가위인데 굳이 멀리 나가서 찾아올 필요는 없기 때문이다.

자바스크립트도 마찬가지로 여러개의 식별자 중 현재 스택에서 가장 가까운 식별자를 참조하도록 동작한다. 다음 코드를 살펴보자.

```js
/* 방 바깥이라고 생각해보자*/
const scissors = '가위B';

function myRoom() {
  /* 이곳이 내 방안*/
  const scissors = '가위A';
  console.log(scissors);
}

myRoom();
```

위 코드는 가위A가 콘솔에 출력될 것이다.
전체 코드에 scissors라는 이름의 변수는 2개가 존재하고 있다. 하지만 `console.log(scissors);` 를 호출하는 위치를 살펴보면 myRoom 안의 scissors 변수가 더 가깝기 때문에 가까운 변수를 출력하는 것이다.

> 자바스크립트는 코드에서 변수나 함수의 값을 결정한다. 이것을 `식별자 결정(Indentifier Resolution)` 이라 한다.

### 방 안에 가위가 없다면?

```js
const scissors = '가위B';

function myRoom() {
  console.log(scissors);
}

myRoom();
```

이전과 동일한 코드에서 myRoom 안의 scissors 변수를 제거해보았다. 이때 myRoom 함수를 호출하면 `가위B` 가 콘솔에 출력된다. 당장 가위가 필요한데 방 안에 가위가 없으니 방 바깥으로 나가서 가위를 찾아오는 것과 같다.

### 그 어디에도 가위가 없다면?

```js
function myRoom() {
  console.log(scissors);
}

myRoom();
```

가위를 찾고 있는데 가위가 집에 없다면?
`Uncaught ReferenceError: scissors is not defined`
가위를 찾아봐도 집에 가위가 없기 때문에 가위가 없다는 결론을 내리게 될 것이다. 자바스크립트 엔진도 마찬가지로 없는 것을 참조하려 했기 때문에 레퍼런스 에러를 발생시킨다.

### 서랍에 있는 줄 알았는데 없는 경우

이제 연필을 찾는다고 가정해보자. 서랍에 넣어뒀다고 생각해서 현재 서랍을 뒤적거리고 있다.

```js
const pencil = '연필A';

function myRoom() {
  const pencil = '연필B';

  function inSideDrawer() {
    console.log(pencil);
  }

  inSideDrawer();
}

myRoom();
```

먼저 방 바깥과 연필, 방 안에는 연필이 있고 서랍에는 연필이 없는 상황이다.
현재 나는 서랍에 연필이 있는 줄 알고 연필을 찾고 있지만 찾아봐도 없어서 방 안의 책상을 둘러보니 연필을 찾을 수 있었다.

자바스크립트 엔진도 마찬가지이다. 현재 inSideDrawer 함수 안에서 console.log가 pencil을 참조하려고 하고 있다.
하지만 주변에는 pencil 변수가 없기 때문에 outer(외부 환경 참조)를 타고 바깥 렉시컬 환경으로 이동하게 된다.
myRoom을 살펴보니 pencil 변수가 있으므로 이 pencil 변수를 참조하게 된다. 그러므로 콘솔에는 `연필B`가 출력될 것이다. myRoom 바깥에도 연필이 있지만 이미 필요한 연필을 찾았기 때문에 바깥까지 나가지 않고 이것을 참조하는 것이다.
사실 이미 찾았기 때문에 바깥에 연필이 더 있는지 없는지 알 필요가 없다.

> 이때 동일 식별자로 상위 스코프에 선언된 식별자의 값이 가려지는 현상을 `변수 섀도잉(Variable Shadowing)` 이라 한다.

만약, myRoom에도 없다면 바깥으로 이동하여 pencil을 찾을 것이다. 전역 실행 컨텍스트에도 없는 경우에는 전역 실행 컨텍스트가 최상위 실행 컨텍스트이므로 참조 에러가 발생한다.

지금까지 연필을 찾기 위해 서랍, 내 방, 방 바깥이라는 세가지 공간이 존재했다. 서랍에 없으면 방안을 뒤적거리고, 방 안에도 없으면 방 바깥으로 나가서 연필을 찾게 될 것이다.

> 이러한 것처럼 자바스크립트는 식별자를 결정할 때 스코프들이 연결되어 있는 것을 활용하는데 이를 **스코프 체인(Scope Chain)**이라 한다.

연필을 찾기 위해 서랍 > 방안> 방 바깥 으로 가는 행위(과정) 자체를 `스코프체이닝`이라 한다.

---

> 참고 자료
> [실행 컨텍스트와 자바스크립트 동작 원리](https://poiemaweb.com/js-execution-context)

[하루의 실행 컨텍스트](https://www.youtube.com/watch?v=EWfujNzSUmw&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)

[모던 자바스크립트 Deep Dive](https://ridibooks.com/books/1160000024?_s=search&_q=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8&_rdt_sid=search&_rdt_idx=0)

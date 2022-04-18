> 이벤트 리스너, 생성자 함수, 라이브러리 등의 this에 대한 내용을 다루고 있지 않음.

<br>

# this

자바스크립트의 `this`는 다른 언어와 조금 다르게 동작하며,
자바스크립트의 엄격 모드(`'use strict'`)와 비엄격 모드에서도 `this`의 의미가 조금씩 달라진다는 특징이 있다.
this는 호출한 방법에 의해 결정된다.

<br>

### 1. 그냥 this 출력

```javascript
console.log(this);
```

콘솔에 `this`를 그냥 출력해보면 `window`객체가 출력되는 것을 확인할 수 있다.
이것으로 기본적으로 `this`는 window를 가르키는 것을 알 수 있다.

<br>

### 2. 객체 메소드에서 this 출력

```javascript
const test = {
  fc: function () {
    console.log(this);
  },
};

test.fc();
```

위와 같은 형태로 작성하면 객체의 메소드 호출시 this가 내부적으로 변경되기 때문에 객체를 가르키도록 출력된다. (메소드가 소속된 객체가 this값이 된다.)

하지만 다음과 같이 사용시 `this`는 `window`를 가르킨다.

```javascript
const test = {
  fc: function () {
    console.log(this);
  },
};

test.fc(); // fc

const test2 = test.fc;
console.log(test2()); // window
```

test 객체에있는 메소드를 test2에 넣어 호출했더니 this가 window를 가르킨다.
즉, 호출할 때 그냥 함수인지, 객체의 메서드인지에 따라 `this`가 바뀐다는 것이다.
**예외사항으로 라이브러리나 이벤트리스너 사용 시 this가 내부적으로 변경될 수 있다는 점을 꼭 기억하자.**

<br>

#### 그렇다면, 객체 안의 객체 메서드라면 어떻게 출력될까?

```javascript
const test = {
  innerTest: {
    innerFc: function () {
      console.log(this);
    },
  },
};

test.innerTest.innerFc(); // test.innerTest
console.log(test.innerTest);
```

this를 출력하고 있는 메서드가 포함되어있는 test.innerTest를 가르키도록 출력되는 것을 확인할 수 있다. 즉, 바깥에 있는 객체인 test 객체가 아닌, 안쪽 객체 innerTest를 뜻하게 된다.

<br>

### arrow function을 사용하면 어떨까?

```javascript
const test = {
  fc: () => {
    console.log(this);
  },
};

test.fc();
```

객체 안의 메소드에서 this를 출력하도록 해보았다.
`window`가 출력된다.

```javascript
const test = {
  innerTest: {
    innerFc: () => {
      console.log(this);
    },
  },
};

test.innerTest.innerFc(); // window
console.log(test.innerTest);
```

객체 안의 객체 메소드에서 this를 출력하도록 해보았다.
역시 `window`가 출력됐다.

그냥 함수와 화살표 함수의 차이점이 여기에서 분명하게 드러났다.
바로 `this`가 가르키는 것이 다르다는 점이다.

<br>

### 일반 함수와 화살표 함수의 this 차이점

화살표 함수(arrow function)는 this값을 함수 바깥에 있는 `this`를 그대로 가져다 사용한다.

<br>

### 3. 함수 안에서 this 출력

```javascript
function test() {
  console.log(this);
}

test();
```

그냥 함수를 선언하고 호출해도 `window`를 가르키도록 출력된다.
**단, 엄격 모드(`'use strict';`)인 경우에는 `undefined`가 출력된다.**

---

<br>

### 사실 1~3번에서 살펴본 사례는 모두 동일한 의미이다.

왜냐하면, 전역 변수나 함수를 선언하면 window라는 전역 객체에 포함된다. 그 결과 그냥 this를 출력해보거나 일반 함수에서 this를 출력했을 때 내가 포함되어있는 객체인 window가 나타나는 것이다.

```javascript
var 변수 = '변수입니다';

function 함수() {
  console.log('함수입니다.');
}

console.log(변수); // 변수입니다.
console.log(함수()); //함수입니다.

console.log(window.변수); //변수입니다.
console.log(window.함수()); //함수입니다.
```

위 코드를 살펴보면 `window.`을 붙여 출력한 것과 붙이지 않는 것 모두 동일한 결과값이 나타난다. (\*단, 위 코드에서 변수 선언 할 때 var가 아닌, let 또는 const로 선언하면 `window.변수`의 값은 `undefined`이므로 참고)
**var 키워드로 선언한 것만 window객체와 연결된다.**

<br>

```javascript
window: {
  // 이 안에 선언한 것과 같다는 의미
}
```

그렇기 때문에 객체를 만들어 그 안의 메소드에서 this를 출력했을 때 그 this가 포함되어있는 객체가 나타나는 것은 동일한 현상으로 볼 수 있는 것이다.

> 요약 : this는 자기 자신이 포함되어있는 객체를 가르킨다.
> 그렇기 때문에 위에서 살펴본 1번~3번까지의 사례는 사실상 모두 동일한 의미를 나타낸다.

<br>

---

> 참고 자료

> [MDN this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

> [Zerocho Blog - 자바스크립트의 this는 무엇인가?](https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb)

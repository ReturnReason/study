# 자바스크립트 함수 메소드

모든 함수에서 사용할 수 있는 메소드로 `this`값을 지정할 때 사용하는 메소드이다.
함수의 this값을 설정할 수 있는 call, apply, bind를 사용해 확인해보았다.

1. call()
2. apply()
3. bind()

<br>

## 1. call()

먼저, call을 사용하지 않은 상태에서 this를 출력하는 함수를 호출해보았다.
apply()와 유사하게 사용할 수 있다.
call은 두번째 인자부터는 호출할 함수에 사용될 파라미터를 하나씩 나열하여 전달한다.

```javascript
const person = {
  name: '아이유',
  age: 30,
};

function sayHi() {
  console.log(`${this.name} : 안녕!`);
}

sayHi(); // 그냥 사용시 this가 window가 된다.
```

` : 안녕!` 또는 `undefined : 안녕!`과 같은 형태로 나타날 것이다.
왜냐하면 일반 함수에서 사용하는 `this`는 윈도우를 가르키기 때문이다.
이때 `call()`을 사용하여 이 `this`값이 윈도우가 아닌 다른 것을 가르키게 만들 수 있다.

```javascript
const person = {
  name: '아이유',
  age: 30,
};

function sayHi() {
  console.log(`${this.name} : 안녕!`);
}

sayHi.call(person);
```

`함수.call(객체)`의 형태로 this를 지정해주면 해당 객체를 this로 받아서 출력하게 된다.
call의 첫번째 인자는 this로 설정할 객체, 두번째 인자부터는 해당 함수를 호출할 때 사용하는 파라미터 값으로 사용된다.
call을 사용할 때 파라미터를 더 추가해서 확인해보자.

```javascript
const person = {
  name: '아이유',
  age: 30,
};

function introduce(job, debut) {
  this.job = job;
  this.debut = debut;
  console.log(`${this.name}는 현재 ${this.age}살이고 직업은 ${this.job}이며 데뷔일은 ${this.debut}입니다.`);
}

introduce.call(person, '가수겸 배우', '20080918');
console.log(person); // {name: "아이유", age: 30, job: "가수겸 배우", debut: "20080918"}
```

위 코드처럼 기존에 정의된 함수에서 사용할 파라미터 값을 this로 설정한 객체 다음 인자값으로 넣어주면 된다.
정의한 함수가 파라미터 값을 받지 않는다면 앞서 살펴봤던 것처럼 첫번째 매개변수로 this를 설정할 객체만 적어주면 된다.
함수를 호출하여 설정한 `this.job`과 `this.debut`가 기존 person 객체에 추가된 것도 확인할 수 있다.

<br>

## 2. apply()

앞서 살펴본 call()과 동일한 수행을 하지만 사용하는 방법에서 아주 살짝 차이가 있다.
apply는 두번째 인자로 배열을 받는다는 점이 다르다.

```javascript
const person = {
  name: '아이유',
  age: 30,
};

function introduce(job, debut) {
  this.job = job;
  this.debut = debut;
  console.log(`${this.name}는 현재 ${this.age}살이고 직업은 ${this.job}이며 데뷔일은 ${this.debut}입니다.`);
}

introduce.apply(person, ['가수겸 배우', '20080918']);
console.log(person); // {name: "아이유", age: 30, job: "가수겸 배우", debut: "20080918"}
```

call()에서 사용했던 코드를 그대로 사용해보았다.
다른 점은 `introduce.apply(person, ["가수겸 배우", "20080918"]);`이부분 뿐이다.
apply를 사용할 때 인자 값으로 this를 사용할 객체, 호출할 함수의 파라미터로 쓰일 배열 형태의 값이다.
즉, apply의 두번째 인자로 배열을 받는다는 것이다.

```javascript
const number = [1, 2, 3, 4];
console.log(Math.min(number)); // NaN
```

number라는 배열에서 최소값을 구하고 싶을 때 그냥 `Math.min()`에 number 배열을 넣어버리면 NaN이 출력된다.
이때 해결하는 방법으로는 `스프레드 연산자(spread Operator)`를 사용하거나, `apply()`를 이용하면 된다.

```javascript
/* 스프레드 연산자를 사용 */
const number = [1, 2, 3, 4];
console.log(Math.min(...number)); // 1

/* apply() 사용 */
const number2 = [1, 2, 3, 4];
console.log(Math.min.apply(null, number2)); // 1
```

여기서 apply의 첫번째 인자로 `null`을 주었는데 객체에 this로 쓰일 값이 들어가는 부분이라서 이런 상황에서 사용될 때는 아무 값이나 넣어도 상관없다. 대신 두번째 인자는 배열이 들어가야한다.
배열을 두번째 인자로 넣어주면 배열 안의 값을 차례대로 사용하게 되어 결과값이 스프레드 연산자와 동일하게 나타난다.

<br>

## 3. bind()

`this`의 값을 변경할 수 있는 메소드이다.
bind()가 호출되면 새로운 함수를 생성하고 첫 번째 인자로 받은 것을 `this`값으로 설정하게 된다.
두번째 인자부터는 바인드된 함수의 파라미터로 사용된다.

```javascript
const lucid = {
const lucid = {
  name: "Lucid",
  level: 230,
  item: "몽환의벨트",
};

const say = function(txt){
  console.log(`${this.name} : ${txt}`);
}


say('Hi'); // 에러 또는 " : Hi" 출력
```

this를 바인드 하지 않고 사용해보았다. 에러가 나거나 " : Hi "가 출력된다.
this의 값이 window로 되어 있어서 name의 값이 없기 때문이다.

```javascript
const lucid = {
  name: 'Lucid',
  level: 230,
  item: '몽환의벨트',
};

const say = function (txt) {
  console.log(`${this.name} : ${txt}`);
};

const lucidSay = say.bind(lucid, '헤어날 수 없는 꿈에서 발버둥쳐본 적이 있나요?');
lucidSay(); // Lucid : 헤어날 수 없는 꿈에서 발버둥쳐본 적이 있나요?
```

lucidSay에 this를 바인드한 값을 넣어주고 호출하니 예상했던 결과 값이 출력되었다.
bind 메소드의 첫번째 인자로 객체를 넣어주어 this 값을 설정하도록 만들었다.
또, say 함수에서 txt를 파라미터로 받기 때문에 해당 txt 값을 두번째 인자로 넣어주었다.

<br>

> 모두 this의 값을 설정할 수 있다는 점은 동일하다.
> apply와 call은 this값을 바꿈과 동시에 함수를 호출한다. apply는 두번째 인자로 배열을 받고 call은 일반적인 인자를 받는다. 그외에는 call과 apply는 동일한 메소드이다.
> bind는 사용시 호출은 하지 않으므로 변수에 할당하여 this를 바인딩한 변수를 호출하는 방식으로 사용된다.

<br>

---

> 참고 자료

> [MDN call()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

> [MDN apply()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

> [MDN bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

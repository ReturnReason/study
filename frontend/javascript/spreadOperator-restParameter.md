# 자바스크립트 ...의 의미

spread 연산자나 rest 파라미터를 사용할 때 `...`을 붙여서 사용한다.
처음에 봤을때 이건 뭐지? 싶은 느낌이었다.
한국어로 표현하면 이거저거 등등등... 이런 느낌이라 생각하면 될 것같다.

## 1. Spread Operator (스프레드 연산자)

배열이나 문자열과 같이 여러개의 요소를 가져올 때 사용된다.
배열이나 객체를 복사할 때 사용할 수도 있고 기존 배열에 요소를 추가하여 새로운 배열을 만드는 등 다양하게 활용이 가능하다.

<br>

### 객체 복사

```javascript
const person = {
  name: 'IU',
  age: 30,
};

const person2 = {
  ...person,
};

console.log('person :', person);
console.log('person2 : ', person2);
```

스프레드 연산자를 사용하여 기존 person 객체 안에 있는 것을 그대로 복사해서 person2 객체의 값으로 할당하였다.

![](https://velog.velcdn.com/images/reasonz/post/0134fa24-46c9-46b7-9737-ed480ed3ec6a/image.png)

### 그러면 객체를 복사하는 Object.assign() 대용으로 사용할 수 있나?

맞을 수도 있고 틀릴 수도 있다.
단순히 객체를 병합하거나, 얕은 복사를 할 때는 `Object.assign()`을 대신할 수 있다.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const person = new User('아이유', 30);
console.log(person.__proto__); // constructor : User(name, age)

const person2 = { ...person };
console.log(person2.__proto__); // constructor : Object()
```

`person2` 객체는 `person`을 스프레드 연산자를 사용해 복사하였다.
단순히 내부의 값들은 복사가 제대로 되었지만, 프로토타입을 확인해보면 전혀 다른 값이 출력된다.

```javascript
console.log(person instanceof User); // true
console.log(person2 instanceof User); // false
```

instanceof를 사용해서 확인해봐도 결과가 다른 것을 알 수 있다.
즉, 객체를 복사할 때 스프레드 연산자를 사용하면 프로토타입까지 깊은 복사가 되지 않는다는 의미이다.

그 외에도 `Object.assign()`의 동작과 다른 것들이 있지만 이번 포스트에서는 생략..!
나중에 assgin 메소드를 살펴볼때 그때 공부하면서 추가로 정리해봐야겠다.

<br>

## 객체를 복사할 때 중복된 키 값이 있다면?

```javascript
const obj = {
  name: '이름',
  age: '나이',
};

const obj2 = {
  name: '아이유',
  age: 30,
};

const newObj = {
  ...obj,
  ...obj2,
};

console.log(newObj); // {name: "아이유", age: 30}
```

위 코드에서 obj와 obj2는 동일한 키값 name과 age를 가지고 있다.
이때 newObj에 두 객체를 스프레드 연산자를 사용해 복사하였다.
결과 값을 확인하면 알 수 있다시피 동일한 키값은 마지막에 적은 객체를 기준으로 덮어쓰기 된다.

<br>

### 배열 복사

객체 뿐만 아니라 배열에서도 사용할 수 있다.

```javascript
const boss = ['자쿰', '루시드', '검은마법사'];
const newBoss = [...boss];
console.log(boss); //["자쿰", "루시드", "검은마법사"]
newBoss.push('선택받은 세렌');
console.log(newBoss); //["자쿰", "루시드", "검은마법사", "선택받은 세렌"]
```

위와 같이 원본 배열은 레퍼런스 데이터 타입이므로 원본 데이터를 건드리지 않기 위해 배열을 복사할 때도 유용하게 사용할 수 있다.

<br>

### 배열 복사 및 값 추가

```javascript
const arr = [1, 2, 3, 4];
const newArr = [...arr, 5, 6];
console.log(newArr); //  [1, 2, 3, 4, 5, 6]
```

스프레드 연산자를 사용해 `newArr`에는 `arr`의 배열을 복사하면서 5와 6도 추가하였다.

<br>

## 함수 호출에서 배열을 사용할 때

```javascript
function fc(a, b, c) {
  console.log(a, b, c);
}

const arr = [1, 2, 3];
fc(arr); // [1, 2, 3] undefined undefined
fc(arr[0], arr[1], arr[2]); // 1 2 3
fc(...arr); // 1 2 3
```

함수 fc는 파라미터로 a,b,c 세가지를 받을 수 있다.
이때 배열을 이 함수에 넣고 싶다면 `fc(arr[0], arr[1], arr[2]);`로 배열의 요소 하나하나씩 작성해서 넣는 방법이 있을 것이다. 너무 귀찮고 불편하다.
이때 스프레드 연산자`fc(...arr);`를 활용하면 쉽게 동일한 결과를 얻을 수 있다.

```javascript
const arr = [1, 2, 3];

function fc2(a, b, c, d, e, f) {
  console.log(a, b, c, d, e, f);
}

fc2(...arr, '추가', ...arr); //1 2 3 "추가" 1 2
```

이렇게 여러번 사용할 수도 있다. 중간에 다른 값을 넣어서 만들 수도 있다.

<br>

## 2. rest parameter (나머지 매개변수)

앞서 살펴봤떤 스프레드 연산자와 사용 방법은 동일하다.
다만 rest 파라미터는 함수에서 사용하는 `...매개변수`를 의미한다.
rest 파라미터로 전달된 값들은 배열의 형태가 된다.

```javascript
function test(...rest) {
  console.log(rest); // [1, 2, 3, 4, 5]
  console.log(...rest); // 1 2 3 4 5
}

test(1, 2, 3, 4, 5);
```

...를 사용하면 `{}`나 `[]`를 떼버린다고 생각하면 알기 쉽다.
그래서 처음에 rest만 출력한 결과값은 test 함수의 매개변수 `...rest`가 배열 형태로 받아와지기 때문에 `[1, 2, 3, 4, 5]`가 출력되는 것이고
두번째 console.log로 출력한 `...rest`의 출력 결과는 ... 으로 중괄호 또는 대괄호를 삭제하여 `1 2 3 4 5`가 출력되는 것이다.

<br>

### 다른 파라미터와 rest 파라미터를 함께 쓴다면?

```javascript
function test(a, b, ...rest) {
  console.log(a, b, rest); // 1, 2 ,[3, 4, 5]
  console.log(a, b, ...rest); // 1 2 3 4 5
}

test(1, 2, 3, 4, 5);
```

a와 b, 그리고 rest 파라미터를 함께 함수의 매개변수로 사용하였다.
...rest는 다른 매개 변수와 함께 사용하는 경우 가장 마지막에 작성되어야한다.
즉, `function test(...rest, a, b)`와 같은 형태는 에러가 난다. (Rest element must be last element)

<br>

> ### 스프레드 연산자와 rest 파라미터의 비교&차이점
>
> 함수의 파라미터로 쓰이면 rest 파라미터, 그외 객체나 배열 등에 사용되면 스프레드 연산자이다.
> 두가지 모두 사용 방법은 동일하다.
> 단, rest 파라미터의 경우 함수 매개변수의 가장 마지막에 작성되어야 한다.
> 스프레드 연산자는 위치 상관없이 사용할 수 있으며 여러번 사용도 가능하며 이터러블한 데이터에만 사용할 수 있다.

<br>

---

> 참고 자료

> [MDN 전개구문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> [poiemaweb](https://poiemaweb.com/es6-extended-parameter-handling)

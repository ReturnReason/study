# Javascript class & 생성자함수

class는 객체를 만들기 위한 템플릿이다.
function을 사용해서도 객체를 만들 수 있는데 클래스와는 어떤 차이가 있을까?

### 클래스로 객체 만들기

작성 방법 : `class 작명 { constructor(){ } }`

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const user1 = new User('아이유', 30);
console.log(user1);
```

![](https://velog.velcdn.com/images/reasonz/post/33508e1a-02b3-4675-b898-eae8652a3f81/image.png)

### 생성자 함수로 객체 만들기

일반 함수 사용과 동일하지만 생성자 함수는 앞에 `new`키워드를 붙여서 사용한다.
어떤 함수를 사용하더라도 new 키워드를 붙이면 생성자 함수처럼 동작한다.
그렇기 때문에 생성자 함수와 일반 함수를 구분하기 위해 생성자 함수의 이름을 작명할 때는 앞글자를 대문자로 작성하는 것이 관례이다.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const user = new User('아이유', 30);
console.log(user);
```

코드상으론 보이지는 않지만 빈 객체 this를 만들어서 this.name와 this.age를 저장하고 this를 return한다.

![](https://velog.velcdn.com/images/reasonz/post/5a7ab5d6-4891-423e-a963-8ba8d75aa435/image.png)

# 생성자 함수와 클래스 차이점

### 1. 호이스팅에서 차이가 있다.

클래스는 호이스팅 될 때 초기화는 되지 않기 때문이다.
생성자 함수는 다음과 같이 작성 위치를 바꾸어도 정상적으로 동작한다.

```javascript
const user = new User('아이유', 30);
console.log(user);

function User(name, age) {
  this.name = name;
  this.age = age;
}
```

하지만 클래스는 위와 동일한 순서로 작성하면 에러가 발생한다.

```javascript
const user1 = new User('아이유', 30);
console.log(user1);

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
// User is not a constructor
```

### 2. 메소드를 만들었을 때 차이가 있다.

클래스로 만든 것은 2가지 방식이 있다.

<br>

### 생성자 함수 메소드 만들기

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`안녕, ${this.name}!`);
  };
}

const user = new User('아이유', 30);
user.sayHi(); // 안녕, 아이유!
console.log(user);
```

![](https://velog.velcdn.com/images/reasonz/post/9832057c-da16-4fc5-8e5a-7e43a44ca137/image.png)

생성된 인스턴스 내에 sayHi 메소드도 포함되어 있을것을 확인할 수 있다.

<br>

### 클래스에서 메소드 만들기 1

constructor 바깥에서 만든 메소드

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log(`안녕, ${this.name}!`);
  }
}

const user1 = new User('아이유', 30);
console.log(user1.sayHi());
```

<br>

### 클래스에서 메소드 만들기 2

constructor 안에서 만든 메소드

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function () {
      console.log(`안녕, ${this.name}!`);
    };
  }
}

const user1 = new User('아이유', 30);
console.log(user1.sayHi());
```

<br>

모두 콘솔에는 동일한 "안녕, 아이유!"가 출력될 것이다.
클래스에서는 constructor안에 메소드를 만드는 방법과 constructor 바깥에서 메소드를 만드는 방법이 있는데 이 두가지의 차이점도 확인해보자.

### constructor 안에서 만든 메소드

<br>

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function () {
      console.log(`안녕, ${this.name}!`);
    };
  }
}

const user1 = new User('아이유', 30);
console.log(user1.sayHi());
console.log(user1);
```

<br>

![](https://velog.velcdn.com/images/reasonz/post/27d62e49-f236-45f1-81db-967bf6ed8e16/image.png)

constructor 안에서 선언한 메소드는 만들어진 인스턴스가 직접 그 함수를 가지고 있을 수 있게 된다.
console에 user1을 출력했을 때 sayHi()라는 메소드를 가지고 있는 것을 확인할 수 있었다.
생성자 함수와 동일한 결과물이다.

### constructor 밖에서 만든 메소드

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    console.log(`안녕, ${this.name}!`);
  }
}

const user1 = new User('아이유', 30);
console.log(user1.sayHi());
console.log(user1);
```

이번에는 constructor 바깥에서 만든 메소드는 어떨까?
출력 결과는 동일했지만 console에 user1 인스턴스를 출력했을 때 결과는 달랐다.

![](https://velog.velcdn.com/images/reasonz/post/92c0d32c-256c-4931-9e76-5c3c1f4a81b6/image.png)

> 이번에는 class와 생성자함수로 인스턴스를 만들어서 콘솔에 찍어보는 것만 확인했는데
> 추가적으로 class의 상속이라던가, 생성자함수의 prototype 등 다른 부분도 비교해보고 공부해보고자 한다.

<br>

---

> 참고 자료

> [MDN Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

> [MDN new operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new)

> [모던 자바스크립트 new 연산자와 생성자함수](https://ko.javascript.info/constructor-new)

> 18일에 this에 대해 공부하면서 적었던 일반적인 함수나 객체에서의 this가 아닌
> 오늘은 이벤트리스너와 생성자 함수 안에서의 this를 살펴보기로 했다.

<br>

# this

## 1. 생성자 함수(constructor)에서 this

new 키워드를 붙여 함수를 생성자로 사용할 때 `this`는 생성된 그 객체를 가르킨다.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log(`이름은 ${this.name}고 나이는 ${this.age}입니다.`);
    console.log(this);
  };
}

const user1 = new User('아이유', 30);
console.log(user1.say());

const user2 = new User('은하', 26);
console.log(user2.say());
```

생성자 함수를 정의하고 user1로 아이유를, user2로 은하 인스턴스를 생성하고 출력해보았다.
![](https://velog.velcdn.com/images/reasonz/post/21d704f6-e318-426c-a1b5-fb2cd25ca5c6/image.png)
각 인스턴스별 가르키는 `this`가 다르다는 것을 확인할 수 있었다.
아이유 인스턴스의 this는 아이유를, 은하 인스턴스의 this는 은하를 가르키고 있다.
즉, 생성자 함수로 생성한 인스턴스의 `this`는 자기 자신을 가르키도록 생성되는 것이다.

<br>

## 2. 이벤트리스너(eventlistener)에서 this

이벤트 리스너에서의 this 의미가 가장 헷갈리는 부분중 하나였던 것 같다.

```javascript
const btn = document.getElementById('btn');
btn.addEventListener('click', function () {
  console.log(this); // <button>
});
```

<br>

html에 버튼을 하나 만들고 id를 btn이라고 부여한 것에 이벤트리스너를 부착하였다.
클릭시 this를 출력하도록 했는데 결과는 `<button id="btn">버튼</button>`이 출력되었다.
일반 함수에서 `this`는 윈도우를 가르켰었는데 이벤트리스너 안에서 사용한 콜백함수의 `this`는 `e.currentTarget`과 같은 의미를 나타냈다.

<br>

```javascript
const btn = document.getElementById('btn');
btn.addEventListener('click', function (e) {
  console.log(this === e.currentTarget); // true
});
```

<br>

하지만, 다음과 같이 이벤트리스너 안에서 만든 함수는 window 객체를 가르켰다.

<br>

```javascript
btn.addEventListener('click', function (e) {
  btnFc();

  function btnFc() {
    console.log('이벤트리스너 안에서 만든 함수 :', this); // window 객체
  }
});
```

<br>

결과적으로 `this`는 어떤 내부에서 쓰였는지가 가장 중요한 것이다.
일반 함수 안에서는 `window`를, 생성자 함수로 만든 객체의 메소드에서는 자기 자신의 객체를,
이벤트리스너 안에서 사용된 `this`는 `e.currentTarget`을 나타낸다.
(이벤트리스너에서 따로 만든 함수는 일반 함수로 분류되는 듯하다.)

> 추후 bind, apply, call에 대한 메서드도 함께 공부해야겠다.

<br>

---

> 참고 자료

[MDN this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

[Zerocho blog - 자바스크립트의 this는 무엇인가?](https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb)

머스타치 문법을 사용하면 간략한 수식도 활용할 수 있다.

```html
<template>
  <div>
    <h2>5년뒤 : {{ age + 5 }}</h2>
    <h2>10년 뒤 : {{ age + 10 }}</h2>
  </div>
</template>
```

```javascript
data() {
  return {
    age: 30,
  };
},
```

![](https://velog.velcdn.com/images/reasonz/post/7a601d39-7951-4d3b-abbd-0e73a347dc10/image.png)

만약, 15년뒤, 20년뒤 마다 직접 하드코딩을 하는 것은 효율적이지 않다.
<br>

이때 사용할 수 있는 방법은 메서드가 있다.

## 메서드 사용하기 (methods)

```javascript
export default {
  name: 'App',
  components: {},
  data() {
    return {
      age: 30,
    };
  },
  methods: {},
};
```

`methods : {}` methods라는 오브젝트 형태로 선언하여 이 메소즈 프로퍼티 안에 함수를 작성하여 사용할 수 있다.

<br>

```javascript
methods: {
  add(num) {
    return this.age + num;
  },
},
```

add라는 함수를 만들었다. num을 파라미터로 받을 수 있도록 했다.
데이터에 선언한 변수를 add 함수 파라미터와 더한 값을 리턴해보았다. 앞서 하드코딩했던 결과와 동일하게 렌더링된다.

<br>

> #### vue에서는 메소드로 선언한 데이터에 접근하기 위해서는 `this`키워드가 필요하다.

<br>

## methods에 화살표 함수로 작성하면?

스크립트에 에러가 발생하게 된다.

```javascript
methods: {
  add: (num) => {
    return this.age + num;
  },
},
```

<br>

위와 같이 화살표 함수 add 를 만들었다.

![](https://velog.velcdn.com/images/reasonz/post/1077cb1b-d471-4d40-b166-28248edeae2e/image.png)

age라는 this변수에 접근하지 못하는 에러가 발생했다.
console.log로 this를 출력해보면 undefined가 출력되는데 `lexical scope`때문에 이러한 현상이 발생한다.
렉시컬 스코프는 함수에 선언에 따라 스코프가 결정된다. 호출에 영향을 받지 않고 스코프가 고정되어 있다는 의미이다.

this를 쓰면 항상 일반 함수 형태로 작성해야 data에 작성된 변수에 접근할 수 있다.
메서드를 선언할 때는 반드시 일반 함수로 작성해야 한다.
즉, vue에서 methods에 작성한 일반 함수는 this가 객체를 가르키게 되고 화살표 함수를 쓰면 this가 고정된다.

<br>

### 메소드에 여러개의 변수를 넣을 것을 예측하고 있는데 하나만 넣는다면?

```html
<h2>동갑의 10명이 있다면 나이의 총 합 {{ multiply(age, 10) }}</h2>
```

```javascript
multiply(age, num) {
  return age * num;
},
```

multiply라는 메서드가 있고 이 메서드는 age와 나이를 파라미터로 받는다. 이 메서드는 2개의 인자를 받을 것을 예측하고 있는데 만약 하나만 넣는다면 어떻게 될까 ?

```html
<h2>동갑의 10명이 있다면 나이의 총 합 {{ multiply(age) }}</h2>
```

<br>

![](https://velog.velcdn.com/images/reasonz/post/30a8214c-7bba-4e65-a428-247cb8269a5a/image.png)

NaN이 출력된다. 왜냐하면 입력받지 않은 파라미터는 undefined이기 때문에 숫자 \* undefined 연산을 한 것으로 간주되어 Not a Number(NaN) 가 출력되는 것이다.
이런 경우에 함수가 정상적으로 작동되지 않는다. 기본값을 선언하는 default value를 작성해주면 해결할 수 있다.

<br>

### default value

```javascript
multiply(age, num = 10) {
  return age * num;
},
```

2번째 파라미터를 받지 않는 경우에만 10을 기본값으로 사용하여 연산후 값을 리턴하게 된다.
2번째 파라미터가 있는 경우 기본값은 적용되지 않는다.

<br>

## 만약 선언한 메서드를 다른 메서드에서 사용하고 싶다면?

반드시 this를 사용해야 한다.

```javascript
multiply(age, num = 10) {
  return age * num;
},
getTotalScore(num){
  return this.multiply(num, num);
}
```

getTotalScore라는 메서드에서 이전에 만들어 놓은 multiply함수 내부에서 사용하고 싶다면 `this` 키워드를 반드시 붙여서 사용해야 한다.

---

> 참고 자료

[데브리 [ SeSac ] [VUE3 #13] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=N8CMBSttu6A&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=13&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

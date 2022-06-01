> vue 클래스 동적으로 연결하기

## 값이 변경될 때마다 동적으로 class 넣기

```html
<h1 class="line-thought">line-through</h1>
```

정적으로 작성한 클래스에 스타일을 입혀서 넣는 방법도 있지만 값이 변경될 때마다 동적으로 클래스가 바뀌도록 작성하는 방법도 있다.
**v-bind**를 이용하면 된다.

> v-bind는 `:` 약어로도 작성할 수 있다.
> (예시) `v-bind:class`와 `:class`는 같은 의미

```html
<template>
  <div>
    <h1 class="line-thought">line-through</h1>
    <h1 v-bind:class="textDecoration">line-through</h1>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        textDecoration: 'line-thought',
      };
    },
  };
</script>

<style>
  .line-thought {
    text-decoration: line-through;
  }
</style>
```

첫번째 h1태그는 정적으로 클래스를 작성한 것이고
두번째 h1태그는 동적으로 클래스를 부여하도록 v-bind 디렉티브를 사용한 예시이다. (일차원적으로 연결)

```html
<h1 v-bind:class="textDecoration" class="text-red">line-through</h1>
```

v-bind로 추가한 class와 일반 정적 class를 함께 사용할 수도 있다.

### <span style="color : rgb(112, 176, 255)">어떠한 조건</span>에 따라 클래스를 변경시킬 수도 있다.

## Vue에서 클래스에 조건 넣기

### 1. 삼항 연산자 사용하기

`조건 ? 참일때 : 거짓일때`

```html
<h2 :class="isDone ? 'line-thought' : 'highlight'">삼항연산자</h2>
```

```javascript
data() {
  return {
    textDecoration: 'line-thought',
    isDone: true,
  };
},
```

isDone이라는 변수를 만들어 놓고 isDone이 참이면 line-thought 클래스를 추가하고 거짓이면 highlight 클래스를 추가한다.

![](https://velog.velcdn.com/images/reasonz/post/70abc8ad-609b-4b1b-9cae-895ac43b4f3e/image.png)

현재는 true이므로 line-thought 클래스가 추가된 것을 확인할 수 있다.
만약, `isDone` 변수를 false로 바꾼다면 highlight클래스가 추가될 것이다.

<br>

### 2. 오브젝트 형태로 클래스 넣기

```html
<h2 :class="{ highlight: isDone === false }">오브젝트 형태의 동적 클래스</h2>
```

오브젝트 형태로 작성할 때는
`v-bind:class = "{ 클래스명 : 조건 }"` 형태로 작성하면 된다.
오브젝트 형태로 작성하면 이 클래스 뿐만 아니라 다른 클래스도 추가할 수 있다.

```html
<h2 :class="{ highlight: isDone === false, 'text-red': userName === 'IU' }">오브젝트 형태의 동적 클래스</h2>
```

userName이라는 변수를 만들어서 이 변수의 값이 IU이면 text-red라는 클래스를 추가하도록 하였다.
오브젝트를 작성하게 되면 조건에 따라 여러가지 클래스가 부여될 수 있다.

<br>

### 3. 배열 형태로 클래스 넣기

```html
<h2 :class="['highlight', 'line-thought']">배열 형태의 동적 클래스</h2>
```

`['클래스이름']` 형태로 작성하면 조건 없이 클래스를 부여할 수 있다.

```html
<h2
  :class="[isDone ? 'highlight' : 'line-thought', 
     userName === '이지은' ? 'text-red' : 'text-green']"
>
  배열 형태의 동적 클래스
</h2>
```

마찬가지로 배열 형태도 삼항 연산자를 사용해 조건에 따라 클래스를 부여할 수도 있다.

vue.js에서 클래스를 조건에 따라 부여하는 방법을 살펴봤다.

<br>

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #9] 바닐라JS + VUE3 강좌 시리즈
> ](https://www.youtube.com/watch?v=iP_cgrg16tw&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=9&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

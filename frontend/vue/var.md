> 뷰 기초 시작하기
> 기본 vue3 세팅을 완료하고 프로젝트를 오픈하였다.

<br>

# vscode 확장 프로그램

vue 사용을 위해 몇가지 필요한 vscode 확장 프로그램이다.

- Vetur
- Vue3 snippets
- prettier - Code formatter

그 다음에 확장 프로그램 prettier 세팅을 위해 `ctrl + shift + p`를 눌러 setting.ui를 검색한다.
json 코드로 세팅을 해도 되지만 setting ui를 사용해 세팅했다.

1. format on save에 체크가 되어있는지 확인한다.
2. default format에서 조금 전에 설치한 prettier가 설정되어있는지 확인한다.
   이후 app.vue에서 프리티어가 적용되는지 확인해보면 된다.

---

# vue.js에서 변수 사용하기

script 태그 안에 data를 선언해야 한다.

<br>

```html
<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        userName: 'IU',
      };
    },
  };
</script>
```

export default 안에 data를 함수 형태로 작성해주고
return 중괄호 안에 변수 값을 key : value 형태로 작성해주면 된다.

## 작성한 변수를 템플릿에 사용하기

1. 머스타치(Mustache) 문법 사용하기

```html
<template>
  <div>
    <h1>Hello {{ userName }}!</h1>
  </div>
</template>
```

<br>

조금 전에 data에서 만든 변수를 `{{ 변수명 }}` 형태로 작성하면 된다.
변수가 어떤 행위로 인해 변동이 일어나더라도 바로 반영이 된다.

<br>

2. v-text
   `v-text` 라는 속성을 넣어서 사용할 수도 있다.

```html
<template>
  <div>
    <h1>Hello {{ userName }}!</h1>
    <h1 v-text="userName"></h1>
  </div>
</template>
```

vuejs만의 속성 v-text디렉티브를 사용하는 방법이다.
v-text는 안에 들어있는 모든 내용을 바꿔주기 때문에 태그 안에 있는 내용은 `빈 태그`여야 한다. 태그 안에 무언가 작성되어 있으면 에러가 발생한다.

대부분은 `1번 방법인 머스타치 문법을 많이 사용`한다.
v-text에 문자열을 함께 사용하기 위해서는 백틱을 사용하여 템플릿 문법을 사용해야하는 등 번거로움이 있기 때문이다.

문자 뿐만 아니라 숫자도 동일한 변수 선언 방식으로 적용할 수 있다.

<br>

### 객체 변수 사용하기

```html
<template>
  <div>
    <h1>Hello {{ userName }}!</h1>
    <h1 v-text="userName"></h1>
    <p>{{ user.name }} 💙</p>
    <p>나이 : {{ user.age }}</p>
    <p>직업 : {{ user.job }}</p>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        userName: 'IU',
        year: 2022,
        user: {
          name: '아이유',
          job: '가수겸 배우',
          age: 30,
        },
      };
    },
  };
</script>
```

data에서 객체 형식으로 작성한 변수도 동일하게 적용할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/2914a209-0312-4fa1-b66d-ae27a84b2e2a/image.png)

## 태그 자체를 삽입하고 싶다면?

html 태그 변수를 화면에 html 태그로 사용하고 싶은 경우에는 어떻게할 수 있을까?
그냥 data 안에 태그를 작성하면 문자열 형태로 출력된다.

![](https://velog.velcdn.com/images/reasonz/post/d66b465c-5176-4db4-ac22-e9a2cb2dc1a1/image.png)

태그로 변환하고 싶다면 v-html이라는 속성을 사용하면 된다.

```html
<p v-html="button"></p>
```

![](https://velog.velcdn.com/images/reasonz/post/30fb1d47-3c8b-48b1-bcdb-9bad689f9f28/image.png)

## v-html을 사용할 때 주의사항

데이터를 직접 작성해서 사용하는 것이면 상관 없지만,
button이라는 태그를 외부에서 누군가 전달 받은 내용(서버에서 받은)을 html로 연결하게 되면 보안상 심각한 문제가 발생할 수 있기 때문에 믿을 수 있는 경우에만 사용해야 한다.

예를 들어 button2라는 데이터를 하나 만들고 onclick 이벤트를 걸었다.

```html
<template>
  <div>
    <p v-html="button2"></p>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        button2: `<button onclick='alert("hacking!!!")'> click </button>`,
      };
    },
  };
</script>
```

해당 버튼을 클릭하게 되면 onclick 이벤트로 인해 alert 창이 나타나게 된다.

![](https://velog.velcdn.com/images/reasonz/post/1c6879b5-3008-48f0-844d-1b4f13a1ba0a/image.png)

### 이때 alert 창이 아닌 document를 조작하면 어떨까?

웹 사이트를 완전히 망쳐버리는 코드도 작성할 수 있게 된다.
어떠한 스크립트를 통해 중요한 정보를 빼내가는 보안상 치명적인 문제가 될 수 있기 때문에 반드시 신뢰할 수 있는 곳에서 얻은 데이터만 사용할 수 있도록 해야 한다.

---

> 참고 자료

[데브리 [ SeSac ] [VUE3 #7] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=JAdiG-hblIo&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=7&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

디렉티브 비교를 위해 다음과 같이 코드를 작성하였다.

```html
<div>
  <h1>Directives</h1>
  <h2>유저의 이름은 {{ userName }}</h2>
  <button @click="changeName">change name</button>
</div>
```

```javascript
data() {
  return {
    userName: '아이유',
  };
},
  methods: {
    changeName() {
      console.log('name change!');
      this.userName = '이지은';
    },
  },
```

![](https://velog.velcdn.com/images/reasonz/post/182e76ce-6877-4fb9-b656-3b4b189a458a/image.png)
버튼을 클릭하면 유저의 이름이 아이유에서 이지은으로 변경이 되며 콘솔에 'name change!'가 찍힐 것이다.

![](https://velog.velcdn.com/images/reasonz/post/dfc458c1-e4a0-490a-86d9-bbda7fd9e628/image.gif)

# v-once

```html
<h2 v-once>유저의 이름은 {{ userName }}</h2>
```

h2 태그에 v-once 디렉티브를 주었다.
v-once를 적용하면 적용된 태그에 바인딩된 텍스트는 최초 1회만 변동된다.

버튼을 누르면 이벤트는 실행되지만 h2 태그의 userName은 변경되지 않는다.

![](https://velog.velcdn.com/images/reasonz/post/726626b1-1624-4c94-8cf4-464365906e33/image.gif)

버튼 이벤트를 아무리 눌러도 v-once 디렉티브가 있어서 변경되지 않는다.

# v-pre

v-pre를 사용하면 DOM이 컴파일에서 제외되어 그대로 출력된다.

```html
<h2 v-pre>유저의 이름은 {{ userName }}</h2>
```

![](https://velog.velcdn.com/images/reasonz/post/a37ad364-0bf6-4dcf-8d01-7130e4ae4ccd/image.png)

머스타치 문법이 실행되지 않고 문자 그대로 출력되었다.

# 커스텀 디렉티브

디렉티브를 직접 커스텀하여 사용할 수 있다.
directives 라는 오브젝트 형태로 선언하면 된다.

```javascript
<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      userName: '아이유',
    };
  },
  methods: {
    changeName() {
      console.log('name change!');
      this.userName = '이지은';
    },
  },
  directives : {
    // 사용할 디렉티브 이름을 오브젝트로 선언
  },
};
</script>
```

directives안에 직접 디렉티브를 커스텀하여 추가할 수 있다.

```javascript
directives: {
  focus: {
    mounted(elem) {
      elem.focus();
    },
  },
},
```

focus라는 디렉티브를 만들었다. 사용할 때는 v-focus와 같이 `v-커스텀 디렉티브 이름` 형태로 사용하면 된다.
커스텀으로 만든 foucs 디렉티브는 이 디렉티브가 mounted됐을 때 element가 focus되도록 하였다.

```html
<input v-focus type="text" />
```

화면이 렌더링 되면 인풋 창에 포커스가 될 것이다.

![](https://velog.velcdn.com/images/reasonz/post/05f9f551-99d5-4297-b551-9bc1ee4d99f6/image.png)

<br>

## 커스텀 디렉티브로 스타일 넣기

인풋창이 포커스되면 border, background 색을 변경하는 디렉티브를 만들어보았다.

```html
highlight => <input v-highlight type="text" />
```

```javascript
highlight: {
  mounted(elem) {
    elem.oninput = () => {
      elem.style.background = 'pink';
      elem.style.color = '#fff';
    };
  },
},
```

input 박스에 적용할 highlight라는 디렉티브가 마운티드 됐을 때 element를 받아서 oninput 이벤트가 발생하면 배경색과 폰트 컬러를 변경하도록 하였다.

![](https://velog.velcdn.com/images/reasonz/post/be278c5b-e137-4cbc-86e3-65bb871f995c/image.gif)

<br>

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #16] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=WinkWv1vpEg&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=16&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

> vue 파일을 살펴보면 template 태그, script 태그, style태그로 나뉘어 있다.
> 여기서 style 태그안에 일반적으로 평소에 사용하는 css를 작성할 수 있다.
> vue에서는 이 방법 외에도 script를 통해서 스타일을 넣는 방법도 있다.

<br>

## html 속성(attribute)을 사용하여 스타일 넣기

```html
<template>
  <div>
    <h1>Hello world!</h1>
    <h2 id="title">Hello world!</h2>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {};
    },
  };
</script>

<style>
  #title {
    color: skyblue;
    background: gray;
  }
</style>
```

title이라는 아이디를 넣어 static하게 고정하여 스타일을 넣어줄 수도 있지만, 데이터에서 선언한 값을 id와 연결하여 데이터가 변할 때마다 id가 변할 때마다 스타일을 변경할 수도 있다.

# v-bind

v-bind라는 디렉티브를 사용하여 바인딩하면 동적으로 스타일을 변경할 수 있다.

```html
<template>
  <div>
    <h1>Hello world!</h1>
    <h2 id="title">Hello world!</h2>
    <h2 v-bind:id="dynamicId">hello world</h2>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        dynamicId: 'title',
      };
    },
  };
</script>

<style>
  #title {
    color: skyblue;
    background: gray;
  }
</style>
```

v-bind 디렉티브를 사용하고 :속성값="변수이름"을 입력해주었다.

![](https://velog.velcdn.com/images/reasonz/post/44e03d59-f6da-4101-8235-bafa1241a43b/image.png)

앞서 정적으로 적용한 스타일이 동일하게 입혀진 것을 확인할 수 있다.
dynamicId라는 변수를 선언하여 사용했기 때문에 이 변수의 값이 바뀔 때마다 스타일을 변경할 수 있는 것이다.
html 코드를 변경시키지 않아도 id를 가변적으로 가지게 하여 스타일을 변경시킬 수 있다.

## v-bind는 html의 모든 속성에 바인드를 걸어서 사용할 수 있다.

```html
<template>
  <div>
    <h1>Hello world!</h1>
    <h2 id="title">Hello world!</h2>
    <h2 v-bind:id="dynamicId">hello world</h2>
    <a v-bind:href="url">링크</a>
    <img v-bind:src="image.src" v-bind:alt="image.alt" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        dynamicId: 'title',
        url: 'https://naver.com',
        image: {
          src: 'https://placeimg.com/100/100/any',
          alt: 'random image',
        },
      };
    },
  };
</script>
```

a 태그나 img 태그의 속성에도 v-bind 디렉티브를 사용해보았다.
img 태그의 경우에는 안에 들어가는 속성이 공통적으로 img이므로 image라는 오브젝트를 만들어서 바인딩하였다.

![](https://velog.velcdn.com/images/reasonz/post/845514ed-c2cc-42b3-aa19-451f13301ea2/image.png)

## v-bind로 style 넣기

1. style 변수 선언하여 v-bind 디렉티브로 style 바인드하기

```html
<p v-bind:style="pStyle">Hello Vue!</p>
```

```javascript
data() {
    return {
      pStyle: 'color : red; font-size : 36px',
    };
},
```

2. 인라인 방식으로 스타일 넣기

```html
<p v-bind:style="{ color: 'red', fontSize: '50px' }">Hello Vue!</p>
```

v-bind:style = "{}" 형태로 작성할 수도 있다.
{ } 안에 css 속성 이름을 작성할 때는 'font-size'와 같은 형태(케밥 케이스)로 작성할 때는 따옴표를 넣어주어야 한다.
따옴표를 작성하지 않으려면 카멜케이스 형태로 작성해야 한다. (fontSize)

인라인 방식으로 줄 때는 선언한 값들을 변수와 연결해서 설정할 수도 있을 것이다.

```html
<p v-bind:style="{ color: 'red', fontSize: `${basicSize}` }">basic</p>
```

```javascript
data() {
    return {
      basicSize: '12px',
    };
},
```

변수를 넣어서 사용할 때는 백틱(``)을 이용해서 넣어주면 된다.

3. 스크립트로 스타일 넣기

```html
<h1 v-bind:style="titleStyle">Hello world!</h1>
```

```javascript
data() {
  return {
    titleStyle: {
      fontWeight: 'bold',
      fontSize: '50px',
      border: '1px solid black',
    },
  };
},
```

오브젝트 자체를 넣어주는 방법도 있다.

![](https://velog.velcdn.com/images/reasonz/post/37407bec-32cc-4774-978b-5a461f2d4f2e/image.png)

배열로 선언하면 여러가지 스타일을 동시에 적용할 수도 있다.

```html
<h1 v-bind:style="[titleStyle, basicStyle]">Hello world!</h1>
```

```javascript
data() {
  return {
    basicStyle: {
      background: 'yellow',
    },
    titleStyle: {
      fontWeight: 'bold',
      fontSize: '50px',
      border: '1px solid black',
    },
  };
},
```

![](https://velog.velcdn.com/images/reasonz/post/3a4ab9b6-72a1-4de9-a55c-30b2e856fbb0/image.png)

style태그에 작성하는 것이 일반적인 방법이지만 스크립트를 통해 넣는 방법도 있다는 것을 살펴보았다.

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #8] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=Q0g9yKwUad8&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=8&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

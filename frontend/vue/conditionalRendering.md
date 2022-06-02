> 데브리님의 세삭뷰 영상을 보며 정리하였다.

# v-once

내용 변경이 일어나도 1번만 수정이 되는 디렉티브이다.

<br>

```html
<template>
  <div>
    <h1>Hello {{ user.name }}</h1>
    <h1 v-once v-text="user.name"></h1>
    <h1 v-text="user.name"></h1>
  </div>
</template>
```

```javascript

data() {
    return {
      user: {
        name: 'IU',
        age: 30,
        job: 'singer',
      },
    };
  },
```

![](https://velog.velcdn.com/images/reasonz/post/597abf76-91f6-43c1-bb0c-18a92d7bcb46/image.png)

모두 변수의 이름을 변경하면 자동으로 변경된 내용으로 렌더링된다.
user.name의 값을 아이유로 변경해보았다.

![](https://velog.velcdn.com/images/reasonz/post/60d364dd-240a-4a25-996f-e675af7ade75/image.png)

`v-once`는 해당 값이 변화가 일어나더라도 최초 화면에 1회 렌더링되면 변경이 일어나지 않는다.

이것을 실제로 확인하기 위해 input 태그를 추가했다.

```html
<input v-model="user.name" type="text" />
```

input 태그에 value를 연결하기 위해 v-model 디렉티브를 사용했다.

![](https://velog.velcdn.com/images/reasonz/post/45a6665c-6c0f-47c3-bb2d-e47277374aff/image.png)

모든 태그에 user.name으로 연결이 되어있다.
여기에서 input 박스 안의 값을 바꿔보자.

![](https://velog.velcdn.com/images/reasonz/post/34b1c403-ac94-432f-981f-2d4d423b2060/image.gif)

v-once 디렉티브로 작성한 것 외에는 함께 값이 바뀌었다.

<br>

# 조건부 렌더링

자바스크립트에서 조건문을 사용할 때는 if문을 사용한다.
vue.js에서도 마찬가지로 사용할 수 있다.

## v-if

`v-if` 디렉티브를 사용하면 된다.

<br>

```html
<h2 v-if="showName">I love {{ user.name }}</h2>
```

```javascript
data() {
  return {
    showName: true,
    user: {
      name: '아이유',
      age: 30,
      job: 'singer',
    },
  };
},
```

showName이라는 변수에 bool타입 값을 넣고 v-if를 사용하였다. showName이 true인 경우에만 해당 태그가 렌더링 된다.
만약, showName이 false이면 화면에 렌더링 되지 않는다.

<br>

## v-else

`v-else`도 함께 사용할 수 있다.

```html
<h2 v-if="showName">I love {{ user.name }}</h2>
<h2 v-else>안보야줌</h2>
```

v-if의 값이 false일 때 v-else에 작성한 태그가 나타난다.
v-if의 값이 true이면 v-else에 작성한 태그는 렌더링되지 않는다.

<br>

## v-else-if

```html
<h2 v-if="user.age >= 20">성인입니다.</h2>
<h2 v-else-if="user.age > 14 && user.age < 20">청소년입니다.</h2>
<h2 v-else>어린이입니다.</h2>
```

조건을 추가할 때는 `v-else-if`를 사용하여 추가할 수도 있다.

<br>

## 주의 사항

if와 else는 같은 레벨에 이어져서 작성되어야 한다.
만약 if를 갖고있지 않는 다른 태그가 들어가게 되면 오류가 발생한다.

```html
<h2 v-if="showName">I love {{ user.name }}</h2>
<p>중간에 다른 태그 들어가면 오류나용</p>
<!-- ERROR -->
<h2 v-else>안보야줌</h2>
```

<br>

## v-show

v-if와 v-show는 동일한 형태로 작동을 하게 된다.

```html
<h2 v-if="showName">{{ user.name }} IF</h2>
<h2 v-show="showName">{{ user.name }} SHOW</h2>
```

showName이 true일 때 보여주고 false이면 보이지 않는다.

# v-show와 v-if 차이점

```html
<h2 v-if="!showName">{{ user.name }} IF</h2>
<h2 v-show="!showName">{{ user.name }} SHOW</h2>
```

showName을 false로 만들어서 렌더링되지 않게 하였다.
하지만 페이지 검사를 통해 요소 창을 확인해보면 차이점을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/b9dae305-69d9-44f2-8361-d644c70011a7/image.png)

v-if문은 아예 나타나지 않고, v-show는 display none이 적용된다.

어떤 값을 화면에서 보여줘야 할 때 양이 많고 무겁다면 화면에 다시 그려줘야 하고 if문이 성립할 때마다 불러와야하고 성립하지 않으면 없애고 성립하면 다시 보여주고 하는 등 반복함에 있어 퍼포먼스에 문제가 발생할 수 있다.
이때, display : none으로 처리하는 방법(v-show)을 사용하면 된다.

용량이 크지 않고 화면을 주기적으로 바꿔줘야 하거나 새로운 데이터를 계속 받아와야 한다면 v-if를 통해 처리하면 된다.

> 실제 태그는 작성되지만 보이지 않게 하는 것이 v-show이고
> 조건이 성립하지 않으면 태그도 생성하지 않는 것이 v-if이다.

<br>

# 여러개의 조건을 거는 방법

```html
<ul>
  <li>HTML은 재미있나요?</li>
  <li>CSS는 재미있나요?</li>
  <li>Javasciprt는 재미있나요?</li>
  <li>Java는 재미있나요?</li>
  <li>Python은 재미있나요?</li>
  <li>C#은 재미있나요?</li>
</ul>
```

```javascript
data() {
    return {
      question: 'frontend',
    };
},
```

<br>

ul태그 안에 li들은 설문조사 항목이라고 가정했을 때,
변수 question이 frontend이면 HTML, CSS, Javascript에 대한 질문만 보이도록 하고 싶을 때 사용하는 방법이다.

각각의 li 태그에 v-if를 하나하나 걸어줘도 되지만 상당히 비효율적이다. 이때 그룹 지어서 걸어주면 된다.

```html
<template>
  <ul>
    <div v-if="question === 'frontend'">
      <li>HTML은 재미있나요?</li>
      <li>CSS는 재미있나요?</li>
      <li>Javasciprt는 재미있나요?</li>
    </div>
    <div v-else>
      <li>Java는 재미있나요?</li>
      <li>Python은 재미있나요?</li>
      <li>C#은 재미있나요?</li>
    </div>
  </ul>
</template>
```

div 태그를 안에 추가하여 v-if를 작성하는 방법도 있지만
`ul 태그 안에 div 태그가 들어가는 것은 HTML 표준 구조상으로는 맞지 않게 된다.`

<br>

# 의미 없는 태그 template

div 태그 대신에 `template태그`를 사용하여 조건문을 걸어주면 된다.

```html
<ul>
  <template v-if="question === 'frontend'">
    <li>HTML은 재미있나요?</li>
    <li>CSS는 재미있나요?</li>
    <li>Javasciprt는 재미있나요?</li>
  </template>
  <template v-else>
    <li>Java는 재미있나요?</li>
    <li>Python은 재미있나요?</li>
    <li>C#은 재미있나요?</li>
  </template>
</ul>
```

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #10] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=7e4poEEs4UY&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=10&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

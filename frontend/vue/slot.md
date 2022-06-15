# Slot

컴포넌트를 자유자재로 손쉽게 사용할 수 있는 도구이다.
prop이나 data, 이벤트 외에도 실질적인 템플릿 코드 조각을 통째로 보내서 화면에 보여줄 수 있는 유용한 기능이다.

---

먼저, components 폴더 안에 slot 폴더를 만들고
slot폴더 안에 CardView.vue 파일을 만들고 간단하게만 디자인하였다.

```html
<!-- CardView.vue -->
<template>
  <div class="card">Card Design</div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    padding: 1rem;
    margin-bottom: 1rem;
    width: 200px;
  }
</style>
```

## Slot 사용해보기

CardView가 셀프클로징`<CardView/>` 형태로 작성되어 있다면,`<CardView></CardView>` 형태로 변경하고 슬롯으로 보낼 내용을 Cardview 태그 안에 내용으로 작성해주면 된다.

```
<!-- App.vue -->
<template>
  <div>
    <h2>Hello Slot!</h2>
    <CardView> 슬롯으로 </CardView>
  </div>
</template>

<script>
import CardView from './components/slot/CardView.vue';

export default {
  name: 'App',
  components: {
    CardView,
  },
  data() {
    return {};
  },
};
</script>

<style></style>

```

이제 다시 CardView.vue 파일로 가서 `<slot></slot>` 태그를 작성해주면 된다.

```
<template>
  <div class="card">Card Design</div>
  <slot></slot>
</template>
```

![](https://velog.velcdn.com/images/reasonz/post/59d2e7df-d803-4b2b-be9b-fd87bfcbbce4/image.png)

## 다양하게 활용하기

```
<template>
  <div>
    <h2>Hello Slot!</h2>

    <CardView> 슬롯으로 </CardView>

    <CardView>
      <img src="https://placeimg.com/100/50/any" alt="random" />
    </CardView>

    <CardView>
      <ul>
        <li>아이유</li>
        <li>이지은</li>
      </ul>
    </CardView>

  </div>
</template>
```

텍스트 뿐만 아니라 다른 태그들도 함께 보내서 작성할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/bb9f8cbe-dcf8-4a3b-8f86-ea0dc33f7ce2/image.png)

원하는 모든 내용을 컴포넌트 태그 사이에 작성해주면 된다.

> **참고사항** > `<CardView></CardView>` 와 같이 카멜케이스 형태로 작성해도 되고, `<card-view></card-view>`와 같은 형태로 작성해도 똑같이 동작한다.

## 만약, 어떤 내용도 보내지 않을 때 default 값을 보내주려면 ?

```
<!-- App.vue -->
<CardView></CardView>
```

CardView 컴포넌트 태그 안에 어떠한 값도 전달하지 않았을 때 기본 값을 설정하는 방법이다.

```
<!-- CardView.vue -->
<slot> Default Value </slot>

```

slot 태그 안에 기본 값으로 사용할 내용을 작성해주면 된다.

## 여러가지 내용을 보낼때

예를 들면, 3개의 slot을 보낸다고 가정해보자.
먼저 구분을 위해 div 태그를 3개 만들어서 간단하게 폰트 색상만 넣어주었다.

```
<!-- CardView.vue -->
<template>
  <div class="card">
    <div class="card-header"><slot></slot></div>
    <div class="card-body"><slot></slot></div>
    <div class="card-footer"><slot></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  padding: 1rem;
  margin-bottom: 1rem;
  width: 200px;
}

.card-header {
  color: pink;
}

.card-body {
  color: skyblue;
}

.card-footer {
  color: cadetblue;
}
</style>

```

slot이 들어갈 div 태그 안에 slot태그를 작성해주었다.

어떤 내용은 card-header로 넣고 싶고 어떤 내용은 card-body로 넣고 싶고 할 때 적용할 수 있는 방법이다.
이제 다시 App.vue 파일로 넘어가서 코드를 작성해주면 된다.

```
<template>
  <div>
    <h2>Hello Slot!</h2>
    <CardView> 슬롯으로 </CardView>
  </div>
</template>
```

현재는 CardView에 슬롯으로 라는 글자만 보내주고 있기 때문에 모든 slot에 동일한 내용이 출력될 것이다.

![](https://velog.velcdn.com/images/reasonz/post/12f8edfd-b2bd-4df4-8f3d-13b2d79fc055/image.png)

### `.card-header`, `card-body`, `card-footer`에 들어갈 내용을 각각 다르게 보내려면?

```
<template>
  <div>
    <h2>Hello Slot!</h2>
    <CardView>
      <template>
        <h3>Random Image</h3>
      </template>
      <template>
        <img src="https://placeimg.com/200/100/any" alt="" />
      </template>
      <template>
        <small> Thank you </small>
      </template>
    </CardView>
  </div>
</template>
```

각각 나눠서 넣을 내용을 `<template></template>`태그로 감싸서 작성해주면 된다.
현재 3가지 내용을 보낼 것이기 때문에 템플릿 태그도 3번 사용하여 그 안에 내용을 작성해주었다.

하지만 이렇게만 작성하면 아무 것도 나타나지 않는다.
그 이유는 어떤 내용이 어디에 들어갈지 모르기 때문이다.

![](https://velog.velcdn.com/images/reasonz/post/ff37e456-e561-4ba5-aee4-cf7b406fb7fa/image.png)

## slot의 name을 지정해주자

name을 설정하지 않으면 default로 들어가게 된다.

```
<!-- CardView.vue -->
<template>
  <div class="card">
    <div class="card-header"><slot name="header"></slot></div>
    <div class="card-body"><slot name="body"></slot></div>
    <div class="card-footer"><slot name="footer"></slot></div>
  </div>
</template>
```

원하는 내용이 어디에 들어갈지 정하기 위해 CardView.vue 파일에 작성했던 slot 태그 속성으로 name값을 넣어주어 구분해주어야 한다.

# v-slot:name

```
<!-- App.vue -->
<template>
  <div>
    <h2>Hello Slot!</h2>
    <CardView>
      <template v-slot:header>
        <h3>Random Image</h3>
      </template>
      <template v-slot:body>
        <img src="https://placeimg.com/200/100/any" alt="" />
      </template>
      <template v-slot:footer>
        <small> Thank you </small>
      </template>
    </CardView>
  </div>
</template>
```

template 태그안에 `v-slot:작명한 이름`을 적어주면 된다.
이전에 CardView.vue에서 slot 태그의 name 속성으로 작성해준 그 이름이 여기에 들어간다.

![](https://velog.velcdn.com/images/reasonz/post/13a03a03-9b56-4cc0-8205-31aa380d3104/image.png)

원하던 내용대로 전송되어 출력되는 것을 확인할 수 있다.
slot의 name을 지정하지 않고, App.vue에서 `v-slot:default`로 설정해주면 아무것도 설정하지 않은 슬롯으로 데이터가 넘어가게 된다.

slot은 템플릿 자체를 넘겨서 틀만 가지고 내용을 바꿔서 보여주는 컴포넌트를 만들 때 유용하게 사용할 수 있다.

---

> 참고 자료

> [[ SeSac ] [VUE3 #24] 바닐라JS + VUE3 강좌 시리즈 : slot](https://www.youtube.com/watch?v=a-TMNDKSmLI&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=24&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

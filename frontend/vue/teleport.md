# Vue 텔레포트

vue에도 게임에서 순간이동과 같은 기능을 하는 텔레포트라는 기능이 존재한다.
작성하는 모든 코드와 내용은 결국 index.html에 id="app"을 가진 div 태그 안에 모든 내용이 작성되게 된다.

```html
<!-- App.vue -->
<template>
  <div>
    <h1>Hello teleport</h1>
    <h2>contents</h2>
  </div>
</template>
```

App.vue 파일에 위와 같이 h1, h2 태그를 사용하여 간단하게 작성하였다.
화면에 렌더링한 후 작성한 코드를 확인해보면 id="app"을 가진 div의 자식 요소로 들어가게 된다.

![](https://velog.velcdn.com/images/reasonz/post/3c02b84f-dbe3-4a90-b2a5-a23429a85abb/image.png)

```javascript
/* main.js */
createApp(App).mount('#app');
```

이는 `main.js`에서 id가 app인 요소를 vue로 mount 시킨 코드에 의해서 이렇게 작동하게 되는 것이다.

가끔은 이 구조를 벗어나서 외부에 별도의 div 태그를 만든다거나, 화면 안과 별개의 외부 팝업, 사이트와 관련 없는 새로운 창을 만든다던지, 외부에 어떤 기능을 보여줄 수 있는 그런 창이 가끔은 제작해야할 필요가 있다.

그런 내용을 id가 app인 div 태그 안에서 작성해도 되지만, 구조나 스타일 제약에서 자유롭게 작성하고자 할때는 외부로 빼야하는 경우가 발생한다.

## 그렇다면, index.html에 div 태그를 하나 더 만들면 어떨까 ?

```
<!-- index.html -->
<div id="app"></div>
<div id="extra-modal"></div>
```

index.html 파일의 id="app"을 가진 div 태그 아래에 extra-modal이라는 id를 가진 div 태그를 하나 생성하였다.

그리고 정말 간단한 스타일링만 해서 모달 창을 하나 만들고 다시 F12(검사)를 해서 렌더링된 태그 요소를 확인해 보았다.

```
<template>
  <div>
    <h1>Hello teleport</h1>
    <div class="modal">this is modal!</div>
  </div>
</template>

```

![](https://velog.velcdn.com/images/reasonz/post/709d79ee-35dd-4b1a-b0b9-19e9c33777c5/image.png)

div태그를 하나 더 만든 extra-modal 아이디 값을 가진 div 태그 안에 들어가는 것이 아닌, id 값이 app인 태그 안의 자식 요소로 들어간다.

결과적으로 vue에서는 index.html의 id가 app을 가진 div 태그 안으로 들어가게 되는데, 스타일 요소를 위해 밖으로 빼려면 어떻게 해야 할까?

# teleport를 사용하자.

앞에서 겪은 문제를 해결하기 위한 방법으로 teleport를 사용할 수 있다.
vue에서 teleport를 사용하기 위해서는 `<teleport></teleport>` 태그를 사용하면 된다.
teleport 태그를 사용할 때는 to 속성을 사용해야 한다.
to 속성의 값으로는 index.html에서 작성한 div태그의 id값을 넘겨주면 된다.
to 안에는 id값 외에도 데이터 선택자나, 클래스 선택자를 넣어도 된다.

```
<template>
  <div>
    <h1>Hello teleport</h1>
    <teleport to="#extra-modal">
      <div class="modal">this is modal!</div>
    </teleport>
  </div>
</template>
```

index.html에서 새로 만든 div 태그의 id 값이 extra-modal 였으므로 `to="#extra-modal"` 이라고 작성해주면 된다.

다시 요소 태그들을 확인해보면 extra-modal 아이디를 가진 div 태그 안에 modal이 작성된 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/34975be1-6a4d-4d39-9329-acfbc2d4a137/image.png)

html 구조를 보면 extra-modal이라는 div 태그 안으로 작성한 modal 코드가 teleport 된 것이다.
이것은 id="app" 에만 국한되어 사용해야 하는 코드를 app 밖으로 뺄 수 있는 유용한 기능이다.

모달 창에 스타일링을 조금 더 추가하고 텔레포트의 기능을 조금 더 살펴보자.

```
<!-- App.vue -->
<style scoped>
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

# teleport 속성

첫번째로 살펴볼 속성은 `:disabled` 이다.

```
<template>
  <div>
    <h1>Hello teleport</h1>
    <teleport to="#extra-modal" :disabled="true">
      <div class="modal">this is modal!</div>
    </teleport>
  </div>
</template>
```

teleport 태그 안에 `:disabled`의 값을 `true`로 설정하게 되면 다음과 같이 id 값이 app인 div태그의 자식으로 들어가는 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/53fce0fc-a621-450c-83e2-a726afdd29b7/image.png)

`:disabled`의 값을 `false`로 바꾸면 다시 extra-modal이라는 아이디를 가진 div 태그의 자식으로 이동할 것이다.

```
<!-- App.vue -->
<template>
  <div>
    <h1>Hello teleport</h1>
    <teleport to="#extra-modal" :disabled="false">
      <div class="modal">this is modal!</div>
    </teleport>
  </div>
</template>
```

![](https://velog.velcdn.com/images/reasonz/post/57c51c58-7d3b-4760-9d02-98c0856e50c5/image.png)

app.vue에 데이터를 하나 설정해서 boolean 값 변수를 하나 만든 후, :disabled 속성의 값으로 주고 모달창의 버튼을 만들어서 이 버튼을 클릭할 때 :disabled 값을 반대로 변경하는 코드를 작성해보았다.

```
<!-- App.vue -->
<template>
  <div>
    <h1>Hello teleport</h1>
    <teleport to="#extra-modal" :disabled="isTeleport">
      <div class="modal">
        this is modal!
        <button @click="isTeleport = !isTeleport">teleport toggle</button>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      isTeleport: true,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

```

버튼을 클릭할 때마다 isTeleport의 값이 true 또는 false로 변경된다.

![](https://velog.velcdn.com/images/reasonz/post/cd55bd4e-6797-45bd-a1e0-8de6d98078dc/image.gif)

결과물을 살펴보면 false일 때는 id가 extra-modal의 div의 자식으로 들어가고
true일 때는 id가 app인 div의 자식으로 들어간다.
이런 식으로 옮겼다가 뺐다가도 가능하다.

#

modal2라는 이름을 넣은 div 태그를 하나 더 작성하였다.

```
<template>
  <div>
    <h1>Hello teleport</h1>
    <teleport to="#extra-modal" :disabled="isTeleport">
      <div class="modal">
        this is modal!
        <button @click="isTeleport = !isTeleport">teleport toggle</button>
      </div>
    </teleport>
    <div class="modal2">this is modal2</div>
  </div>
</template>
```

modal2 라는 것도 extra-model id가 있는 곳으로 이동 시키려면, 이전과 마찬가지로 teleport 태그를 작성하고 그 안에 넣어주면 될 것이다.
v-if를 사용해서 실제 모달창 처럼 보였다가 안보였다가 처리를 할 수도 있다.

```
 <teleport to="#extra-modal">
 	<div class="modal2">this is modal2</div>
 </teleport>
```

> vue에서 기본적으로 코드를 작성하면 id="app"을 가진 div 태그 안에 모든 코드가 작성된다.
> 텔레포트를 사용하면 다른 태그로 작성한 코드를 순간이동 시킬 수 있다.

---

> 참고 자료

> [[ SeSac ] [VUE3 #25] 바닐라JS + VUE3 강좌 시리즈 : teleport](https://www.youtube.com/watch?v=Mi2TfYu0XuM&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

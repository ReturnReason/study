# 부모와 자식 컴포넌트간 이벤트를 전달하고 전달받기

DetailView.vue 파일을 컴퍼넌트 폴더에 하나 만들었다.

```html
<!-- DetailView.vue -->
<template>
  <div class="wrapper">
    <div class="container">
      <h2>Detail Page</h2>
      <button>close</button>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .wrapper {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    background: #fff;
    width: 60%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
```

간단하게 모달창을 디자인했다.
이제 App.vue 파일에서 방금 만든 DetailView 를 import하고 등록해서 사용하면 된다.

![](https://velog.velcdn.com/images/reasonz/post/c20422e9-c5f8-4b7f-97e3-41ee92672df9/image.png)

그리고 모달 창이 처음부터 보여지면 안되므로 v-if 디렉티브를 사용하여 displayDetail 변수 값이 true일 때만 보이도록 하였다.

```javascript
/* App.vue */
data() {
    return {
      displayDetail: false,
    };
},
```

```html
<DetailView v-if="displayDetail" />
```

그리고 button을 하나 만들어서 클릭했을 때 displayDetail 변수를 true로 만들어 주도록 작성했다.

```html
<!-- App.vue -->
<template>
  <div>
    <h1>Hello!</h1>
    <DetailView v-if="displayDetail" />
    <button @click="displayDetail = true">show detail</button>
  </div>
</template>
```

![](https://velog.velcdn.com/images/reasonz/post/5a92710f-ae24-48ff-ab52-6dda31718b17/image.gif)

show detail 버튼을 누르면 모달창이 보여진다.
현재는 보여지기만 하고 close 버튼에는 이벤트를 달아놓지 않았기 때문에 닫히지는 않는다.
레이어 팝업 안에 close 버튼을 누르면 닫히기 위해서는 displayDetail의 값을 false로 만들어 주면 된다.

## 부모 데이터를 prop으로 자식에게 데이터를 보내서 변경하면 안될까?

prop으로 보낸 값은 아쉽게도 값을 재정의 할 수 없다.
읽기 전용이기 때문에 prop을 보낸 값을 변경하고자 하면 에러가 발생한다.

자식 컴포넌트에서 값을 변화하려면 이벤트를 부모에게 전송하면 된다.

# 커스텀 이벤트 ($emit)

```html
<button @click="closeDetail">close</button>
```

```javascript
methods: {
  closeDetail() {
    this.$emit('closeDetail');
  },
},
```

자식 컴포넌트가 부모에 있는 값을 변경하고자 한다면 부모에게 메시지를 전달해 부모 컴포넌트가 변경할 수 있도록 해야 한다.
`$emit('보낼메시지')` 를 보내주면 된다.
위와 같이 메소드에 따로 정의해서 사용해도 되고
`<button @click="$emit('closeDetail')">close</button> `와 같이 인라인 속성으로 작성해도 된다.
대신, 메소드로 정의할 때는 this 키워드를 붙여야 한다.

이제 부모 컴포넌트에서 자식이 보낸 메시지를 받아야 한다.

```
<DetailView v-if="displayDetail" @closeDetail="displayDetail = false" />

```

자식 컴포넌트에서 작성했던 메시지인 closeDetail을 이벤트 디렉티브를 사용할 때처럼 동일하게 사용하면 된다.
`@자식이 보낸 이름 = "변경할 내용"` 형태로 작성하면 된다.
마찬가지로 displayDetail의 값을 인라인 속성에서 바로 변경해줘도 되고 메소드로 작성해서 값을 변경하도록 해도 된다.

![](https://velog.velcdn.com/images/reasonz/post/e373a8b6-1df7-4c3b-8d97-ab7bcd0e1694/image.gif)

이제 close 버튼도 제대로 동작한다.

## 자식이 부모에게 데이터 보내기

$emit을 사용해서 자식이 가진 데이터를 부모가 받아볼 수도 있다.

```html
<!-- DetailView.vue -->
<template>
  <div class="wrapper">
    <div class="container">
      <h2>Detail Page</h2>
      <button @click="closeDetail($emit, 'closeDetail')">close</button>
      <input type="text" v-model="username" />
      <button @click="sendData">send data</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailView',
    props: {},
    methods: {
      closeDetail() {
        this.$emit('closeDetail');
      },
      sendData() {
        this.$emit('sendData', this.username);
      },
    },
    data() {
      return {
        username: '',
      };
    },
  };
</script>
```

만든 모달창에 input과 button 태그를 만들어 주고
username이라는 변수를 만들어서 input에 v-model로 연결해 주었다.

```javascript
sendData() {
  this.$emit('sendData', this.username);
  // 전송할 메시지, 전송할 데이터
},
```

그리고 버튼을 클릭하면 sendData 메소드가 실행되어 부모에게 sendData라는 이름으로 DetailView 컴포넌트가 가지고 있는 username 변수가 전송된다.

부모는 전송 받은 메시지를 사용하면 전송된 데이터를 확인해볼 수 있다.

```html
<!-- App.vue -->
<DetailView v-if="displayDetail" @closeDetail="displayDetail = false" @sendData="showData" />
```

마찬가지로 커스텀 이벤트 형식으로 작성해주고
받아온 데이터를 확인해보기 위해 App.vue에 showData라는 메소드를 만들었다.

```javascript
methods: {
  showData(data) {
    console.log(data, 'data sent!');
  },
},
```

이제 모달 창에서 input 태그 아래에 있는 버튼을 누르면 input에 있는 값(username)이 부모 컴포넌트에게 전송될 것이다.

![](https://velog.velcdn.com/images/reasonz/post/657a9fca-68bd-4ae7-9ec2-98d09615d7a7/image.gif)

오늘은 컴포넌트간 데이터를 전달받는 방법을 공부해 보았다.

---

> 참고 자료

> [[ SeSac ] [VUE3 #22] 바닐라JS + VUE3 강좌 시리즈 : component 4](https://www.youtube.com/watch?v=cs-M5m5-ASo&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=22&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

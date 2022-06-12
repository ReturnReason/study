[[2022.06.11] Vue component - 컴포넌트 만들고 불러오기, props 사용 및 주의사항]()

이전 포스트에서 사용했던 코드를 이어서 작성하였다.

## props 복습

어떤 데이터를 넘겼을 때 자식 컴포넌트에서 반드시 해당 props를 받아서 사용해야 하는 경우에는 문제가 발생할 수 있으므로 props의 default 값을 작성해주는 것이 좋다.

## 숫자 데이터를 props로 사용하기

```
<GreetingUser :username="username" :numberOfVisit="numberOfVisit"/>

```

```javascript
data() {
  return {
    username: '아이유',
    numberOfVisit: 25,
  };
},
```

props를 보낼 때 `:작명="데이터"` 형태로 작성하면 된다.
가급적 명칭을 통일해서 동일하게 작성해주는 경우가 많다.
numerOfVisit라는 데이터 변수를 만들고 GreetingUser 컴포넌트에 props로 전달하였다.

이제 GreetingUser.vue 파일로 이동했다.

```html
<template>
  <div>
    <h2>Hello {{ username }}!</h2>
    <h3>오늘이 {{ numberOfVisit }} 번째 방문입니다.</h3>
  </div>
</template>
```

```javascript
export default {
  name: 'GreetingUser',
  props: {
    username: {
      type: String,
      default: 'User!',
    },
    numberOfVisit: Number,
  },
};
```

numberOfVisit를 props에 등록하고 데이터 타입을 작성해주었다.

![](https://velog.velcdn.com/images/reasonz/post/ea892d15-c947-478b-aea1-a784871d716a/image.png)

### 그런데, 여기서 numberOfVisit가 정의되지 않은 상태로 온다면 어떻게 될까?

예를 들면, App.vue에 있는 numberOfVisit의 값이 `undefined`라고 한다면 선언되지 않아 빈 값으로 렌더링 된다.

```javascript
/* App.vue */
data() {
  return {
    username: '아이유',
    numberOfVisit: undefined,
  };
},

```

![](https://velog.velcdn.com/images/reasonz/post/6a4190b3-d9c5-4974-9b69-2039828f550e/image.png)

마치 오류로 보이는 형태로 나타날 수 있기 때문에 props의 default 값을 설정하여 이러한 문제를 해결할 수 있다.

```html
<!-- GreetingUser.vue -->
<script>
  export default {
    name: 'GreetingUser',
    props: {
      username: {
        type: String,
        default: 'User!',
      },
      numberOfVisit: {
        type: Number,
        default: 0,
      },
    },
  };
</script>
```

![](https://velog.velcdn.com/images/reasonz/post/bfc94edf-d64a-4c07-a5e6-b461d03ffd6d/image.png)

우선은 값이 정의되지 않을 수 있으므로 default 값을 설정해주면 앞서 발생한 문제가 해결된다. 이후 값이 업데이트 되면 숫자가 정상적으로 출력될 것이다.

# 오브젝트를 props로 보내기

```javascript
/* App.vue */
data() {
  return {
    username: '아이유',
    numberOfVisit: undefined,
    siteInfo: {
      name: 'vue practice',
      teacher: 'scalper',
      subject: 'frontend',
    },
  };
},

```

siteInfo라는 오브젝트를 만들었다.
사용해야 하는 데이터마다 하나씩 보내면 상당히 양이 많아지고 코드가 길어지기 때문에 하나의 오브젝트 형태로 작성하여 오브젝트만 넘겨주면 효율적으로 작성할 수 있다.

```html
<GreetingUser :username="username" :numberOfVisit="numberOfVisit" :siteInfo="siteInfo" />
```

동일한 방식으로 props를 GreetingUser에 넘겨주었다.

마찬가지로 GreetingUser.vue에 props를 동록하고 사용하면 된다.
오브젝트 데이터를 받아와 사용할 때는 오브젝트의 프로퍼티에 접근하는 방식으로 작성하면 된다.

```javascript
/* GreetingUser.vue */
props: {
    username: {
      type: String,
      default: 'User!',
    },
    numberOfVisit: {
      type: Number,
      default: 0,
    },
    siteInfo: Object,
},
```

```html
<!-- GreetingUser.vue -->
<h3>사이트 이름은 {{ siteInfo.name }} 입니다.</h3>
```

### siteInfo.name 라는 프로퍼티가 없다면?

현재는 App.vue에서 GreetingUser.vue로 보내고 있는데 만약 stieInfo가 undefined라면?

```javascript
data() {
  return {
    username: '아이유',
    numberOfVisit: undefined,
    siteInfo: undefined,
  };
},
```

siteInfo의 값을 undefined로 임의로 변경해보았다.

화면 자체가 렌더링 되지 않는다. F12를 눌러서 발생한 오류를 확인해보면 `Uncaught TypeError: Cannot read properties of undefined (reading 'name')` 에러가 발생했음을 알 수 있다.

마찬가지로 이러한 현상이 발생하지 않도록 GreetingUser.vue 파일로 가서 props의 default 값을 설정해주면 된다.
다만, 차이점은 이전에는 default를 오브젝트형으로 작성했다면,

### 오브젝트, 배열 형태의 props는 반드시 어떤 값을 return해주는 함수형태로 작성해야 한다.

```javascript
props: {
    username: {
      type: String,
      default: 'User!',
    },
    numberOfVisit: {
      type: Number,
      default: 0,
    },
    siteInfo: {
      type: Object,
      default: () => {
        return { name: '', teacher: '' };
      },
    },
},
```

return 값에 { }로 빈 값을 넣어줘도 되고
각 프로퍼티의 이름을 넣어 기본 값을 작성해주어도 된다.

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #20] 바닐라JS + VUE3 강좌 시리즈 : component 2](https://www.youtube.com/watch?v=iBV8RoJKnYs&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=20&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

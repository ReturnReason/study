# 컴포넌트

컴포넌트는 일반적인 웹 화면을 header, sidebar, content, footer 등으로 나누었다고 가정했을 때, 나눠져 있는 섹션들을 다른 파일로 구분해서 따로 관리하는 것을 의미한다.
한 화면을 만들기 위해 모든 내용을 다 포함하고 있는 것이 아닌, 각각의 화면을 분리하여 필요할 때 같이 사용하는 것이다.

자주 사용되는 내용을 다른 파일로 따로 빼고 필요할 때만 그 파일을 불러와서 사용할 수 있는 것이 컴포넌트이다.

![](https://velog.velcdn.com/images/reasonz/post/d4c48270-7ea5-42c8-a1aa-8d0019ebaac1/image.png)

vue 폴더를 살펴보면 Vue cli에 의해서 components라는 폴더가 생성되어 있다.

## 컴포넌트 만들기 규칙

1. 의미있는 네이밍 만들기
2. 하나의 단어가 아닌 2가지 단어가 조합된 형태로 작성하는 것이 좋다.
   (예 : Greeting.vue (X) - GreetingUser.vue(O))
3. 소문자가 아니어야 한다. (카멜 케이스로 작성)

### 파일명을 2단어 이상으로 작성해야 하는 이유?

1단어로 작성하게 되면 나중에 HTML 태그와 혼동이 일어날 수도 있고 Vue의 스타일 가이드에서는 2가지 단어를 조합해서 만들라고 제안을 하고 있다.

## vue 파일 만들기

components 폴더 안에 GreetingUser.vue라는 파일을 하나 만들었다.
vue파일을 만들고 기본 태그들을 작성해주면 된다.
style 태그 안에 scoped라는 속성을 작성할 수도 있다. 이 scoped는 각 vue 파일 마다 스타일을 적용할 수 있는데 각각의 파일이 나중에 외부 파일과 컴파일이 되면서 CSS가 섞이는 경우 해당 파일에만 적용해야 하는 스타일이 다른 파일에 적용되지 않도록 하는 속성이다.

```html
<template>
  <div>
    <h2>Hello User!</h2>
  </div>
</template>

<script>
  export default {
    name: 'GreetingUser',
  };
</script>

<style scoped>
  /* 이 파일에만 적용되는 스타일 */
</style>
```

export default 안에 컴포넌트의 name 속성을 작성하는 것이 좋다.
나중에 디버깅을 할 때 name을 통해 확인할 수도 있다.

파일을 저장하더라도 화면에 Hello User가 출력이 되지 않는데 그 이유는 App.vue에서 `GreetingUser`를 불러와서 보여주는 코드가 작성되지 않았기 때문이다.

## 컴포넌트 불러오기

App.vue에서 GreetingUser 컴포넌트를 불러오는 방법이다.

```javascript
import GreetingUser from './components/GreetingUser.vue';
```

스크립트 태그 안에 최상단에 `import '컴포넌트 이름' from '경로';`를 작성하면 된다.
컴포넌트 이름은 원하는 것으로 작성해도 되지만 대문자 카멜케이스 규칙을 지켜주는 것이 좋다.
vue파일인 경우 확장자 .vue를 생략해도 된다.

```html
<template>
  <div>
    <GreetingUser />
  </div>
</template>
```

이제 템플릿 태그 안에 import한 GreetingUser를 태그처럼 작성해줄 수 있다. 현재 import만 해온 상태로 컴포넌트 태그를 사용했기 때문에 `에러`가 발생할 것이다. 템플릿 태그안에서 import한 컴포넌트를 사용하기 위해서는 등록이 필요하다.

## 컴포넌트 등록하기

import 후 등록하고 사용해야 한다.

```javascript
export default {
  name: 'App',
  components: {
    GreetingUser,
  },
  data() {
    return {};
  },
};
```

components 오브젝트 안에 `key : value` 형태로 import한 컴포넌트를 등록해주면 된다.
GreetingUser : GreetingUser 형태로 작성할 수 있는데 key와 value 명칭이 동일하면 하나로 생략해서 작성할 수 있다. (ES6 문법)

이제 저장하고 확인해보면 Hello User라는 문장이 화면에 나타난다.

![](https://velog.velcdn.com/images/reasonz/post/b32244ee-505c-46a7-a87a-3c787669d50a/image.png)

작성한 컴포넌트가 연결이 되었다.
이제 GreetingUser 컴포넌트가 여러개 필요할 때마다 긴 코드를 직접 계속 작성할 필요가 없게 된다.

## 컴포넌트 재사용

```html
<template>
  <div>
    <GreetingUser />
    <GreetingUser />
    <GreetingUser />
    <GreetingUser />
  </div>
</template>
```

동일한 컴포넌트를 여러번 사용할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/5148628f-fd0d-43cc-9c02-afd097a30034/image.png)

현재는 Hello User!라는 문장만 여러번 출력되고 있는데 각 컴포넌트마다 Hello `이름`! 과 같은 형식으로 보여주고 싶은 경우도 있을 것이다.
이럴때는 컴포넌트를 부르는 쪽에서 컴포넌트로 데이터를 보내고 컴포넌트는 받은 데이터를 보여주면 된다.

## 컴포넌트로 데이터(prop) 넘기기

```html
<GreetingUser username="아이유" />
```

컴포넌트 태그 안에 속성처럼 작성한 `username`은 넘겨주고자 하는 데이터(prop)이 된다.
`데이터이름="보낼 데이터"` 형태로 작성하면 된다.

이제 GreetingUser.vue 파일로 가서 props 라는 오브젝트 안에 받아온 `데이터명 : 데이터타입`을 작성해주면 된다.

```html
<script>
  export default {
    name: 'GreetingUser',
    props: {
      username: String,
    },
  };
</script>
```

위처럼 등록을 했으면 이제 머스타치 문법을 사용해서 넘겨받은 데이터(prop)을 사용할 수 있게 된다.

```html
<template>
  <div>
    <h2>Hello {{ username }}!</h2>
  </div>
</template>
```

![](https://velog.velcdn.com/images/reasonz/post/e4a09137-854e-4297-ad76-9f470f8676af/image.png)

App.vue에 작성한 GreetingUser 컴포넌트 중에서 속성 값을 넣은 첫번째 컴포넌트에만 이름이 함께 출력되는 것을 확인할 수 있다.

# prop 주의사항

넘겨받은 prop은 자식 컴포넌트에서 prop의 값을 직접적으로 변경해서는 안된다.

버튼을 클릭하면 유저의 이름이 변경되는 메서드를 작성했다.

```html
<template>
  <div>
    <GreetingUser :username="username" />
    <GreetingUser />
    <GreetingUser />
    <GreetingUser />
    <button @click="changeName">change</button>
  </div>
</template>

<script>
  import GreetingUser from './components/GreetingUser.vue';

  export default {
    name: 'App',
    components: {
      GreetingUser,
    },
    data() {
      return {
        username: '아이유',
      };
    },
    methods: {
      changeName() {
        this.username = '지은';
      },
    },
  };
</script>
```

![](https://velog.velcdn.com/images/reasonz/post/e5f31863-bf32-4719-b369-2790ff1ada62/image.gif)

버튼을 클릭하면 username이 아이유에서 지은으로 변경된다.
바뀐 값이 그대로 prop을 통해 GreetingUser 컴포넌트로 넘어간 것이다.
넘겨주는 쪽에서는 변화시킬 수 있지만 자식 컴포넌트 안에서는 받은 props 값을 변경할 수 없다.
만약, 변경하려고 한다면 에러가 발생한다.

## 컴포넌트마다 각각 다른 데이터를 보내고 싶다면?

컴포넌트에 prop을 사용할 때는 `:`을 사용하면 data나 computed에서 선언한 데이터만 넘겨줄 수 있다.
예시 ) `:username`로 작성하는 경우 username라는 data에 변수가 있거나 computed에 있어야 함. 그렇지 않은 경우엔 `:`을 적지 않은 `username`와 같은 형태로 작성.

```html
<template>
  <div>
    <GreetingUser :username="username" />
    <GreetingUser username="그냥문자열넘길랭" />
    <GreetingUser username="은하" />
    <GreetingUser username="희진" />
    <GreetingUser />
    <button @click="changeName">change</button>
  </div>
</template>
```

마지막 컴포넌트를 제외하고 username이라는 props를 사용했다.

![](https://velog.velcdn.com/images/reasonz/post/e516cfdc-7de1-42aa-8bd4-c3cbfc145ede/image.png)

각각 보낸 prop에 따라 출력이 되었다.
마지막 GreetingUser 컴포넌트에는 username prop을 보내지 않았기 때문에 `Hello!`만 출력이 된 것을 확인할 수 있다.
컴포넌트가 prop을 넘겨받았을 때 props의 값이 없는 경우 기본값을 선언할 수 있다.

## props 기본값(default) 설정하기

다시 GreetingUser.vue 파일로 이동했다.

```html
<script>
  export default {
    name: 'GreetingUser',
    props: {
      username: {
        type: String,
        default: 'User!',
      },
    },
  };
</script>
```

기존에 props 오브젝트에 작성한 `username : String`값을 `username : {}`와 같이 오브젝트 형태로 변경해주고
`type : 데이터 타입`, `default : props 값이 없을 때 사용할 기본값`을 작성해주면 된다.

![](https://velog.velcdn.com/images/reasonz/post/aef9ee83-d8b0-464f-a6fd-477823ea60cc/image.png)

prop을 넘기지 않은 마지막 컴포넌트에는 기본 값이 적용되어 출력되는 것을 확인할 수 있다.

---

> 참고 자료

[데브리 [ SeSac ] [VUE3 #19] 바닐라JS + VUE3 강좌 시리즈 : component](https://www.youtube.com/watch?v=PZ2w58_8mEc&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=19&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

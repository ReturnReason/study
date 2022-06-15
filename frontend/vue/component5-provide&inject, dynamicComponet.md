# Vue의 자식의 자식의 자식 컴포넌트에 데이터 보내기

보통 부모에서 자식 컴포넌트로 데이터를 보낼 때 props를 사용한다. 하지만 중첩된 관계(자식의 자식의 자식.. 과 같은)라면 번거롭고 복잡해진다.

![](https://velog.velcdn.com/images/reasonz/post/ae42a20f-41c2-4e0b-9dff-2eff72035e66/image.png)

components 폴더 안에 provide-inject 라는 폴더를 만들고
CompLevel1, 2, 3 세가지 vue 파일을 만들었다.

레벨1 파일의 자식은 레벨2가 되고,
레벨2 파일의 자식은 레벨3가 되도록 작성할 것이다.

```
<!-- CompLevel1.vue -->
<template>
  <h1>CompLevel 1</h1>
  <CompLevel2 />
</template>

<script>
import CompLevel2 from './CompLevel2.vue';

export default {
  name: 'CompLevel1',
  components: {
    CompLevel2,
  },
};
</script>
```

```
<!-- CompLevel2.vue -->
<template>
  <h2>CompLevel 2</h2>
  <CompLevel3 />
</template>

<script>
import CompLevel3 from './CompLevel3.vue';
export default {
  name: 'CompLevel2',
  components: {
    CompLevel3,
  },
};
</script>
```

```
<template>
  <h2>CompLevel3</h2>
</template>

<script>
export default {
  name: 'CompLevel3',
};
</script>

<style></style>

```

각각의 CompLevel 1~3까지의 뷰 파일 작성이 완료되었으면 App.vue에서 CompLevel1 파일을 임포트 한 후 등록하고 사용해보았다.

저장하고 확인해 보면 CompLevel1~3 파일이 모두 호출이 된다.

![](https://velog.velcdn.com/images/reasonz/post/c1a5e2ff-b20c-431c-8c4e-1c8adc15df75/image.png)

현재 레벨1이 레벨2를 자식으로, 레벨2가 레벨3을 자식으로 가지고 있다.

```javascript
/* App.vue */
data() {
  return {
    username: '아이유',
  };
},
```

만약에 App.vue에서 username이라는 변수 데이터를 레벨3에서 보여주려면 어떻게 처리해야 할까 ?

### props를 하나씩 보내는 방법

불편하지만 한 계단씩 내려보내는 방법이 있다.
App.vue에서 CompLevel1 -> 2 -> 3 과 같은 식으로 한 계단씩 보내서 prop을 전달할 수는 있다.

```
<!-- App.vue -->
<CompLevel1 :username="username" />

```

```
<!-- CompLevel1 -->
<CompLevel2 :username="username" />
```

와 같은 방식으로 계속 props를 보내주면 된다.
자식의 뎁스가 깊을 수록 매우 귀찮고 불편해진다.

# Provide와 inject

이전 props 보내는 방법이 매우 귀찮고 불편하기 때문에 해결할 수 있는 방법으로 Provide와 Inject가 있다.

provide는 데이터를 넘겨주는 쪽에서 선언을 하면 된다.
inject는 데이터를 넘겨 받을 곳에서 사용한다.

현재는 App.vue에 있는 username이라는 데이터를 보내고 싶기 때문에 App.vue에 provide를 작성해주면 된다.

```javascript
data() {
  return {
    username: '아이유',
  };
},
provide() {
  return {
    name: this.username,
  };
},
```

provide는 data와 마찬가지로 함수 형태로 작성하여
return 값으로 오브젝트를 보내주면 된다.
이때 provide에서 보낼 data의 변수 이름과는 다르게 작성하는 것이 좋다.
provide에 name이라는 이름으로 username을 보내도록 작성하였다.

```javascript
/* CompLevel3.vue */
export default {
  name: 'CompLevel3',
  props: {
    username: String,
  },
  inject: ['name'],
};
```

App.vue의 데이터를 사용할 CompLevel3에서
inject를 배열 형태로 선언하여 작성해주면 된다.
App.vue에서 보낸 provide의 이름과 동일하게 작성한 후 사용하면 된다.

```html
<!-- CompLevel3.vue -->
<h3>passed Data from App 🎈 {{ name }}</h3>
```

![](https://velog.velcdn.com/images/reasonz/post/0dc22d50-0ba0-42a5-b0de-e615d1cf01b6/image.png)

Vuex와 같은 글로벌 스테이트 매니지먼트 시스템 사용을 더 많이 하게 될 것이지만 이런 내용을 알고 가는 것이 좋다.

---

# 다이나믹 컴포넌트

먼저, 다이나믹 컴포넌트를 만들어보기 전에 다이나믹 컴포넌트로 개선할 수 있는 코드를 먼저 작성해보았다.

```
<!-- App.vue -->
<template>
  <div>
    <h1>App.vue</h1>
    <button>Menu1</button>
    <button>Menu2</button>
    <button>Menu3</button>
  </div>
</template>
```

App.vue에 위와 같이 작성하고 컴포넌츠 폴더 안에 tabItems 폴더와 Menu 파일을 만들었다.

![](https://velog.velcdn.com/images/reasonz/post/6509dc20-eb2b-4d9f-b97e-352587b8bb12/image.png)

각 버튼을 클릭할 때마다 각각의 메뉴에 맞는 컴포넌트가 나오도록 할 것이다.

기본적으로 각 컴포넌트를 import 해서 등록한 후 v-if 디렉티브를 사용하면 해결할수 있을 것이다.

```
<!-- App.vue -->
<template>
  <div>
    <h1>App.vue</h1>
    <button @click="activeTab = 'TabMenu1'">Menu1</button>
    <button @click="activeTab = 'TabMenu2'">Menu2</button>
    <button @click="activeTab = 'TabMenu3'">Menu3</button>
    <TabMenu1 v-if="activeTab === 'TabMenu1'" />
    <TabMenu2 v-if="activeTab === 'TabMenu2'" />
    <TabMenu3 v-if="activeTab === 'TabMenu3'" />
  </div>
</template>

<script>
import TabMenu1 from './components/tabItems/TabMenu1.vue';
import TabMenu2 from './components/tabItems/TabMenu2.vue';
import TabMenu3 from './components/tabItems/TabMenu3.vue';

export default {
  name: 'App',
  components: {
    TabMenu1,
    TabMenu2,
    TabMenu3,
  },
  data() {
    return {
      activeTab: 'TabMenu1',
    };
  },
};
</script>
```

각 버튼을 클릭하면 해당하는 탭 메뉴가 나타난다.

![](https://velog.velcdn.com/images/reasonz/post/9fdaadec-cff0-4cbb-b81e-85f06f93b057/image.gif)

작동은 잘 되지만 코드가 상당히 지저분해진다.
이런 부분을 보완하기 위해 Vue에서는 다이나믹 컴포넌트가 지원된다.

## Dynamic component

component라는 태그를 사용해서 다이나믹 컴포넌트를 만들 수 있다.

is라는 prop을 넘기게되는데 이 is에 컴포넌트 이름만 넘겨주면 해당 내용이 나타나게 된다.

```
<template>
  <div>
    <h1>App.vue</h1>
    <button @click="activeTab = 'TabMenu1'">Menu1</button>
    <button @click="activeTab = 'TabMenu2'">Menu2</button>
    <button @click="activeTab = 'TabMenu3'">Menu3</button>
    <component :is="activeTab"></component>
  </div>
</template>

<script>
import TabMenu1 from './components/tabItems/TabMenu1.vue';
import TabMenu2 from './components/tabItems/TabMenu2.vue';
import TabMenu3 from './components/tabItems/TabMenu3.vue';

export default {
  name: 'App',
  components: {
    TabMenu1,
    TabMenu2,
    TabMenu3,
  },
  data() {
    return {
      activeTab: 'TabMenu1',
    };
  },
};
</script>

<style></style>

```

![](https://velog.velcdn.com/images/reasonz/post/7ed08111-592c-4c0a-a23c-9c5427fc5f72/image.gif)

코드는 더 짧아졌지만 결과물은 이전과 동일하다.

# input창 내용 유지하기

세번째 탭 버튼을 눌렀을 때는 input창이 나타나도록 작성하였다.

```
<!-- TabMenu3.vue -->
<template>
  <h2>Menu3</h2>
  <input type="text" v-model="username" />
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
};
</script>

<style></style>

```

![](https://velog.velcdn.com/images/reasonz/post/b0afdfd5-cd4c-4a23-9a66-8d511d23eabd/image.gif)

Menu3 버튼을 누르고 ㅎㅇㅎㅇ를 작성한 후 다른 탭 버튼을 눌렀다가 다시 Menu3으로 돌아왔을 때 이전에 작성한 내용이 사라져있는 것을 확인할 수 있다.

그 이유는 버튼을 누를 때마다 컴포넌트가 새롭게 렌더링되기 때문에 작성한 내용이 사라지는 것이다.

vue에서는 이런 부분을 방지하고 작성한 내용을 유지시켜주는 기능이 있다.

# keep-alive

다시 App.vue로 돌아가서 keep-alive 태그를 작성해주면 된다.

```
<template>
  <div>
    <h1>App.vue</h1>
    <button @click="activeTab = 'TabMenu1'">Menu1</button>
    <button @click="activeTab = 'TabMenu2'">Menu2</button>
    <button @click="activeTab = 'TabMenu3'">Menu3</button>

    <keep-alive>
      <component :is="activeTab"></component>
    </keep-alive>
  </div>
</template>
```

component 태그를 keep-alive 태그로 감싸주면 된다.
keep-alive 태그로 감싸진 component의 데이터는 유지된다.

![](https://velog.velcdn.com/images/reasonz/post/eae8b585-f6bc-48cc-b525-de8f4497d2cf/image.gif)

작성한 `ㅋㅋ`가 다른 탭을 누르고 돌아와도 유지되어 있다.

---

> 참고 자료

[[ SeSac ] [VUE3 #23] 바닐라JS + VUE3 강좌 시리즈 : component 5](https://www.youtube.com/watch?v=r8IkJXrIt_U&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=23&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

[Provide / inject](https://v3.ko.vuejs.org/guide/component-provide-inject.html#%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A7%E1%86%BC-reactive-%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9-%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)

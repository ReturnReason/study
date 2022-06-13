# Vue component

먼저 products 데이터 배열을 만들고 오브젝트 아이템을 작성하였다.

```javascript
data() {
  return {
    products: [
      { id: 0, name: 'TV', price: 500000, company: 'LG' },
      { id: 1, name: '전자레인지', price: 200000, company: '삼성' },
      { id: 2, name: '가스오븐', price: 200000, company: '린나이' },
      { id: 3, name: '냉장고', price: 300000, company: '위니아' },
      { id: 4, name: '에어컨', price: 1000000, company: '신일' },
    ],
  };
},
```

```html
<div>
  <ul>
    <li v-for="product in products" :key="product.id">{{ product }}</li>
  </ul>
</div>
```

템플릿 태그 안에 html 요소도 작성해주었다.

![](https://velog.velcdn.com/images/reasonz/post/227a0c02-b778-42ad-a33a-c9a0b5933a34/image.png)

li 태그 안에 product 오브젝트가 리스트로 작성된다.
이제 이 오브젝트들을 하나하나의 모양을 가진 컴포넌트로 만들어보고자 한다.

기본적으로 반복문을 만드는 요소 뿐만 아니라, 반복문을 돌려주는 요소까지 기본으로 만들어 주는 형태로 만들면 된다.

# 컴포넌트 만들기

`ProductList.vue` 컴포넌트를 만들고 기본 코드를 작성해주었다.

```html
<!-- ProductList.vue -->
<template>
  <div>
    <ul>
      {{ productList }}
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ProductList',
    props: {
      productList: {
        type: Array,
        default() {
          return [];
        },
      },
    },
  };
</script>
```

props로 받아올 productList는 오브젝트 형태로 작성하여 default 값을 반환할 수 있도록 하였다.

이제 `App.vue` 파일에서 import하고 components 오브젝트 안에 등록해주면 된다.

```javascript
/* App.vue */
import ProductList from './components/ProductList.vue';
```

```javascript
components: {
  ProductList,
},
```

```html
<ProductList :productList="products" />
```

productList라는 이름으로 App.vue에 작성해놓은 products 배열을 props로 보냈다.

![](https://velog.velcdn.com/images/reasonz/post/86f64590-5cc7-419b-9043-efd0c77e0218/image.png)

화면에 위와 같은 형태로 출력된다.
이제 각각의 products 아이템들을 하나씩 보여줄 수 있는 컴포넌트를 하나 더 만들어주었다. (ProductItem.vue)

```html
<!-- ProductItem.vue -->
<template>
  <li>
    <p class="title">제품명</p>
    <p class="image">
      <img src="https://placeimg.com/200/100/any" alt="random image" />
    </p>
    <p class="price">5000</p>
  </li>
</template>

<script>
  export default {
    name: 'ProductItem',
    props: {},
  };
</script>

<style scoped>
  .title {
    font-size: 24px;
    color: #2c82c9;
    font-weight: bold;
  }

  li {
    list-style: none;
    border: 2px solid #ddd;
  }
</style>
```

css 스타일링은 아주 간단하게만 작성하였다.
ProductList.vue에서 import하고 사용해보았다.

![](https://velog.velcdn.com/images/reasonz/post/5d4c8d9c-2de7-4e1e-b169-51efa7262ef4/image.png)

이제 처음에 작성한 배열 오브젝트의 길이 만큼 v-for 디렉티브를 사용하여 반복문으로 만들어 주면 된다.

```html
<!-- ProductList.vue -->
<template>
  <div>
    <ul>
      <ProductItem v-for="product in productList" :key="product.id" />
    </ul>
  </div>
</template>

<script>
  import ProductItem from './ProductItem.vue';

  export default {
    name: 'ProductList',
    components: {
      ProductItem,
    },
    props: {
      productList: {
        type: Array,
        default() {
          return [];
        },
      },
    },
  };
</script>

<style></style>
```

![](https://velog.velcdn.com/images/reasonz/post/aa6d3239-6893-4cd2-8bbb-17213243fd83/image.png)

productList의 길이만큼 반복되어 나타난다.
이제 각각의 li에 하드 코딩된 부분을 수정하고자 한다.
각각의 아이템 컴포넌트에 product의 이름과 제품 가격이 나타나도록 작성할 것이다.

## props를 넘겨서 아이템 리스트 완성하기

```html
<ProductItem v-for="product in productList" :key="product.id" :product="product" />
```

현재 ProductItem 컴포넌트를 반복문으로 사용하고 있기 때문에 반복문을 통해 각각의 product라는 아이템 오브젝트를 넘겨줄 수 있다.
`:product="product"`로 props를 넘겨주고 ProductItem.vue에서 props를 등록하고 사용하면 된다.

```html
<!-- ProductItem.vue -->

<template>
  <li>
    <p class="title">{{ product.name }}</p>
    <p class="image">
      <img v-bind:src="`https://placeimg.com/200/100/${product.id}`" :alt="product.name" />
    </p>
    <p class="price">{{ product.price }}</p>
  </li>
</template>

<script>
  export default {
    name: 'ProductItem',
    props: {
      product: Object,
    },
  };
</script>

<style scoped>
  .title {
    font-size: 24px;
    color: #2c82c9;
    font-weight: bold;
  }

  li {
    list-style: none;
    border: 2px solid #ddd;
    margin-bottom: 0.5rem;
  }
</style>
```

머스타치 문법을 사용하여 product 오브젝트의 name, price가 화면에 보여질 수 있도록 작성하였다.

속성에 데이터를 넣을 때는 v-bind:속성 (또는 약어로 :속성)을 사용해서 작성해주면 된다.

![](https://velog.velcdn.com/images/reasonz/post/d7448a0a-4d7a-46a5-b90f-b0eb0fd5e515/image.png)

각 ProductItem 컴포넌트 마다 제품명, 이미지, 가격이 다르게 나타나는 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/612856fb-f55d-41b1-a944-ece3b94b40c5/image.png)

# non-prop 속성 넘겨주기

이전에 사용했던 GreetingUser.vue를 다시 불러와보았다.

```html
<template>
  <div>
    <h2>Hello {{ username }}!</h2>
    <h3>오늘이 {{ numberOfVisit }} 번째 방문입니다.</h3>
    <h3>사이트 이름은 {{ siteInfo.name }} 입니다.</h3>
    <h3>사이트 이름은 {{ siteInfo.name }}</h3>
    <h3>사이트 이름은 {{ siteInfo.name }}</h3>
  </div>
</template>
```

현재는 div 태그 안에 h2, h3 태그 요소들이 들어가 있는 형태이다.
이제 이 GreetingUser.vue 를 App.vue 파일에서 import하여 사용해보았다.

```html
<!-- App.vue -->
<GreetingUser id="greeting" />
```

그리고 import해온 GreetingUser 컴포넌트에 id 속성을 적용해보았다. 렌더링된 화면에서 요소 검사를 해보면 GreetingUser.vue 파일에 작성된 div 태그에 id 속성이 부여된 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/68ae6fb6-00e9-4ed9-b1df-e7d670f437a0/image.png)

하지만, Vue3에서는 div로 태그들을 감싸지 않아도 된다.

### 그렇다면, 만약 GreetingUser.vue 파일에 h2와 h3들을 감싸고 있는 div 태그가 없다면 이 id 속성은 어떻게 될까?

```html
<!-- GreetingUser.vue -->
<template>
  <h2>Hello {{ username }}!</h2>
  <h3>오늘이 {{ numberOfVisit }} 번째 방문입니다.</h3>
  <h3>사이트 이름은 {{ siteInfo.name }} 입니다.</h3>
  <h3>사이트 이름은 {{ siteInfo.name }}</h3>
  <h3>사이트 이름은 {{ siteInfo.name }}</h3>
</template>
```

GreetingUser.vue 파일에 h2와 h3의 부모 태그로 사용되던 div 태그를 지우고 다시 렌더링해보았다.

![](https://velog.velcdn.com/images/reasonz/post/2e943443-40ec-4407-871e-8e0c3cc4057f/image.png)

부모 div 태그를 없애니 넘겨주는 id 같은 속성들이 적용되지 않았다.

### div 태그가 없는 경우, 넘겨주는 id 같은 속성을 적용할 수 있는 방법이 있을까 ?

`v-bind="$attrs"` 속성을 주면 해결할 수 있다.

```html
<template>
  <h2 v-bind="$attrs">Hello {{ username }}!</h2>
  <h3>오늘이 {{ numberOfVisit }} 번째 방문입니다.</h3>
  <h3>사이트 이름은 {{ siteInfo.name }} 입니다.</h3>
  <h3>사이트 이름은 {{ siteInfo.name }}</h3>
  <h3>사이트 이름은 {{ siteInfo.name }}</h3>
</template>
```

감싸고 있는 div 태그가 없어서 자동으로 상속되어 적용되지 않지만, 이러한 경우에 v-bind="$attrs" 을 태그 안에 명시해주면 된다.

![](https://velog.velcdn.com/images/reasonz/post/2db661e4-edac-4304-bb2e-d1cd281f1cb0/image.png)

h2 태그에 속성으로 넣은 v-bind="$attrs"이 적용되었음을 확인할 수 있다.
다른 태그들에도 마찬가지로 해당 속성을 적어주면 동일하게 사용할 수 있다.

### id같은 no-prop 속성을 넘겨받기 위해서는 v-bind="$attrs"를 사용하면 된다.

## v-bind="$attrs" 속성도 있고 감싸는 부모 태그 div도 있다면?

```html
<template>
  <div>
    <h2 v-bind="$attrs">Hello {{ username }}!</h2>
    <h3 v-bind="$attrs">오늘이 {{ numberOfVisit }} 번째 방문입니다.</h3>
    <h3>사이트 이름은 {{ siteInfo.name }} 입니다.</h3>
    <h3>사이트 이름은 {{ siteInfo.name }}</h3>
    <h3>사이트 이름은 {{ siteInfo.name }}</h3>
  </div>
</template>
```

속성을 상속받을 수 있는 부모 태그인 div도 있고 v-bind="$attrs" 속성을 가진 태그도 있다면 ?

![](https://velog.velcdn.com/images/reasonz/post/ca505ce2-5d1d-4f82-b274-b1e6904c9053/image.png)

부모 태그에는 당연히 상속되어 적용되었고 `v-bind="$attrs"`을 바인딩 시킴으로 인해 작성한 태그들에도 상속이 적용되었다.

기본적으로 상속받는 부모 태그에 상속되는 것을 원하지 않는다면, script 태그의 export default 오브젝트 안에 inheritAttrs 라는 속성을 false로 만들어주면 된다.

```javascript
inheritAttrs: false,
```

![](https://velog.velcdn.com/images/reasonz/post/0986f145-6aa1-465c-a968-9a07343123ba/image.png)

inheritAttrs을 false로 설정하면 부모태그는 상속 받지 않고 v-bind="$attrs" 속성을 가지고 있는 태그에만 상속된 것을 확인할 수 있다.

---

> 참고 자료

[데브리 [ SeSac ] [VUE3 #21] 바닐라JS + VUE3 강좌 시리즈 : component 3](https://www.youtube.com/watch?v=ACKLVgZQ7qI&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=21&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

먼저, 반복문을 사용하여 배열 안의 요소를 렌더링하였다.

<br>

```html
<template>
  <ul>
    <li v-for="(city, i) in cities" :key="i">{{ city.name }}</li>
  </ul>
</template>
```

<br>

```javascript
data() {
  return {
    cities: [
      {
        name: '서울',
        province: '경기도',
      },
      {
        name: '대전',
        province: '충청도',
      },
      {
        name: '대구',
        province: '경상도',
      },
      {
        name: '부산',
        province: '경상도',
      },
      {
        name: '인천',
        province: '경기도',
      },
      {
        name: '광주',
        province: '전라도',
      },
    ],
  };
},
```

각 도시의 이름을 li 태그를 사용해 리스트로 출력하였다.

![](https://velog.velcdn.com/images/reasonz/post/2e9e3232-9d17-410a-8402-40f235ae40e4/image.png)

배열에 조건적인 부분을 출력할 때 두가지 방법이 있다.

1. 배열 자체를 가공하여 다른 형태로 출력 (map, filter, reduce, some, sort 같은 배열 메소드)
2. if문 사용

<br>

## v-for와 v-if는 함께 사용할 수 없다.

```html
<li v-if="city.province === '경상도'" v-for="(city, i) in cities" :key="i">{{ city.name }}</li>
```

위와 같이 v-if="city.province === '경상도'"를 작성하면 에러가 발생한다. v-for와 같은 태그에 함께 작성할 수 없기 때문이다.

### 1. 배열 메소드를 사용하여 해결하는 방법

배열을 사용한 반복문과 조건문을 함께 사용하고 싶다면 할 수 있는 방법 중 하나일 것이다.

```html
<li v-for="(city, i) in cities.filter((c) => c.province === '경상도')" :key="i"></li>
```

배열 내장 메서드인 filter를 사용하여 province가 경상도인 요소만 렌더링되도록 하였다.

![](https://velog.velcdn.com/images/reasonz/post/dfd3958c-d678-4e4e-99e8-f6fbc8cc2f02/image.png)

### 2. 다른 레벨에서 v-if를 사용하는 방법

```html
<template>
  <ul>
    <li v-for="(city, i) in cities" :key="i">
      <span v-if="city.province === '경상도'">{{ city.name }}</span>
    </li>
  </ul>
</template>
```

li태그 안에 span태그를 작성하여 span 태그에 v-if를 작성하였다.
이 방법을 사용해도 province가 경상도인 요소만 보여지겠지만 문제가 있다.

![](https://velog.velcdn.com/images/reasonz/post/86d0e687-a535-459b-91dd-551bea80bec0/image.png)

나머지 li는 생성만 되고 span 태그에 글자만 생성되지 않은 형태로 렌더링되었다.

<br>

### 그렇다면 if를 밖으로 빼면 어떨까?

아쉽게도 if를 밖으로 뺄수는 없다. v-for에서 각 배열의 요소를 가르키는 city가 필요하지만 부모요소에서는 이 city를 찾을 수 없기 때문이다.

<br>

## template 태그로 해결하기

li자체에 for문을 돌리지 않고 template 태그에 for문을 적용하면 된다.

```html
<template>
  <ul>
    <template v-for="(city, i) in cities" :key="i">
      <li v-if="city.province === '경상도'">{{ city.name }}</li>
    </template>
  </ul>
</template>
```

<br>

template는 화면에 불필요한 DOM을 생성하지 않기 때문에 template 태그를 사용하여 반복문을 돌리고 li에 if문을 사용하면 이전에 발생한 문제들을 해결할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/f888f477-9629-4b04-96d6-7147659a4dcb/image.png)

---

> 참고 자료

[데브리 [ SeSac ] [VUE3 #12] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=dUS7XIMtwC8&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=12&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

# 리스트 렌더링

배열로 나타낼 수 있다. 배열 데이터를 화면에 출력하는 것을 의미한다.

```javascript
data() {
  return {
    fruits: ['banana', 'strawberry', 'apple', 'melon'],
  };
},
```

```html
<template>
  <div>{{ fruits }}</div>
</template>
```

배열 fruits에 과일 원소를 추가하였다.
이 배열을 화면에 렌더링해보았다.

![](https://velog.velcdn.com/images/reasonz/post/91a3704e-9899-4d7c-807d-fbaddbda9a08/image.png)

배열 자체가 화면에 출력되었다. 하나 하나의 요소가 리스트처럼 나오게 하려면 어떻게 하면 될까?
`v-for` 디렉티브를 사용하면 쉽게 해결할 수 있다.

<br>

## 반복문으로 리스트 렌더링

반복될 요소에 v-for 디렉티브를 사용하면 된다.

<br>

# v-for과 v-bind:key 디렉티브

```html
<template>
  <div>
    <ul>
      <li v-for="fruit in fruits" :key="fruit">{{ fruit }}</li>
    </ul>
  </div>
</template>
```

v-for in 또는 of를 사용하면 된다.
fruit(작명)라는 이름으로 배열의 요소가 하나씩 담기게 된다.
반복문의 요소는 `v-bind:key`라는 디렉티브를 가지고 있어야 한다.
v-bind는 생략하여 :key라고 작성하면 된다. 반복문 안에서 사용하는 각각의 유니크하게 가질 수 있는 값이 key로 사용하면 된다.
현재는 fruit가 각각의 배열 요소를 지칭하고 있기 때문에 key값으로 설정하였다.

![](https://velog.velcdn.com/images/reasonz/post/37da78eb-59ed-4b03-9882-22b158e2f28f/image.png)

v-for은 `두번째 인자로 인덱스`를 넣을수 있다.
모든 배열에는 인덱스가 부여되어 있기 때문에 인덱스도 함께 받아올 수 있는 것이다.

<br>

```html
<li v-for="(fruit, index) in fruits" :key="fruit">{{ index }}</li>
```

![](https://velog.velcdn.com/images/reasonz/post/aa039d50-ea27-4d06-84bd-2da3c7945530/image.png)

두번째 인자로 받은 인덱스를 key로 지정해도 된다.
반복되는 배열의 값이 있을 수 있기 때문에 index를 key로 설정하는 것이 더 적합할 수도 있다.

<br>

```html
<li v-for="(fruit, index) in fruits" :key="index">{{ fruit }}</li>
```

배열의 길이만큼 반복문이 실행되기 때문에 데이터 개수에 상관없이 모두 렌더링하여 사용할 수 있다.

```html
<li v-for="(fruit, index) in fruits" :key="index">{{ index + 1 }}.{{ fruit }}</li>
```

<br>

`1. banana`와 같은 형태로 화면에 보여주고 싶다면
머스타치 문법을 사용해 {{ index + 1 }}을 작성하면 된다.

![](https://velog.velcdn.com/images/reasonz/post/f2ea98e5-f733-4285-aedc-1b3245672c2f/image.png)

머스타치 문법은 간략한 수식도 함께 적어줄 수 있다.
수식은 반드시 한개만 들어가야 하며 다양한 수식이 들어갈 수는 없다.
복잡한 문법이 들어간 경우에는`computed`속성을 통해 부여하기 때문에 머스타치 문법에서는 간략한 수식인 경우에만 사용하는 것이 좋다.
복잡한 내용은 외부로 빼서 가공해야 한다.

<br>

## v-for로 오브젝트 반복하기

배열 뿐만아니라 오브젝트도 반복문을 돌릴 수 있다.

```javascript
data() {
  return {
    user: {
      name: 'IU',
      age: 30,
      job: '가수겸 배우',
    },
  };
},

```

<br>

```html
<h2 v-for="(value, key) in user" :key="key">{{ key }} :: {{ value }}</h2>
```

v-for를 사용하여 오브젝트를 반복문 돌릴 때는 첫번째 인자는 value, 두번째 인자로는 key를 받아올 수 있다.
v-bind:key값으로는 key를 설정해주었고 머스타치 문법을 사용해 각각의 key, value값을 확인해보았다.

![](https://velog.velcdn.com/images/reasonz/post/f11e6649-09b2-45d7-9258-c62e28381d41/image.png)

오브젝트도 반복문이 잘 돌아가는 것을 확인할 수 있다.
오브젝트를 돌릴 때는 `세번째 인자로 index`도 받아올 수 있다.

<br>

```html
<h2 v-for="(value, key, index) in user" :key="key">{{ index }}. {{ key }} :: {{ value }}</h2>
```

![](https://velog.velcdn.com/images/reasonz/post/da33f46b-9936-4b21-bc67-9edc23aba8a6/image.png)

<br>

## v-for 반복 횟수

v-for 반복 횟수를 숫자로 작성해도 된다.

```html
<p v-for="n in 10" :key="n">{{ n }}</p>
```

<br>

# 중첩 반복문

```javascript

data() {
  return {
    animals: [
      {
        name: 'monkey',
        size: 'medium',
        food: ['banana', 'apple'],
      },
      {
        name: 'lion',
        size: 'big',
        food: ['deer', 'cow'],
      },
      {
        name: 'rat',
        size: 'small',
        food: ['cheese', 'rice'],
      },
    ],
  };
},
```

<br>

animal이라는 배열 안에 오브젝트가있고 오브젝트 안에 배열이 들어가있는 형태이다.
위에 작성한 animal을 반복문으로 돌려보았다.

<br>

```html
<div v-for="(animal, animalIndex) in animals" :key="animalIndex">
  <h2>Animal ===> {{ animal.name }}</h2>
  <h3>food</h3>
  <ul>
    <li v-for="(food, foodIndex) in animal.food" :key="foodIndex">{{ food }}</li>
  </ul>
</div>
```

<br>

반복문 안에 또다른 반복문(중첩 반복)을 돌릴 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/e7738427-1de0-4363-98a0-f412a82b09cd/image.png)

처음 반복문을 돌린 animal 배열에서 각각의 오브젝트 데이터를 얻을 수 있고 그 각각의 오브젝트 데이터의 food 배열을 한번 더 반복문으로 돌려서 출력한 것이다.

<br>

> 참고 자료

[데브리 [ SeSac ] [VUE3 #11] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=UxNyUeNsJDo&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=11&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

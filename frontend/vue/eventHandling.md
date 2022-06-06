# v-on:event

v-on 디렉티브를 사용하여 이벤트 핸들링을 할 수 있다.
v-on은 `@이벤트명`으로 축약할 수 있다.

### 버튼을 클릭하면 이름이 변경되도록 만들기

```html
<h1>Hello {{ name }}</h1>
<button v-on:click="changeName">chage name</button>
```

v-on:click 대신 `@click`이라고 작성해도 된다.

```javascript
data() {
  return {
    name: 'IU',
  };
},
  methods: {
    changeName() {
      this.name = '아이유';
    },
  },
```

버튼에 클릭 이벤트를 달았다. 메소드를 추가하여 버튼을 클릭 했을 때 name이라는 변수가 변경되도록 설정하면 다음과 같은 결과물을 확인할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/e305e5f8-ee3a-4566-82c7-f4114721b648/image.gif)

v-on:click 외에도 다양한 이벤트를 모두 사용할 수 있다.

```html
<h1>Hello {{ name }}</h1>
<button @click="changeName">chage name</button>
<button @mouseleave="name = 'IU'">chage name(moveleave)</button>
<button @mouseover="name = '이지은'">chage name(mouseover)</button>
```

mouseleave와 mouseover 이벤트도 확인해 보았다.

![](https://velog.velcdn.com/images/reasonz/post/1c7e1eb4-6b06-4a38-bbdf-75b4d3e38d26/image.gif)

두번째 버튼에서 마우스가 벗어나면 'IU'로 변경되고
세번째 버튼에 마우스를 올리면 '이지은'으로 변경되는 것을 확인할 수 있다.

## comfirm을 통해 링크 이동시킬지 물어보기

```html
<a href="https://naver.com">네이버</a>
```

네이버로 이동하는 링크를 하나 만들었다.
comfirm을 사용해서 true또는 false를 반환받아 false인 경우 이동되지 않도록 만드는 코드를 추가하였다.

```javascript
movePage(e) {
  const check = confirm('페이지를 이동할까요?');
  if (!check) e.preventDefault();
},
```

페이지 이동에 대한 안내창에서 취소를 누르는 경우 false가 저장될 것이다. if 조건문을 사용해 이 check값이 false인 경우 a태그의 기본 동작을 막도록 작성하였다.
a태그의 기본 동작인 링크 이동이 일어나지 않도록 `preventDefault()`함수를 사용했다.

## 이벤트에 파라미터 넘겨 보내기

```javascript
data() {
  return {
    name: 'IU',
    number : 0,
  };
},
```

number라는 변수를 하나 추가해주었다.

```html
<h2>{{ number }}</h2>
<button @click="number += 1">숫자 증가</button>
```

버튼을 클릭하면 숫자가 증가하도록 작성하였다.

![](https://velog.velcdn.com/images/reasonz/post/f4fe4472-eb96-4359-807e-77a608610081/image.gif)

조금 더 코드를 추가해보았다.

```html
<h2>{{ number }}</h2>
<button @click="number++">숫자 1증가</button>
<button @click="number--">숫자 1감소</button>
<button @click="number += 5">숫자 5증가</button>
<button @click="number -= 5">숫자 5감소</button>
```

![](https://velog.velcdn.com/images/reasonz/post/4543df34-f1f8-4688-b00c-4f7f898a6066/image.gif)

현재는 인라인 스크립트 이벤트로 작성하였는데 위와 같이 반복되는 경우 메서드로 작성하여 적용하는 것이 더 좋다.

```javascript

methods: {
  increment(num) {
    this.number += num;
  },
    decrement(num) {
    this.number -= num;
  },
},
```

increment와 decrement 함수를 각각 만들어주었다.
파라미터로 받은 값을 더하거나 빼주는 함수이다.

```html
<button @click="increment(1)">숫자 1증가</button>
<button @click="decrement(1)">숫자 1감소</button>
<button @click="increment(5)">숫자 5증가</button>
<button @click="decrement(5)">숫자 5감소</button>
```

저장하고 확인해 보면 앞서 인라인에 작성한 것과 동일하게 동작하는 것을 확인할 수 있다.

## 파라미터를 직접 넘기는 메서드인 경우에 이벤트를 어떻게 보낼 수 있을까?

파라미터를 넣지 않고 메서드를 호출하는 경우에는 event를 넘겨 받을 수 있었다. (아까 위에서 a태그 confirm e.preventDefault() 사용할 때 참고)
increment나 decrement 함수를 만들어 사용할 때는 파라미터를 직접 입력해야 한다. 이때는 어떻게 이벤트를 받아올 수 있을까?

# $event

```html
<button @click="increment($event, 1)">숫자 1증가</button>
```

파라미터를 보내는 경우에 이벤트를 넘기려면 `$event`라고 작성하면 된다.

```javascript
increment(e, num) {
  this.number += num;
  console.log(e);
},
```

이벤트가 제대로 넘어오는지 콘솔로 출력해서 확인해 보았다.

![](https://velog.velcdn.com/images/reasonz/post/df80ee5a-d9e2-422f-bd97-86f8900b2073/image.png)

파라미터와 이벤트를 함께 쓰는 경우 `$event`를 사용하면 된다.

# modifier

모디파이어는 디렉티브 뒤에 추가적인 정보로 어떤 값을 더 보내어 부가적인 기능을 수행할 수 있도록 도와주는 것이다.
예를 들면, 마우스 좌/우 클릭, 마우스 휠과 같은 modifier를 추가할 수 있다.

```html
<button @click.right="changeName">chage name</button>
```

default값은 left이다. right로 값을 주면 마우스 우클릭을 했을 때 작동하게 된다.

```html
<button @click.middle="changeName">chage name</button>
```

middle의 경우 마우스 휠 부분을 클릭했을 때만 작동한다.

앞서 naver로 이동하는 a태그를 만들었을 때 e.preventDefault()를 사용했었는데 modifier를 사용하면 기본 동작이 실행되지 않도록 막을 수 있다.

```html
<a @click.prevent="movePage" href="https://naver.com">네이버</a>
```

[modifier 종류 확인하기](https://vuejs.org/guide/essentials/event-handling.html)

---

> 참고 자료

[Vue.js 이벤트 핸들링](https://v3.vuejs-korea.org/guide/events.html#%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AB%E1%84%90%E1%85%B3-%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%8E%E1%85%B1)

[데브리 [ SeSac ] [VUE3 #14] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=rmDzxJs15sM&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=14&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

# form과 v-model

form은 입력 양식을 받고 작성한 내용을 서버 등에 보내 저장을 한다.

```html
<form action="">
  <div>
    <label for="name">이름</label>
    <input type="text" id="name" />
  </div>
</form>
```

label 태그에 for 속성을 사용하여 input태그 id와 연결시켜 주었다.
이제 label을 클릭하게 되면 input이 활성화가 된다.

```javascript
data() {
  return {
    user: {
      name: '',
      age: 0,
    },
  };
```

user 객체도 하나 만들었다.

```html
<div>
  {{ user }}
  <hr />
  <form action="">
    <div>
      <label for="name">이름</label>
      <input type="text" id="name" v-model="user.name" />
    </div>
  </form>
</div>
```

상단에 입력된 내용을 확인하기 위해 머스타치 문법으로 {{ user }}라고 작성해주었다.
input 태그 안에는 v-model을 사용하여 user.name과 연결해주었다.
입력한 값이 user객체의 name 값이 될 것이다.

![](https://velog.velcdn.com/images/reasonz/post/34beb51f-9e70-4aba-897a-c3a9af7686bb/image.gif)

html에 나이와 사는 지역을 나타낼 태그도 추가해보았다.

```html
<form action="">
  <div>
    <label for="name">이름</label>
    <input type="text" id="name" v-model="user.name" />
  </div>
  <div>
    <label for="age">나이</label>
    <input type="number" id="age" v-model="user.age" />
  </div>
  <div>
    <label for="city">사는곳</label>
    <select name="" id="city">
      <option value="seoul">서울</option>
      <option value="daejeon">대전</option>
      <option value="daegu">대구</option>
      <option value="busan">부산</option>
      <option value="gwangju">광주</option>
    </select>
  </div>
</form>
```

![](https://velog.velcdn.com/images/reasonz/post/1482107d-c4e1-4688-b176-72eb976536ed/image.gif)

현재 user 오브젝트에는 city 프로퍼티가 존재하지 않는다.
v-model을 사용하여 user.city 속성을 추가할 수도 있다.

```html
<select name="" id="city" v-model="user.city">
  <!-- code -->
</select>
```

![](https://velog.velcdn.com/images/reasonz/post/b566aba0-c83b-4ecb-bca5-396ec95a3bf9/image.gif)

선택을 할때 기입한 value가 프로퍼티로 연결된다.
user의 프로퍼티에 city가 추가된 것을 확인할 수 있다.
미리 초기값을 선언하지 않아도 되지만, `가급적 초기값을 미리 선언해 놓는 것이 좋다.`

# 멀티 셀렉트

```javascript
data() {
    return {
      foodOptions: [
        {
          label: '짜장면',
          code: 'JJ',
        },
        {
          label: '짬뽕',
          code: 'JB',
        },
        {
          label: '탕수육',
          code: 'TS',
        },
      ],
   }
}
```

form안의 option 태그에 v-for를 사용하여 반복하기 위해 foodOptions라는 배열을 만들어서 객체 형태로 추가하였다.

```html
<div>
  <label for="favorite-food">좋아하는 음식</label>
  <select name="" id="favorite-food" v-model="user.favorite">
    <option :value="food.code" v-for="food in foodOptions" :key="food.code">{{ food.label }}</option>
  </select>
</div>
```

현재는 일반 셀렉트이고 멀티 셀렉트를 하려면 multiple 속성을 셀렉트 태그에 작성해주면 된다.

```html
<select multiple name="" id="favorite-food" v-model="user.favorite"></select>
```

![](https://velog.velcdn.com/images/reasonz/post/db54b8f4-8dd7-42f2-ac70-046ddfcbc998/image.gif)

ctrl 또는 shift와 함꼐 클릭하여 멀티 셀렉트할 수 있다.
그리고 배열 안에 해당 음식 코드가 추가되는 것도 확인할 수 있다.

```html
<div>
  <label for="job">직업</label>
  프로그래머 <input type="checkbox" value="programmer" v-model="user.job" /> 가수 <input type="checkbox" value="singer" v-model="user.job" /> 교사 <input type="checkbox" value="teacher" v-model="user.job" />
</div>
```

체크박스도 만들어보았다.

![](https://velog.velcdn.com/images/reasonz/post/f679b23a-b747-4bae-9198-375e1e99ae17/image.gif)

현재는 클릭하면 모든 체크박스에 체크가 된다.
v-model을 달아놓고 기본 값을 초기화하지 않았기 때문이다.
여러개를 선택할 수 있도록 배열로 미리 선언해주어야 한다.

```javascript
user: {
  name: '',
    age: 0,
    city: 'seoul',
    favorite: [],
    job: [],
},
```

![](https://velog.velcdn.com/images/reasonz/post/d4594d37-de65-4b69-8374-17d6397c354e/image.gif)

마찬가지 방법으로 radio 버튼도 만들었다.

```html
<div>
  <label for="gender">성별</label>
  남<input type="radio" value="male" v-model="user.gender" /> 여<input type="radio" value="female" v-model="user.gender" />
</div>
```

![](https://velog.velcdn.com/images/reasonz/post/bf542aa3-a33f-4220-ac62-976029cccea1/image.gif)

여기까지가 기본적으로 폼을 다루는 방법이다.

![](https://velog.velcdn.com/images/reasonz/post/e48a5e49-079b-40a2-9fa6-85129bdb28b0/image.gif)

이전에 작성한 input 박스에 이름을 선언을 할 때 한글로 작성하면 한글자가 늦게 밀려서 작성된다. 마지막에 작성한 글자는 바로 반영이 되지 않고 포커스를 잃어야 완벽히 작성이 완료된다.
영어로 작성하면 상관없지만 IME 때문에 한글로 작성했을 때 밀리는 현상이 발생한다.
IME는 코드의 조합이 필요한 문자들을 조합하여 입력해주는 시스템이라 반영에 문제가 발생할 수 있다.
이 부분을 해결하려면 바닐라 자바스크립트의 `value`를 사용하는 방법이 있다.

```html
<input type="text" id="name" v-model="user.name" @input="setValue" />
```

```javascript
methods: {
  setValue(e) {
    this.user.name = e.target.value;
  },
```

setValue라는 함수를 만들어서 작성하는 내용이 user.name 값에 할당되도록 하였다.

![](https://velog.velcdn.com/images/reasonz/post/73e01004-0e23-44a9-ac2e-1c47f832573b/image.gif)

작성한 글자가 바로바로 적용된다.

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #15] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=jrn-nXpH7C0&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=15&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

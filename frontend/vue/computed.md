computed는 데이터와 흡사하다.
어떠한 값을 계산된 값으로 제공해주는 속성이다.

# computed

먼저 data에 address1, 2, 3을 만들고 머스타치 문법을 사용하여 하나씩 작성해주었다.

```html
<h2>{{ address1 }} {{ address2 }} {{ address3 }}</h2>
```

```javascript
data() {
  return {
    address1: '성남시',
    address2: '분당구',
    address3: '정자로',
  };
},
```

![](https://velog.velcdn.com/images/reasonz/post/573ce4d2-9d3c-4ed3-b005-d32daf87ab01/image.png)

이렇게 3개를 적어주는 것 보다는 `computed`라는 속성을 사용해서 세개를 합친 값을 보여주는 것이 때로는 더 효율적이고 코드가 간결해질 수 있다.

## computed 속성 사용하기

computed는 오브젝트 형태로 작성해주고 리턴 값은 함수 형태로 작성해주면 된다.

```javascript
computed: {
  address() {
    return `${this.address1} ${this.address2} ${this.address3}`;
  },
},
```

이전과 같은 결과값이 화면에 출력되도록 address라는 이름으로 작성해주었다.

```html
<h2>{{ address }}</h2>
```

computed 속성을 사용하면 깔끔하게 사용할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/8c9efa0f-ba11-4c1b-bfbc-8ce20c468fdd/image.png)

computed 속성의 장점은 또 있다.

```javascript
return {
  address1: '성남시',
  address2: '분당구',
  address3: '정자로',
  grade: {
    math: 70,
    kor: 90,
    eng: 50,
    sci: 55,
  },
};
```

grade라는 오브젝트를 만들고 그 안에 각 과목 이름과 성적을 작성하였다.
이 과목들의 성적 합을 구한다고 한다면 다음과 같이 작성해볼 수 있다.

```html
<h2>내가 받은 점수의 합 {{ grade.math + grade.kor + grade.eng + grade.sci }}</h2>
```

각각 하나씩 작성해서 더해주면 될 것이다.

![](https://velog.velcdn.com/images/reasonz/post/c32e7ada-be45-4336-bff9-b938194605de/image.png)

어떠한 값이 변경될 때마다 계산이 계속 이루어 져야 한다면 computed를 사용하면 좋다.

## destructuring을 사용한 computed

구조 분해 할당을 이용하여 computed 속성을 사용하였다.

```javascript
computed: {
  address() {
    return `${this.address1} ${this.address2} ${this.address3}`;
  },
    totalScore() {
      const { math, kor, eng, sci } = this.grade;
      return math + kor + eng + sci;
    },
},
```

```html
<h2>내가 받은 점수의 합 (computed) {{ totalScore }}</h2>
```

![](https://velog.velcdn.com/images/reasonz/post/73148753-ab1e-4e13-ae3c-add524665f69/image.png)

앞서 작성했던 것과 동일한 결과지만 코드가 더 깔끔해졌다.

그렇지만 꼭 여기서 computed를 사용할 필요는 없어보인다.
method를 사용해도 동일한 결과물이 가능할 것이다.

### method로도 computed와 같은 결과인데?

```html
<h2>내가 받은 점수의 합 (methods) {{ getTotalScore() }}</h2>
```

```javascript
methods: {
  getTotalScore() {
    const { math, kor, eng, sci } = this.grade;
    return math + kor + eng + sci;
  },
},
```

![](https://velog.velcdn.com/images/reasonz/post/f03c2b45-2985-44da-9268-c6b369555b6c/image.png)

## 차이점이 뭔가?

computed는 우리가 작성한 값을 도출하기 위해서 필요한 값들이 어떠한 값이 캐시가 된다. 즉, 어떤 값이 직접적으로 변화하기 전까지 계산을 더이상 수행하지 않는다.

methods는 작성한 값 이외에 다른 값이 변하게되면 그때마다 계속 이 메서드. 계산을 수행하게 된다.

computed는 간략한 계산을 사용할 때(계산된 속성을 사용할 때) 사용된다. 화면에 캐시되기 때문에 메서드와 달리 실질적으로 computed와 관련된 것이 변화가 있을 때만 실행이 되고 그것과 관련 없는 것들의 변경이 있는 경우 실행되지 않아 퍼포먼스적으로 좋다.

조금 더 자세히 확인해보자.

```html
<input type="text" v-model="studentName" />
```

```javascript
data() {
  return {
    studentName: '',
  };
```

input에 studentName을 v-model로 연결시켰다.
그리고 렌더링된 화면에서 input 박스에 값을 입력하면 보이지는 않지만 메서드가 계속 실행이 되고 있을 것이다.

아까 작성했던 메서드와 컴퓨티드에 콘솔 로그를 찍어보기로 하자.

```javascript
computed: {
    totalScore() {
      console.log('computed!');
      const { math, kor, eng, sci } = this.grade;
      return math + kor + eng + sci;
    },
  },

methods: {
  getTotalScore() {
    console.log('methods!');
    const { math, kor, eng, sci } = this.grade;
    return math + kor + eng + sci;
  },
},
```

그리고 조금 전에 만든 인풋박스에 글자를 작성해보면 차이점이 나타난다.

![](https://velog.velcdn.com/images/reasonz/post/c465d7bf-6bf7-4bc2-af4b-f5e2f2b4f883/image.gif)

최초 화면이 렌더링 됐을 때 computed와 methods가 실행이 된다.
하지만 methods는 input을 작성할 때마다 methods가 계속 호출되는 것을 확인할 수 있다.
메소드로 선언한 것은 화면에 값이 변동이 있을 때마다 계산이 계속 되기 때문에 나중에는 퍼포먼스에 문제가 발생할 수 있다.
반면에 computed는 grade의 값이 변경되지 않는 이상은 값이 변화하지 않는다.

```html
영어점수 <input type="number" v-model="grade.eng" />
<br />
학생 이름 <input type="text" v-model="studentName" />
```

위와 같은 인풋 박스를 하나 더 만들었다.
학생 이름 input 박스의 글자를 작성한다면 앞서 살펴보았듯이 methods는 관련이 없어도 계속 호출을 할 것이다.

영어 점수 input박스는 computed와 관련이 있다.
computed는 관련이 있는 영어 점수 인풋박스가 변경된다면 호출될 것이다.

![](https://velog.velcdn.com/images/reasonz/post/0e56e0d4-003b-4219-bb7c-6492da15d873/image.gif)

점수를 변경할 때마다 computed가 호출된다.
나중에 API를 불러오거나 통신을 하거나 하는 등 큰 데이터를 다루는 계산일 때는 퍼포먼스를 생각하여 작성할 때 computed로 선언하여 작성하는 것이 좋다.

computed에도 getter, setter도 있지만 값을 입력 받는다면 methods를 사용하는 것이 더 좋다.

<br>

---

> 참고 자료

> [데브리 [ SeSac ] [VUE3 #17] 바닐라JS + VUE3 강좌 시리즈](https://www.youtube.com/watch?v=CDgfvBbM7G8&list=PLpJDjPqxGWGrAEfHRAXf59m0krxxEzic5&index=17&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)

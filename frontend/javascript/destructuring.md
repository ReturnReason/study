# Destructuring (구조분해할당)

디스트럭처링은 구조를 파괴한다는 의미로 `배열이나 객체`를 구조 분해하여 변수에 할당하는 것을 뜻한다.

<br>

## 배열을 구조분해할당 하기

```javascript
const arr = ['배열', '구조', '분해', '할당'];
const aa = arr[0];
const bb = arr[1];
```

먼저, 구조 분해 할당 문법을 사용하지 않으면 위와 같이 배열의 인덱스를 각 변수에 할당하는 방법이 있다.
이 arr 배열을 구조 분해 할당 해보았다.

```javascript
const arr = ['배열', '구조', '분해', '할당'];

const [a, b, c, d] = arr;
console.log(a, b, c, d); // 배열 구조 분해 할당
```

방금 전처럼 `arr[0]`과 같이 개별 변수에 배열의 인덱스 값을 적어서 할당하지 않아도 된다.
배열이기 때문에 `[]`안에 각 변수의 이름을 적어 넣어주면 된다.
만약 배열의 길이보다 선언한 변수의 개수가 적은 경우 배열의 앞에 위치한 0번째 인덱스 값부터 하나씩 할당되고 나머지는 할당되지 않는다. 아래 코드를 살펴보자.

```javascript
const arr = ['배열', '구조', '분해', '할당'];

const [a, b] = arr;
console.log(a, b); // 배열 구조
```

구조 분해 할당 변수로 a와 b만 선언하였기 때문에 arr 배열의 가장 앞쪽 2개의 값만 a와 b에 저장된다.

<br>

### 배열의 인덱스를 스킵하는 방법도 있다.

```javascript
const arr = ['배열', '구조', '분해', '할당'];

const [, , a] = arr;
console.log(a); // 분해
```

아무런 변수 이름을 적지 않고 `,`로 구분하면 해당 인덱스는 스킵해버린다.
0번째 인덱스 배열과 1번째 인덱스 구조는 제외되고 2번째 인덱스의 분해가 a에 할당되었다.

<br>

### 기본값도 설정해줄 수 있다.

```javascript
const arr = ['배열', '구조', '분해', '할당'];

const [a, b, c, d, e = '언디파인드 일때만 이 값이 들어감'] = arr;
console.log(e); // 언디파인드 일때만 이 값이 들어감
```

배열에 구조분해할당을 사용하면 선언한 해당 변수에 값이 들어가지 않는 경우 기본 디폴트 값을 설정해 줄 수 있다.
`[변수 = 디폴트값]`과 같은 형태로 작성하면 된다.

<br>

### 두 변수의 값을 교환할 수 있다.

```javascript
/* 구조 분해 할당을 사용하지 않고 변수의 값 교환 */
let iu = '지은';
let jieun = '아이유';
let tmp = '';

tmp = iu;
iu = jieun;
jieun = tmp;
console.log(iu, jieun);
```

구조 분해 할당을 사용하지 않으면 a와 b변수의 값을 서로 교환하고 싶을 때
임시 저장용 변수 c를 선언하고 a의 값을 c에 담아 놓은뒤 b의 값을 a로, c의 값을 b로 옮기는 방법을 사용해야 할 것이다.

```javascript
/* 구조 분해 할당을 사용하여 각 변수 값 교환*/
let iu = '지은';
let jieun = '아이유';

console.log(`iu 변수 값 : ${iu}, jieun 변수 값 : ${jieun}`); // 지은 아이유

[iu, jieun] = [jieun, iu];
console.log(`iu 변수 값 : ${iu}, jieun 변수 값 : ${jieun}`); // 아이유 지은
```

임시로 저장해놓을 세번째 변수를 선언하지 않아도 구조 분해 할당을 통해 iu 변수와 jieun 변수의 값을 서로 교환하였다.

<br>

### 나머지만 배열로 담을 수도 있다.

```javascript
const arr = ['이건 뺄거에요', '배열', '배열1', '배열2'];
const [a, ...b] = arr;
console.log(a); //이건 뺄거에요
console.log(b); // ["배열", "배열1", "배열2"]
```

a 변수에 먼저 담고 나머지 값들은 전부 b 변수에 담겠다는 의미이다.
rest 엘리먼트(...문법)는 반드시 마지막에 작성되어야 한다.

<br>

## 객체를 구조분해할당하기

사용 방법은 배열을 구조 분해 할당하는 것과 동일하다.

```javascript
const obj = {
  name: '아이유',
  age: 30,
};

const { name, age } = obj;
console.log(name, age); // 아이유 30
```

여기서 주의할 점은 key 값과 `{}`안에 들어가는 변수의 이름은 같아야 한다.
다른 경우, `undefined`가 할당된다.

<br>

### 키값과 다른 이름을 설정하고 싶다면?

```javascript
const obj = {
  name: '아이유',
  age: 30,
};

const { name, age: iuAge } = obj;
console.log(name, iuAge); // 아이유 30
// console.log(age); // age is not defined
```

구조 분해 할당을 할 때 `기존 키값 : 새로 변경할 이름`의 형태로 작성하면 된다.
키값을 변경하기 전 이름을 사용하면 선언되지 않았다고 에러가 발생한다.

<br>

### 조금 복잡해 보이는 객체의 정보를 변수로 만들고 싶다면?

```javascript
const iu = {
  name: '이지은',
  age: 30,
  job: '가수겸 배우',
  debut: '20080918',
  album: [
    {
      title: 'Lost And found',
      release: '20080923',
    },
    {
      title: 'Growing Up',
      release: '20090423',
    },
    {
      title: 'IU...IM',
      release: '20091112',
    },
  ],
};
```

iu라는 객체 안에 `album`이라는 키값을 가진 배열의 각 인덱스별 객체 데이터의 타이틀을 각각의 변수로 넣고 싶다면 어떻게 해야할까?
앨범의 타이틀명 'Lost And Found', 'Growing Up', 'IU...IM'을 개별 변수에 하나씩 담고 싶다면 어떻게 코드를 짜야될까?

```javascript
const iuAlbum = iu.album[0].title;
const iuAlbum2 = iu.album[1].title;
const iuAlbum3 = iu.album[2].title;

console.log(iuAlbum); // Lost And found
console.log(iuAlbum2); // Growing Up
console.log(iuAlbum3); // IU...IM
```

이렇게 하나씩 뽑아서 변수에 담아도 가능할 것이다.
구조 분해 할당을 이용해서 위와 동일한 작업을 해보았다.

```javascript
const {
  album: [{ title: album1 }, { title: album2 }, { title: album3 }],
} = iu;

console.log(album1, album2, album3);
```

기존 iu 객체의 뼈대(?)만 똑같이 잘 카피해서 따라 쳐주고 변수로 뽑고자 하는 것들만 이름을 붙여주면 된다.
title을 새로운 이름인 album1, album2, album3 으로 작성하였는데 키값이 동일해야 구조분해 할당이 가능하기 때문에 동일한 키값인 title을 사용해서 가져와야 하지만 변수의 이름이 동일하면 에러가 뜨기 때문에 각각의 title에 새로운 이름을 작명해서 구조 분해 할당하였다.
이렇게하면 album1, album2, album3이라는 변수가 생기게 되는 것이다.

<br>
<br>

> 참고 자료

[MDN 구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

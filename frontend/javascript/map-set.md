# Map, Set

배열과 객체 외에도 map/set이라는 자료형이 존재한다.
객체는 key가 있는 컬렉션을 저장하고 배열은 순서가 있는 컬렉션을 저장하는 형태라면 Map과 Set은 이 두자료만으로는 부족한 부분이 있어 등장하게 되었다.

<br>

## Map

키가 있는 데이터를 저장할 수 있는 자료형이다.(키와 값을 서로 매핑시켜서 저장할 수 있다.)
객체와 유사한데 차이점이 있다면 객체는 단순히 문자형 키값만 가능하다면 Map은 다양한 자료형을 key로 사용할 수 있다는 점이다.

<br>

### Map 자료형 사용방법

```javascript
let map = new Map();
```

`new Map()`이라는 키워드를 사용하여 map 자료형을 만들 수 있다.

<br>

### Map자료형에 저장하고 출력하는 방법

```javascript
map.set('key', 'value');
console.log(map.get('key')); // value
```

`map.set()`으로 key, value를 파라미터로 전달하면 저장할 수 있다. key의 값은 문자열외에도 다양한 자료형을 사용할 수 있다.
`map.get()`을 사용하면 set으로 저장한 값을 가져올 수 있다.

<br>

### Map 자료형 데이터 삭제하는 방법

```javascript
let map = new Map();
map.set('이름', '아이유');
map.set('직업', '가수겸 배우');

map.delete('이름');
```

`delete()`를 사용하여 데이터를 삭제할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/6205b3b4-9e28-4699-a50e-c1f20b9e480a/image.png)

<br>

### 그 외

`map.size`를 사용하면 map자료형의 크기를 알 수 있다.
`for 반복문`을 사용할 수 있으며 forEach또한 가능하다.
`map.keys`()를 사용하면 key값만도 가져올 수 있다. iterable 하기 때문에 for..of 사용도 된다.
`map.has(key)`는 해당 키값이 있으면 true, 없으면 false를 반환한다.

<br>

## Set

사용 방법은 맵 자료형과 동일하다.
set자료형의 특징은 중복된 값이 허용되지 않는 다는 것인데, 배열에 중복된 값을 허용하고 싶지 않을 때 사용된다.

```javascript
const arr = ['아이유', '이도현', '비비지', '다이아', '아이유'];
let set = new Set(arr);

console.log(set);
```

![](https://velog.velcdn.com/images/reasonz/post/30ff1ed7-92c4-41c3-a0cb-8a9270861da5/image.png)

배열에 '아이유'가 2번이나 들어가 있지만 set자료형에서는 중복을 제거한 상태로 저장된 것을 확인할 수 있다.

```javascript
set.add('다이아 예빈');
console.log(set);
```

```javascript
const arr = ['아이유', '이도현', '비비지', '다이아', '아이유'];
let set = new Set(arr);

set.add('다이아 예빈'); // set 자료형에 추가
console.log(set);

set.delete('다이아'); // 삭제
console.log(set);

console.log(set.has('아이유')); // 있으면 T, 없으면 F

const arr2 = [...set]; // set으로 중복 제거해서 배열로 다시 만들기
console.log(arr2);
```

앞서 살펴본 map과 마찬가지로 `size`, `for loop`, `has`, `values`, `keys`, `entries` 등을 사용할 수 있다.

<br>

### 배열과 차이점

배열에서는 특정 요소가 존재하는지 찾으려면 시간이 오래걸린다.
Set 객체로 만든 요소는 삭제도 쉽게할 수 있으며 NaN 배열을 찾을 수 있고 Set 객체로 만든 것은 중복을 저장하지 않기 때문에 유일성이 보장된다.

<br>

---

> 참고 자료

> [모던 자바스크립트 맵과 셋](https://ko.javascript.info/map-set)

> [MDN 키기반의 컬렉션](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Keyed_collections)

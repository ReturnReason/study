# 맵(Map)
맵은 객체와 비슷하지만 객체와 달리 여러 자료형을 사용할 수 있다.
`new Map()` 키워드를 사용하여 맵을 만들 수 있다.

```js
const map = new Map();
```
어떻게 생긴 자료형인지 확인하기 위해 콘솔에 출력해보았다.

![](https://velog.velcdn.com/images/reasonz/post/e3752248-aa2d-4c54-97da-34b1bd345458/image.png)

현재 맵을 만들기만 했기 때문에 속성도, 사이즈도 없는 상태이다. 여기서 이제 자료를 추가해볼 것이다.

### map.set()

```js
map.set('key', 'value');
```
`map.set(key, value)`  형태로 사용하면 해당 키를 이용한 value를 저장할 수 있다.

```js
map.set("key", "value");
map.set("number", 1234);
map.set("boolean", true);
```

맵에 key, value를 저장하고 다시 콘솔에 출력해보았다.

![](https://velog.velcdn.com/images/reasonz/post/151b7559-1943-45ef-8b2d-103af076e054/image.png)

key 부분의 경우 현재 String으로만 저장했는데 꼭 string이 아니더라도 숫자, boolean, 심지어 객체도 키로 사용할 수 있다.


> 맵은 NaN도 키로 사용할 수 있다.

```js
map.set(123, "number");
map.set(true, "true");
```

```js
/* 객체도 key로 사용하는 Map */
const map = new Map();
const obj = { name : 'lee', age : 20 };
map.set(obj, "value");

console.log(map.get(obj));
```

> 객체는 키를 문자형으로 변환시키지만 맵은 키를 문자열로 변환시키지 않고 타입을 유지한다.

```js
map.get(123);
```

map은 숫자나 bool타입으로 저장한 key도 문자열로 변경시키지 않기 때문에 가져올 때도 해당 타입을 그대로 가져올 수 있다.
`map.get(key)` 은 map에 저장된 key에 해당하는 value를 가져온다.

### 맵이 키를 포함하고 있는지 확인할 때 
```js
console.log(map.has(123));
```
`map.has(key);` 형태로 작성하면 해당 키 값이 있으면 true, 없으면 false를 반환한다.

### 맵의 사이즈를 확인할 때
```js
console.log(map.size);
```

> #### Map[key] 와 같은 형태는 사용하지 말 것!
일반 객체와 혼동될 수 있고 일반 객체처럼 취급하게 되기 때문에 map을 사용할 때는 `set`과 `get`을 사용하자.

### 맵은 호출할 때 마다 자기 자신이 반환된다.
호출할 때마다 자기 자신(map)이 반환되므로 여러개를 체이닝해서 사용할 수도 있다.

```js
map.set('key', 'value')
   .set('key2' ,'value2');
```

### 맵은 iterable하므로 for of 반복문을 사용할 수 있다.

- map.keys()
- map.values()
- map.entries()

for..of 반복문에서 위 세가지 메소드를 사용하여 반복 수행을 시킬 수 있다.
for of 외에도 유사 배열처럼 forEach 반복문도 사용할 수 있다.


-- --
> 참고 자료

[모던 자바스크립트 튜토리얼 맵과 셋](https://ko.javascript.info/map-set)

[MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
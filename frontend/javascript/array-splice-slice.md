오늘은 배열 내장 함수인 splice와 slice의 차이를 비교해보고
각각의 메소드 사용 방법을 공부해볼 것이다.

<br>

# Array.prototype.splice

매개변수에 따라 배열의 기존 요소를 삭제 및 교체, 추가할 수 있는 메소드이다.
<br>
`splice(시작 인덱스, 지울 요소 개수, 추가할 요소)`

**첫번째 매개변수 :** 시작할 배열 인덱스 (배열 길이보다 크면 시작인덱스는 배열의 길이가 되고 음수인 경우 마지막 요소부터 -n번째, 절대값이 배열 길이보다 큰 경우는 0)

**두번째 매개변수 :** 배열에서 제거할 요소의 개수
생략할 수 있으며 생략하거나 값이 어레이의 길이-첫번째 매개변수 값보다 크면 첫번째 매개변수(시작 인덱스)부터 모든 요소가 제거된다. 0이하인 경우엔 요소가 제거되지 않는다.

**세번째 매개변수 :** 배열에 추가할 요소를 작성할 수 있다.
생략 가능하며 생략할 경우 배열의 요소 제거만 수행한다.

**splice의 반환값**
제거한 요소를 담은 배열이 반환된다. 아무것도 제거되지 않았다면 빈배열이 반환된다.

<br>

## 1. 첫번째 매개변수만 사용해본 splice 메소드

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(0)); //[1, 2, 3, 4]
console.log(arr); //[]
```

첫번째 매개변수만 사용하여 splice를 사용해보았다.
매개변수로 0을 입력했을 때 모든 배열이 반환되었다.
기존의 배열은 모든 요소가 제거되어 빈 배열만 남았다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(-1)); //[4]
console.log(arr); //[1, 2, 3]
```

첫번째 매개변수로 음수값을 작성해보았다. 가장 맨 뒷 요소가 반환되었다.
기존 배열은 마지막 요소를 제외한 요소들만 남았다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(-100)); // [1, 2, 3, 4]
console.log(arr); //[]
```

배열의 길이보다 훨씬 큰 숫자를 음수로 작성해보았다.
모든 배열 요소가 선택되어 제거되었다. 기존 배열은 빈 배열이 되었다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(1)); // [2, 3, 4]
console.log(arr); //[1]
```

이번엔 첫번째 매개변수에 양수 1을 입력해보았다.
인덱스 0번의 요소를 제외한 모든 요소가 제거되었다.(인덱스 1번부터 모든 요소 제거)

<br>

## 2. splice 메소드에 매개변수를 2개 넣어보았다.

첫번째 매개변수로 시작할 인덱스를 설정했다면 두번째 매개변수는 제거할 개수를 선택할 수 있다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(0, 0)); // []
console.log(arr); //[1, 2, 3, 4]
```

splice(0,0)을 입력한 경우 0번째 인덱스부터 0개를 지워달라는 의미이므로 반환값이 빈 배열이된다.
기존 배열또한 제거된 요소가 없으므로 기존 요소를 그대로 가지고 있다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(0, 1)); // [1]
console.log(arr); // [2, 3, 4]
```

0번째 요소부터 1개를 지워달라는 의미이다.
기존 배열에 0번째 요소가 제거되었고 splice는 제거한 배열의 0번째 요소를 반환했다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(-3, -3)); // []
console.log(arr); // [1, 2, 3, 4]
```

위 코드는 두번째 인자가 0이하인 경우에 해당되어 빈배열이 반환되었다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(-3, 3)); // [2, 3, 4]
console.log(arr); // [1]
```

두번째 인자로 양수 3을 넣어보았다.
-1번째 : 4, -2번째 : 3, -3번째 : 2이므로 2부터 3개를 제거해달라는 의미가 된다.
즉, arr의 `[2, 3, 4]`가 제거되고 기존 배열은 `[1]`이 되었다.

<br>

## 3. splice 메소드에 매개변수를 3개 넣어보았다.

세번째 매개변수에 입력한 값은 배열 요소에 추가된다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(0, 0, '안녕')); // []
console.log(arr); // ["안녕", 1, 2, 3, 4]
```

배열을 삭제하지 않고 0번째 자리에 "안녕"이라는 요소를 배열에 넣을 수 있다.
첫번째 인자가 시작 인덱스고 두번째 인자가 지울 개수였으니 0번째부터 0개를 지우고 그 자리에 "안녕"을 추가해달라는 의미와 같다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(1, 3, '안녕')); // [2, 3, 4]
console.log(arr); // [1, "안녕"]
```

마찬가지로 1번째 배열 요소부터 3개를 지우고 "안녕" 값을 배열에 추가해달라는 뜻이다.
반환값으로는 지워진 배열이되고 기존 배열엔 남은 배열 요소와 추가한 "안녕"이 담긴다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(-1, 0, '안녕')); // []
console.log(arr); // [1, 2, 3, "안녕", 4]
```

개인적으로 이 결과값이 가장 독특하게?..이상하게? 느껴졌다.
위 배열에서 -1번째 요소는 4가된다. 두번째 매개변수로 0을 입력했으니 0개를 지우고 세번째 매개변수인 "안녕"을 배열에 추가할 것이다.
결과값을 예상했을 때는 `[1,2,3,4,"안녕"]`이 되었을 것을 예상했으나 `[1, 2, 3, "안녕", 4]`이 된다.
아무것도 지우지 않고 배열의 마지막 요소에 값을 넣고자 한다면 위 방식으로 splice를 사용하면 안될 것 같다.
`push()`를 사용하거나, `arr.splice(arr.length,0,"안녕")`과 같이 사용해야 원하는 결과가 나타날 것이다.

```javascript
/* splice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.splice(arr.length, 0, '안녕', '뇽안뇽안')); // []
console.log(arr); // [1, 2, 3, 4, "안녕", "뇽안뇽안"]
```

여러개의 값도 추가할 수 있다.

<br>

# Array.prototype.slice

`배열.slice(첫번째, 두번째)`형태로 사용되는데
어디부터 어디까지 반환할지 작성해주면 된다. 첫번째 인자로는 시작 인덱스 값을 적어주고
두번째 인자에는 slice 메소드로 반환할 배열 인덱스+1을 적어주면 된다.
여기서 +1을 하는 이유는 반환될 때 두번째 인자 인덱스-1까지의 범위만 반환되기 때문이다.

splice와 달리 slice는 원본 배열이 바뀌지 않는다.

헷갈리니 n개를 반환한다고 생각해도 될 것 같다.
**예를 들여 slice(0, 3)이면 0부터 3개를 반환한다고 생각하면 된다.**
하지만, 두번째 인자가 음수값일 때는 전체 배열 개수에서 -두번째 인자값 만큼 뺀 결과값이 된다.
**예를 들어 slice(0, -5)이면 0부터 뒤에서부터 5개를 제거한 배열이 반환된다.**

코드로 확인해보자.

<br>

```javascript
/* slice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.slice());
console.log(arr);
```

아무 인자도 넣지 않은 경우 그 배열이 그대로 반환된다.
이점을 이용해서 배열 복사에도 사용할 수 있다.

```javascript
/* slice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.slice(0, 3)); //[1, 2, 3]
console.log(arr); // [1, 2, 3, 4]
```

첫번째로 0, 두번째 매개변수로 2를 넣었다.
즉 0번째 인덱스에서 시작해서 2개만큼 slice하겠다는 뜻이다.
기존 배열은 바뀌지 않는다.

```javascript
/* slice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.slice(-1)); // [4]
console.log(arr); // [1, 2, 3, 4]
```

음수값을 넣어보았다. 가장 마지막 인덱스부터 하나씩 세기 시작하므로
-1은 배열의 가장 마지막 요소를 의미한다.
-2를 넣으면 가장 마지막 요소, 가장 마지막 요소 앞의 요소가 되는 것이다.

```javascript
/* slice 메소드 */
const arr = [1, 2, 3, 4];
console.log(arr.slice(100)); // []
console.log(arr); // [1, 2, 3, 4]
```

배열의 길이 이상의 값을 넣어버리면 빈 배열이 반환된다.

```javascript
/* slice 메소드 */
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.slice(0, -5)); // [1, 2]
console.log(arr); // [1, 2, 3, 4, 5, 6, 7]
```

두번째 인자에 음수값을 넣었다.
두번째 인자 -1이 배열의 맨 마지막 요소를 의미하므로
맨 뒤에서 5개의 요소를 제거해달라고 해석하면 쉽게 이해할 수 있다.
3,4,5,6,7 5개의 요소가 제거된 `[1,2]`가 반환된다.

---

<br>

## splice와 slice의 차이

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.splice(0, 3)); // [1, 2, 3]
console.log(arr); // [4, 5, 6, 7]
```

splice는 기존 배열까지도 수정된다. splice의 반환값은 splice된 배열이다.
배열 요소를 제거하거나 기존 배열에 값을 추가하거나, 추가&삭제할 때 사용된다.

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.slice(0, 3)); // [1, 2, 3]
console.log(arr); // [1, 2, 3, 4, 5, 6, 7]
```

slice는 기존 배열은 수정하지 않는다. 반환값은 slice한 배열이다.
배열의 n번째부터 m개까지 범위를 복사할 때 사용된다.

<br>

> splice 메소드는 인덱스 n부터 m개를 지워달라고 할 때 사용하거나,
> 인덱스 n부터 m개를 지우고 배열에 값을 추가할 때 사용한다.
> 단, 기존 배열도 함께 변경되므로 주의해야 한다.

> slice 메소드는 배열을 복사해서 사용할 때 쓸 수도 있고
> 시작 인덱스부터 n개의 배열 요소를 반환 받을 수 있다.
> splice와 달리 기존 배열이 변경되지 않는다.

<br>

---

> 참고 자료

> [MDN splice()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

> [MDN slice()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

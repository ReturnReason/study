> 타입 스크립트 입문하기!
> 처음 보는 데이터 타입도 있고 자바스크립트에 타입만 추가한 거라고 들어서 어렵지 않을 줄 알았는데 생각보다 복잡한 것 같아서 정리하면서 하나씩 차근차근 살펴보기로 했다.

# 타입스크립트 (TypeScript)

자바스크립트 엔진을 사용하면서 큰 규모의 애플리케이션을 개발할 수 있도록 설계된 언어이다. 자바스크립트의 슈퍼셋이므로 자바스크립트로 작성한 프로그램이 타입스크립트 프로그램으로도 동작한다는 특징이 있다.
바닐라 자바스크립트와 다른 점이라하면 데이터 타입을 명시한다는 것이다.
타입스크립트는 규모가 큰 프로젝트일수록 바닐라 자바스크립트의 자유도로 인한 오류나 문제가 생길 수 있는 부분을 사전에 방지할 수 있게 해준다.

## 기본 타입 종류

1. Boolean
   : true 또는 false
2. Number
   : 숫자 타입
3. String
   : 문자열 타입
4. Object
   : 객체
5. Array
   : 배열
6. Tuple
   : 길이가 고정되면서 각 요소의 타입이 지정되어 있는 배열
7. Enum
   : 특정 상수의 집합
8. Any
   : 모든 타입 허용
9. Void
   : 함수는 반환 값 설정 불가, 변수는 undefined 또는 null 할당
10. Null
11. Undefined
12. Never
    : 함수의 끝에 절대 도달하지 않을 때 (함수 내에서 반복문 무한반복)

## TS 사용해보기

```typescript
let str = '문자열';
str = 1;
```

타입스크립트에서 위와 같이 사용하면 str 변수 선언과 함께 초기값을 문자열로 넣어서 `Type 'number' is not assignable to type 'string'.`에러가 나타난다.

```typescript
let str;
str = '문자열';
str = 1;

console.log(str);
```

str 변수 이름만 선언해놓고 따로 값을 넣지 않으면 자동으로 `any`타입으로 인식하는 것 같다.

```typescript
let num: number = 0;
let str: string = '문자열';
let bool: boolean = true;

let arr: string[] = ['문자', '문자 배열'];
let arr2: Array<number> = [1, 2, 3];

let tup: [string, boolean] = ['튜플', true];
```

number, string, boolean 같은 타입은 작성할 때 `변수이름 :타입명`과 같이 모두 동일한 형식으로 작성할 수 있다.
배열은 `타입[]` 또는 `Array<타입>`과 같은 형태로 작성할 수 있다.
튜플은 배열의 길이가 고정되어 있고 고정된 배열의 각각의 요소의 타입이 지정되어 있을 때 사용할 수 있다.

### 변수 말고 함수를 만들면 어떨까?

```typescript
function add(num1, num2) {
  console.log(num1 + num2);
}
```

자바스크립트에선 아무 문제될것 없어 보이는 add 함수를 만들었다.
타입스크립트에서는 위와 같이 사용했을 때 타입을 지정하지 않아서 암시적으로 `any`타입이 됐다는 에러가 발생했다.

```typescript
function add(num1: number, num2: number) {
  console.log(num1 + num2);
}
```

이렇게 파라미터에 타입을 넣어서 고쳐주면 에러가 사라진다.
만약에 함수가 리턴값이 있는 경우 반환하는 값에 대한 타입도 지정할 수 있다.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}
```

바닐라 자바스크립트에서는 add함수에 인자를 0개 또는 그 이상을 넣어도 에러가 발생하지 않는다.

![](https://velog.velcdn.com/images/reasonz/post/ada890e9-7956-4a01-9025-0c63ae51d132/image.png)

add함수는 파라미터로 2개의 값을 받아서 더한 값을 반환해주는 함수인데 바닐라 자바스크립트에서 작성시 아무런 인자를 넣지 않거나 2개를 초과하는 값을 넣었음에도 에러가 발생하지 않고 동작한다.

타입스크립트에서 위와 같은 코드를 작성하면 에러가 발생한다.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}

add(); // Expected 2 arguments, but got 0.
add(1); //Expected 2 arguments, but got 1.
add(1, 2, 3); // Expected 2 arguments, but got 3.
```

타입스크립트에서는 2개의 인자가 필요하지만 현재 몇개의 인자가 들어왔는지 정확히 에러 메시지로 안내해준다.

> 타입스크립트 입문 후기
> 오늘은 간단히 변수와 함수에서 타입스크립트를 사용하는 방법을 살펴보았는데 처음에는 어렵다고 느꼈지만 막상 사용해보니 오히려 더 명확하게 알려주는 것 같아서 느끼지 못했던 자바스크립트의 문제들이 느껴졌던 것 같다.
> 제네릭이나 이넘과 같이 처음 보는 것들도 하나씩 살펴보고 사용해봐야겠다.

---

> 참고 자료

> [위키백과 - 타입스크립트](https://ko.wikipedia.org/wiki/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)

> [타입스크립트 핸드북](https://joshua1988.github.io/ts/why-ts.html)

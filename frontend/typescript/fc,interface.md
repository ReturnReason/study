
타입스크립트에서 함수와 인터페이스를 작성하는 방법을 정리하면서 공부해보았다.

> 참고 사항
타입스크립트에서는 파라미터를 모두 필수 값으로 간주하기 때문에 함수를 호출할 떄는 반드시 함수에 정의한 모든 파라미터를 작성해야 한다.

-- --

## 함수 선언식
리턴 타입을 정의하지 않으면 리턴 타입이 추론된다.
```typescript
function add(num1:number, num2:number){
    return num1+num2;
}

const result = add(1, 2);
console.log(result);
```
리턴 타입을 명시하지 않았지만 리턴 타입이 추론되어 number로 인식하도록 동작한다.
다음과 같이 리턴 타입을 명시해서 작성할 수도 있다.
```typescript
function add(num1:number, num2:number):number {
    return num1+num2;
}

const result = add(1, 2);
console.log(result);

```
선언한 함수의 파라미터 괄호 바깥에 타입을 적어주면 리턴 타입을 명시할 수 있다.

## 함수 표현식
```typescript
const add = function(a:number, b:number){
    return a+b;
}

console.log(add(1,2));
```

# 인터페이스
인터페이스는 정의한 약속이나 규칙을 의미한다.
인터페이스에 객체, 함수, 클래스, 배열과 같은 타입에 속성이나 파라미터, 반환 타입을 정의할 수 있다.
미리 인터페이스로 들어갈 데이터 타입을 정의해놓고 인터페이스를 토대로 함수가 객체 등을 작성하는 것이다.
또, 객체를 인터페이스를 사용하여 선언하면 좀 더 엄밀한 속성 검사도 진행한다.

```typescript
const user:object = {
    name : '이름',
    age : 20,
}

console.log(user.name); // Error
// Property 'name' does not exist on type 'object'.
```
user라는 객체를 만들어서 user의 name을 콘솔에 출력하도록 했지만 에러가 발생했다.
오브젝트 안에 특정 속성이 없다는 에러이다. 이 에러를 없애려면 인터페이스를 사용하면 된다.

```typescript
interface Person {
    name : string,
    age : number
}

const person:Person = {
    name : '이름',
    age : 20,
}

console.log(person.name); // "이름"
```

`interface`라고 선언한 객체 안에서 속성을 정의해주고
이후에 만들 객체에 interface로 만든 타입을 갖도록 만들면 에러가 사라진다.
마찬가지로 인터페이스 속성에 `?`를 붙이면 옵션사항으로 정의할 수 있다.
```typescript
interface 인터페이스이름 {
 속성 : 타입;
 속성? : 타입; //선택 사항일 때
}
```

```typescript
interface Person {
    name : string;
    age? : number; // 옵션
}

const person:Person = {
    name : '이름',
};

console.log(person.name);
```

### 인터페이스 함수
인터페이스로 선언하여 함수의 타입을 먼저 결정해준 후 함수를 정의하였다.
```typescript
interface Sum{
    (num1:number, num2:number) : number;
  // (파라미터) : 반환 값
}

const add:Sum = function(num1, num2){
    return num1 + num2;
}

console.log(add(3,3));
```

### 인터페이스 클래스
클래스도 인터페이스로 만들 수 있다.
클래스가 확장 가능하듯이 인터페이스도 확장(extends)도 가능하다.

```typescript
interface User {
    name : string;
    sayHi() : void;
}

class Person implements User {
    name;
    constructor(name:string){
        this.name = name;
    }

    sayHi(){
        console.log(`Hi, ${this.name}`);
    }
}

const person1 = new Person('iu');
person1.sayHi();
```

### 인터페이스 확장하기
```typescript
interface User {
    name : string;
    sayHi() : void;
}

class Person implements User {
    name;
    constructor(name:string){
        this.name = name;
    }

    sayHi(){
        console.log(`Hi, ${this.name}`);
    }
}

const person1 = new Person('iu');
person1.sayHi();

/* 인터페이스 확장 */
interface UserInfo extends User {
    job : string
}

const person2 : UserInfo = {
    name : '아이유',
    job : '가수겸 배우',
    sayHi(){
        console.log(`Hi, ${this.name}`);
    }
}

person2.sayHi();
```
인터페이스를 확장해서 사용했다.


## readonly
읽기 전용 속성/배열로도 작성할 수 있다.
읽기 전용 속성은 `readonly` 라고 속성 이름 앞에 작성하면 된다.
읽기 전용 배열은 `ReadonlyArray<Type>`형태로 작성한다.

### 읽기 전용 속성
```typescript
interface Person {
    readonly name : string,
    age? : number
}

const person:Person = {
    name : '이름',
}

console.log(person.name);
person.name = '이름변경';
//Cannot assign to 'name' because it is a read-only property.
```

readonly 키워드로 작성된 속성을 변경하려고 하면 에러가 발생한다.

### 읽기 전용 배열
```typescript
const arr:ReadonlyArray<number> = [1,2,3];
arr.push(4);  // Error
// Property 'push' does not exist on type 'readonly number[]'.
```
읽기전용 배열에 push 메소드를 사용해 추가하려고 하면 에러가 발생한다.


-- --
> 참고 자료
[타입스크립트 핸드북](https://joshua1988.github.io/ts/guide/functions.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98-%ED%95%A8%EC%88%98)
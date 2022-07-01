> 리액트에서 객체를 함부로 바꾸지 마라. (불변성)

자바스크립트 문법중에 array와 관련된 내장 함수를 먼저 살펴보자.

```javascript
const array = [];
```

>

#### 1. pop, push, shift, unshift, splice

#### 2. concat, slice

## 1번 그룹과 2번 그룹에 적힌 배열 내장함수의 차이점이 무엇일까?

바로 1번 그룹은 원본 배열을 직접적으로 수정할 것이고
2번 그룹은 원본 배열을 수정하지 않고 새로운 배열을 만들어 반환할 것이다.

가급적 원본 배열을 직접적으로 수정하는 것을 사용하는 것은 좋지 않다.

이것의 연장선상으로 `리액트`에서도 마찬가지로 객체(배열, 오브젝트, 함수 등)를 함부로 바꾸지 말아야 한다.

> 객체를 함부로 바꾸지 말고 바꿔야 할 객체가 있다면 **복사해서 사용**해야 한다.

# 리액트의 setState

그렇기 때문에 class형 컴포넌트 문법 기준으로
`this.state.변수명 = 변경할 내용;` 대신
`this.setState({변경할 내용})` 과 같은 형태로 작성한다.

> 리액트에서는 state 변수를 바꿀 수 있는 방법으로 setState()를 사용한다.

# React Dev tools

코드와 렌더링된 브라우저 화면을 왔다갔다하는 불편함을 덜기 위해 데브툴즈를 이용할 수 있다.

[React Developer Tools 설치하기](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)

크롬에서 데브툴즈 설치하면 검사(F12)를 눌렀을 때 검사 탭에 Profiler와 Components가 생긴다.
`Profiler`는 성능 문제 해결할 때 사용한다.
`Components`는 컴포넌트, state, props와 같은 내용을 확인할 수 있다.

---

> 참고 자료

> [제로초 클래스 컴포넌트의 형태와 리액트 데브툴즈](https://www.youtube.com/watch?v=fpc7KnqFGrs&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=5&ab_channel=ZeroChoTV)

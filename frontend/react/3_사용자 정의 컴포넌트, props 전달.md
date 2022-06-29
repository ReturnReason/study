## JSX를 Javascript로 변환하기

> 리액트에서 작성한 JSX는 Babel이 JSX를 javascript로 변환해준다.

```jsx
<div>
  <h1 class="hello" id="title">
    Hello, world!
  </h1>
</div>
```

JSX에서 위와 같이 작성했다면 Babel은 이를 javascript로 다음과 같이 변경해 준다.

```javascript
'use strict';

React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    {
      class: 'hello',
      id: 'title',
    },
    'Hello, world!'
  )
);
```

조금 복잡해 보이지만 React의 createElement 라는 메서드를 사용하면 해당 태그 요소, 속성값, 들어갈 내용을 차례대로 인자로 받는 것 같다.

## JSX 주석 사용방법

> JSX 내부에서는 `{/* */}` 형태로 작성해야 한다.

```jsx
<div className="App">{/* 주석 작성하기 */}</div>
```

중괄호로 작성하지 않으면 화면에 렌더링되어 보여진다.

### 다음과 같은 형태로도 작성할 수 있다.

> 단, 열리는 태그 내부에서만 사용할 수 있다.

```jsx
<input
  type="text" // 태그 안에 주석넣기
/>
```

# Props

> props는 `properties`의 줄임말이다.

어떤 값을 컴포넌트에게 전달할 때 props를 사용한다.

## props를 전달해보자

먼저 `Test.js`라는 파일을 하나 만들었다.

```jsx
/* Test.js */
import React from 'react';

function Test(props) {
  return (
    <div>
      <h1>프롭스 전달하기</h1>
      <p>{props.name}</p>
    </div>
  );
}

export default Test;
```

Test 함수에 인자로 props를 받아올 것이라고 명시해준 후
내부에서 전달받은 `props.이름` 형태로 접근할 수 있다.
props는 오브젝트 형태로 전달되기 때문이다.

```jsx
/* App.js */
import React, { useState } from 'react';
import './App.css';
import Test from './Test';

function App() {
  return (
    <div className="App">
      <Test name="myProps" />
    </div>
  );
}

export default App;
```

![](https://velog.velcdn.com/images/reasonz/post/b3f6d4b8-c869-42a9-9f69-5fb00ed0e2af/image.png)

App.js에서 Test.js로 props를 전달했다.
전달할 때는 import 해온 컴포넌트 태그 안에 `작명=보낼데이터` 형식으로 작성한다.

```jsx
/* Test.js */
<p>{props.name}</p>
```

이 코드는 만약 class형 컴포넌트로 작성했다면 `{this.props.name}`로 작성해야 할 것이다.

```jsx
/* 클래스형 컴포넌트로 작성 */
class Test extends React.Component {
  render() {
    return (
      <div>
        <h1>프롭스 전달하기</h1>
        <p>{this.props.name}</p>
      </div>
    );
  }
}
```

## 사용자 정의 컴포넌트 렌더링

React 엘리먼트로 사용자 정의 컴포넌트를 사용할 수도 있다.

```jsx
const myComponent = <Test name="myProps" />;
```

myComponent라는 변수에 Test 컴포넌트를 할당했다.

```jsx
<> {myComponent}</>
```

중괄호 안에 컴포넌트를 담은 변수 이름을 작성해주면 컴포넌트를 화면에 렌더링할 수 있다.

![](https://velog.velcdn.com/images/reasonz/post/7c5d9409-836e-40af-af14-283727ff73b9/image.png)

React는 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체(props)로 전달한다.

> ### 컴포넌트의 이름은 항상 대문자로 시작해야 한다.
>
> 리액트는 `소문자로 시작`하는 컴포넌트를 `DOM 태그`로 처리하기 때문이다.
> 소문자로 시작하는 컴포넌트를 사용해야 한다면 대문자로 시작하는 변수에 할당한 후 해당 변수를 사용해야한다.

## 여러개의 props 전달하기

```jsx
/* App.js */
<Test name="myProps" color="skyblue" />
```

color 라는 props를 전달하여 폰트 색상을 변경해볼 것이다.

```jsx
/*Test.js*/
<p style={{ color: props.color }}>{props.name}</p>
```

Test.js 파일의 p태그의 인라인 속성으로 받아온 props를 작성해주었다.
style 태그는 `style={}`을 기본 형태로 갖고 `{}` 안에는 오브젝트 형태로 작성해 주면 된다.
여기서는 props 값을 받아와서 적용할 것이기 때문에 `style={{ color: props.color }}` 로 작성하였다.

![](https://velog.velcdn.com/images/reasonz/post/183e27c9-7206-4eff-8efd-d4b0660476f2/image.png)

> 비구조화 할당으로 코드 간결하게 만들기

현재 `props.color`와 `props.name` 두개의 props를 사용하고 있는데 `비구조화 할당`을 사용하면 조금 더 간결한 코드로 작성할 수 있다.

```jsx
import React from 'react';

function Test({ color, name }) {
  return (
    <div>
      <h1>프롭스 전달하기</h1>
      <p style={{ color: color }}>{name}</p>
    </div>
  );
}
export default Test;
```

여기서 p태그의 color props부분은 조금 더 간결하게 작성할 수 있다.

```jsx
<p style={{ color }}>{name}</p>
```

이름이 같기 때문에 하나로 축약해서 작성할 수 있다.

---

> 참고 자료

> [JSX의 기본 규칙 알아보기](https://react.vlpt.us/basic/04-jsx.html)

> [리액트 공식문서](https://ko.reactjs.org/docs/components-and-props.html)

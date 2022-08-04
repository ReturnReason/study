리액트로 만든 앱은 여러개의 컴포넌트로 이루어져 있다.
최상위 App 컴포넌트로 시작해서 트리 형태로 뻗어나간다.

부모 컴포넌트에서 자식 컴포넌트로 props가 전달이되는데, 이 props를 전달할 때는 부모 컴포넌트에서 자식 컴포넌트로 단계별로 전달해주어야 한다.

컴포넌트가 많지만 공통적으로 필요한 data 정보가 있다고 가정했을 때 (유저 정보라던가, 테마 등) 이런 전역 데이터를 프롭스로 전달해야 한다면, 부모 -> 자식 -> 자식의자식 -> 자식의자식의자식 .. 형태로 필요한 컴포넌트들에게 계속해서 props로 내려 보내주어야 해서 상당히 귀찮고 복잡해진다.

이러한 문제를 해결할 수 있는 방법으로 `Context` 가 있다.

# Context API

컨텍스트는 앱 안에서 전역적으로 사용되는 데이터들을 여러 컴포넌트가 쉽게 공유할 수 있는 방법을 제공해준다.

프롭스로 데이터를 하나씩 내려보내주지 않아도 하위 컴포넌트에서 필요하다면 해당 데이터 값에 접근할 수 있다.

컨텍스트를 사용하면 여러 컴포넌트가 사용해야 하는 전역적인 데이터를 사용할 때 편리하다.

## props 전달시 불편한 점

![](https://velog.velcdn.com/images/reasonz/post/c9caab1c-31dc-4bae-8d45-76bf1a04ffc4/image.png)

자식의 자식의 자식 컴포넌트인 3번 컴포넌트만 데이터를 필요로 함에도 불구하고 실질적인 데이터는 App 컴포넌트에 있기 때문에 불필요하게 1번과 2번 컴포넌트가 프롭스를 받아서 저 아래에 있는 3번 컴포넌트까지 넘겨주어야 한다.

컴포넌트가 필요하지 않은 프롭스를 전달 받아야하는 과정에서 잘못 전달할 수도 있고 에러발생시 프롭스를 전달하고 있는 컴포넌트마다 찾아가서 찾아야 할 수도 있다.

## useContext

위에서 확인한 것처럼 불필요한 과정 제거, 오류를 덜기 위한 방법으로 Context를 사용할 수 있다.

App에만 여러 컴포넌트가 사용할 수 있는 데이터를 가지고 있고, 이 App에 있는 데이터가 필요한 컴포넌트에 `useContext` 훅을 사용해서 해당 데이터를 받아올 수 있도록 할 수 있다.

## Context VS props

그렇다면, props를 굳이 사용할 필요가 없다고 느낄 수도 있을 것이다.
하지만, Context를 사용하면 컴포넌트를 재사용하기 어려울 수 있으므로 꼭 필요한 경우에만 context를 사용하는 것이 좋다.

props가 불필요하게 여러번 보내져야 할 때 (Prop drilling)라면 [Component Composition(컴포넌트 합성)](https://ko.reactjs.org/docs/composition-vs-inheritance.html)을 먼저 고려해보는 것이 좋다.

> **Prop drilling 이란**
> 데이터를 필요로 하는 멀리 있는 컴포넌트에게 여러번에 걸쳐 props로 전달하는 것을 의미하는 용어이다.

# useContext 사용방법

1-1. useContext export 방법1
context 폴더에 `작명.js` 파일을 만든 후 createContext를 import하고 createContext로 return 받은 변수를 export 해준다.

```jsx
/* MyContext.js */
import { createContext } from 'react';
export const MyContext = createContext(null);
```

1-2. useContext export 방법2
`1-1`번 방법으로 해도 되지만 `React.CreateContext`를 호출해서 반환 값을 담은 변수를 export 해주는 방법으로 사용할 수도 있다.

```jsx
export const MyContext = React.createContext();
```

2. App.js에서 import 해준다.

```jsx
/* App.js */
import { MyContext } from '파일경로';
```

3. Context로 만들어서 import한 `컴포넌트명.Provider` 로 태그를 만들어 준 후 value 속성 안에 전달할 데이터를 작성해준다.
   데이터가 여러개인 경우 객체 형태로 보내줄 수도 있다.

```jsx
/* App.js */
return (
	<MyContext.Provider value={{전달할 데이터1, 전달할 데이터2}}>
    	// 데이터를 공유할 컴포넌트 코드는 여기에
    </MyContext.Provider>
)
```

이제 value로 집어넣은 데이터를 props를 사용하지 않고도 접근할 수 있게 된다.

이제 MyContext.Provider로 감싸진 컴포넌트들은 value로 보낸 데이터들을 공유해서 사용할 수 있게 된다.

```jsx
/* context의 data를 사용할 컴포넌트 위치 */
import { MyContext } from '위치 경로';
```

사용할 때는 컨텍스트를 import 해와야 한다.

```jsx
const 프롭스대신컨텍스트 = useContext(MyContext);
```

`useContext(컨텍스트이름);` 을 사용해서 변수에 저장해보고 출력하든 확인해보면 이전에 value 속성으로 보낸 데이터들을 확인할 수 있다.
디스트럭처링 문법을 사용해서 꺼내와도 된다.

이제 import 해서 가져왔기 때문에 이 컨텍스트 데이터가 필요한 곳에서 props나 일반 state변수 사용할 때와 동일하게 사용할 수 있게 된다.

> Context API는 컴포넌트가 여러개 중첩될 때 사용하면 편리하지만, state가 변경됐을 때 다른 컴포넌트도 재렌더링돼서 성능 이슈가 있을 수 있다.
> 또, 컨텍스트 사용시 컴포넌트 재사용이 어려울 수도 있다.

### 사용법 요약 정리

1. 컨텍스트를 만든다.
2. 만든 컨텍스트 내보낸다. (export)
3. 데이터 가지고 있는애가 컨텍스트를 import 한다.
4. <컨텍스트.Provider value={데이터}> 태그로 컴포넌트를 감싸고 value에 공유할 데이터를 적는다.
5. 데이터 필요한 자식~자손 컴포넌트들이 컨텍스트를 import 한다.
6. useContext(컨텍스트) 반환 값을 변수에 저장해서 변수나 state처럼 사용한다.

---

> 참고 자료
> [React Hooks에 취한다 - useContext + Context API | 리액트 훅스 시리즈](https://www.youtube.com/watch?v=LwvXVEHS638&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=5&ab_channel=%EB%B3%84%EC%BD%94%EB%94%A9)

> [A better way of solving prop drilling in React apps](https://blog.logrocket.com/solving-prop-drilling-react-apps/)

> [리액트 공식문서 Context](https://ko.reactjs.org/docs/context.html)

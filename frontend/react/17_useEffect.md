> **Effect Hook**을 사용하면 함수 컴포넌트에서 class 컴포넌트의 componentDidMount, componentDidUpdate,
> componentWillUnmount를 사용할 수 있다.

# Life Cycle

useEffect는 컴포넌트의 라이프 사이클과 연관이 있다.
마운트 되었을 때, 업데이트 될 때, 언마운트 될 때로 구분할 수 있는데 mount는 시작됐을 때, update는 변경됐을 때, unmount는 마운트가 사라질 때(삭제될 때)로 나뉜다.

# useEffect

useEffect는 mount, update, unmount 될 때 코드를 실행할 수 있도록 하는 기능이다.

또, useEffect는 함수 컴포넌트에서 side effect를 수행할 수 있는데 예를 들면, 서버로부터 데이터를 가져온다거나, 수동으로 컴포넌트의 DOM을 수정하는 등의 행위를 의미한다.

클래스 컴포넌트의 생명주기 메서드를 함수 컴포넌트에서는 useEffect로 사용할 수 있다.

## useEffect 사용법

```jsx
import { useEffect } from 'react';
```

import 해온 후 useEffect 함수를 호출할 수 있다.

```jsx
useEffect(() => {
  // 1. 콜백만 넣는 경우
});
```

- mount, update될 때 실행된다.

```jsx
useEffect(() => {
  // 2. 두번째 인자로 빈 배열 또는 state 변수 배열을 넣는 경우
}, []);
```

- mount 될 때 실행된다.

```jsx
useEffect(() => {
  return () => {
    // 3. return으로 함수를 반환하는 경우
  };
});
```

- return에 작성한 함수가 useEffect 보다 먼저 실행된다.
- mount 될 때는 실행되지 않는다.

---

### 1. useEffect에 콜백 함수만 넣어보기

```jsx
import React, { useEffect, useState } from 'react';

function App2() {
  useEffect(() => {
    console.log('★useEffect★');
  });

  console.log('☆리액트 렌더링☆');
  return (
    <div>
      <div>useEffect 사용해보기</div>
    </div>
  );
}

export default App2;
```

먼저 useEffect를 import 해온 후 간단하게 console에 찍어보고 실행 시점을 확인해보기로 했다.

![](https://velog.velcdn.com/images/reasonz/post/e0072fce-e976-4db9-bd88-8f24bfaa768a/image.png)

useEffect에 작성한 `★useEffect★`가 `☆리액트 렌더링☆` 다음으로 콘솔에 출력되었다.

> 렌더링이 완료된 후 useEffect가 동작한다.

그렇다면 이제 state 변수를 하나 추가해보자.

```jsx
import React, { useEffect, useState } from 'react';

function App2() {
  const [count, setCount] = useState(0);
  const increase = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log('★useEffect★');
  });

  console.log('☆리액트 렌더링☆');
  return (
    <div>
      <div>useEffect 사용해보기</div>
      <p>{count}</p>
      <button onClick={increase}>증가</button>
    </div>
  );
}

export default App2;
```

![](https://velog.velcdn.com/images/reasonz/post/755c26ab-d576-467e-874c-e0e48d1f9931/image.png)

증가 버튼을 눌렀을 때 useEffect도 실행되는지 확인해보았다.

![](https://velog.velcdn.com/images/reasonz/post/8fd48e97-5b07-412f-843d-9e0f9698f245/image.gif)

증가 버튼을 누를 때마다 `☆리액트 렌더링☆` 과 `★useEffect★`이 콘솔에 계속 출력되는 것을 확인할 수 있었다.
즉, state가 바뀌어 리렌더링이 일어날 때마다 useEffect도 같이 실행된다는 것이다.

### 2-1. useEffect에 두번째 인자로 빈 배열 넣어보기

```jsx
useEffect(() => {
  console.log('★useEffect★');
}, []);
```

useEffect의 두번째 인자로 빈 배열을 작성해주었다.
다시 증가 버튼을 눌러서 확인해보자.

![](https://velog.velcdn.com/images/reasonz/post/c8507776-62bb-49d5-82c9-d93679387249/image.gif)

빈 배열을 넣으니 증가 버튼을 눌러도 `★useEffect★` 가 출력되지 않았다.

### 2-2. useEffect에 두번째 인자로 배열 안에 state 변수 넣기

```jsx
useEffect(() => {
  console.log('★useEffect★');
}, [count]);
```

state 변수인 count를 배열 안에 넣어보았다.

![](https://velog.velcdn.com/images/reasonz/post/ac7056b0-9fc3-4e81-b244-b6492f0b3618/image.gif)

useEffect에 두번째 파라미터를 작성하지 않았을 때와 동일하게 동작하고 있다. 넣지 않은 경우와 넣은 경우의 차이점을 조금 더 확인해보기 위해 state 변수를 하나 더 추가해보자.

```jsx
import React, { useEffect, useState } from 'react';

function App2() {
  const [count, setCount] = useState(0);
  const [onOff, setOnOff] = useState('off');

  const increase = () => {
    setCount(count + 1);
  };

  const onOffSwitch = () => {
    onOff === 'on' ? setOnOff('off') : setOnOff('on');
  };

  useEffect(() => {
    console.log('★useEffect★');
  }, [count]);

  console.log('☆리액트 렌더링☆');
  return (
    <div style={{ padding: '20px' }}>
      <div>useEffect 사용해보기</div>
      <p>{count}</p>
      <button onClick={increase}>증가</button>
      <p>{onOff}</p>
      <button onClick={onOffSwitch}>on/off</button>
    </div>
  );
}

export default App2;
```

onOff라는 state 변수를 하나 추가하고 on/off 버튼을 눌렀을 때 이 값이 true일 때 on, false면 off를 보여주도록 하였다.

![](https://velog.velcdn.com/images/reasonz/post/dc8b6f3a-e989-4162-a001-350fc05a8c7a/image.gif)

`☆리액트 렌더링☆` 만 출력되고 useEffect는 실행되지 않았다.

여기서 다음과 같은 결론을 얻을 수 있었다.

> 1. useEffect에 콜백 함수만 넣는 경우 어떤 state가 변경되는지 상관없이 무조건 리렌더링 될 때마다 useEffect가 실행된다.

> 2-1 두번째 파라미터로 빈 배열만 넣었을 때는 mount 되었을 때 1회만 동작한다.

> 2-2 두번째 파라미터로 배열 안에 state 변수를 넣으면 넣은 변수의 값이 바뀔 때마다 동작한다.

즉, 1번의 경우에는 무슨 state 값이 변경되든지 useEffect가 실행되고 2-2의 경우에는 `[배열 안에 넣은 state값]` 만 변경된다는 차이점이 있다.

### 3. useEffect return으로 함수를 반환하기

이번에는 useEffect에 return 값을 넣어보기로 했다.
return 함수가 실행되면 `자네는 언제 실행되는가` 가 콘솔에 출력될 것이다.

```jsx
import React, { useEffect, useState } from 'react';

function App2() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log('★useEffect★');

    return () => {
      console.log('자네는 언제 실행되는가');
    };
  });

  console.log('☆리액트 렌더링☆');
  return (
    <div style={{ padding: '20px' }}>
      <div>useEffect 사용해보기</div>
      <p>{count}</p>
      <button onClick={increase}>증가</button>
    </div>
  );
}

export default App2;
```

![](https://velog.velcdn.com/images/reasonz/post/3b620e76-f844-4916-bb3f-3306aab8282f/image.gif)

일단 페이지를 렌더링한 시점(mount)에는 동작하지 않았다.
증가 버튼을 눌러서 어떤 state의 변경이 일어나면 실행되는지 확인해보자.

![](https://velog.velcdn.com/images/reasonz/post/9c7536e8-a340-4ce0-8e02-18cf336b12f3/image.gif)

증가 버튼을 누르니 `자네는 언제 실행되는가` 가 출력되었다.
일단 처음 렌더링되었을 때는 동작하지 않았지만 어떤 state가 변경되어 리렌더링이 일어났을 때 발생하는 것 같다.

![](https://velog.velcdn.com/images/reasonz/post/07a2968f-873e-49da-bdd3-be4a7e14eb05/image.png)

또, 여기서 확인할 수 있는게 console 출력 순서이다.
`☆리액트 렌더링☆ -> 자네는 언제 실행되는가 -> ★useEffect★` 순서로 콘솔에 찍힌 것을 확인할 수 있다.

> 즉, 리렌더링 될 때는 useEffect보다 useEffect의 return 함수가 더 먼저 실행된다는 것이다.

useEffect보다 먼저 return 함수가 실행되므로 타이머를 제거하는 등의 clean-up(정리) 코드를 이곳에 작성해주면 되는 것 같다. 왜냐하면 타이머를 useEffect에 작성했다고 가정했을 때 useEffect보다 return 함수가 먼저 동작하기 때문이다. 타이머가 여러번 중복되어 실행되었을 수도 있으므로 성능 저하를 일으킬 수 있기 때문에 clearTimeout 함수를 return에 작성함으로 인해 이전에 실행중인 타이머를 제거할 수 있다.

---

> 참고 자료

> [리액트 공식문서 - Effect Hook](https://ko.reactjs.org/docs/hooks-effect.html)

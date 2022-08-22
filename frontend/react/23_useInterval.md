# useInterval

처음 useInterval을 보았을 때 setInterval이 아니라 useInterval? 이런 `hooks`도 존재하는건가?..
**그러면 setInterval과 차이점이 뭐지?** 하는 의문점이 들었다.

> useInterval을 구글링해보니 `Dan Abramov` 님께서 만든 커스텀 훅이였다는 것을 확인할 수 있었다.

[Dan Abramov](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)님의 블로그에 있는 코드를 인용하였다.

```jsx
import React, { useState, useEffect, useRef } from 'react';

function Counter() {
  let [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}
```

코드를 살펴보면 `useInterval`이 눈에 띈다.
useInterval의 인자로 콜백함수와 delay를 넘겨주는 것을 보면 setInterval과 사용하는 부분에서는 큰 차이는 없어 보였다.

### 그렇다면 useInterval은 도대체 어떻게 생긴 코드인가?

```jsx
import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```

위 코드는 Dan Abramov님이 만든 사용자 정의 hook인 useInterval 함수이다.

> 코드가 어려워서 나름대로 해석해보려고 했는데 쉽지 않은 것 같다. 😥

앞선 코드 예제에서 콜백함수와 딜레이를 인자로 받아왔기 때문에 useInterval의 파라미터인 callback과
delay는 이것을 의미하고 있다.

첫번째 useEffect는 callback 값이 바뀔때마다 호출될 것인데 그때마다 savedCallback.current 값으로 현재 콜백함수를 담아준다.

두번째 useEffect는 delay 값이 바뀔 때마다 호출될텐데 tick이라는 함수가 현재 savedCallback에 담긴 함수를 호출하고 있다.
그리고 delay가 null이 아닐때 id 변수 값으로 tick과 delay를 인자로 넘겨서 setInterval을 호출하고 있다.
마지막 리턴 값으론 클린 업 코드가 작성되어 있다.

나름대로 코드 분석해서 이해해보려고 했는데 사실 아직도 잘 모르겠다. ㅋㅋㅋ 직접 써보고 차이점을 확인하는 수 밖에 없을 것 같다..!

---

> useInterval을 직접 사용해보기 전에 useInterval과 비교를 위해 setInterval로 카운트 만들어보기

## 매우 잘못된 코드

아직도 리액트 초보긴 하지만 지금보다 더 미숙했다면 나는 다음과 같이 코드를 짰을 것 같다.
물론 지금도 까먹으면 저렇게 짤 것 같아서 미래에 까먹을 나를 위해 작성해보기로 했다!

```js
import { useEffect, useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const wait = () => {
    clearInterval(interval);
    setTimeout(() => {
      interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="App">
      <h2>{count}</h2>
      <button onClick={wait}>1초 멈추고 다시 실행</button>
    </div>
  );
}
```

일단 매우 잘못된 코드부터 먼저 작성해보았다.
처음 컴포넌트가 마운트됐을 때부터 count 변수 값이 계속 1씩 증가하는 코드이다.

![](https://velog.velcdn.com/images/reasonz/post/d8290e78-fdae-4384-acf1-4ba6a6768585/image.gif)

예상한대로 0부터 약 1초간격으로 count가 1씩 증가하고 있다.

그냥 렌더링한 화면만 봤을 때는 크게 문제될 것 같아 보이진 않지만 문제는 저 '버튼'을 누른 다음에 발생하는 일이다. ㅋㅋ

![](https://velog.velcdn.com/images/reasonz/post/bbc73044-2ae7-47a5-b332-c23ea7010e0e/image.gif)

`1초 멈추고 다시 실행` 버튼을 1회 클릭하였다.
숫자가 잠깐 멈춰있다가 1초 후 다시 기존 count 변수에 1씩 더해지고 있다. 아직까지도 외관상엔(?) 문제가 없어 보인다. 🤔

### 1초 멈추고 다시 실행을 한번에 여러번 누르면?

이때부터 문제가 생긴게 보인다.

![](https://velog.velcdn.com/images/reasonz/post/2163b626-723f-4932-a066-46cf79684296/image.gif)

갑자기 1씩 잘 올라가던 count가 고장난 것이다!
아니 왜???? 잘 되다가 갑자기?? 싶겠지만 당연히 코드를 잘못 짰으니까.....ㅠㅠ
고장의 원인까지는 내공이 부족해서 확신하진 못하겠지만.. 아마 클로저가 생겨서 저렇게 고장난게 아닐까 추측해본다..

문제의 코드를 조금 고쳐보기로 했다.

```jsx
import { useEffect, useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  let interval;

  useEffect(() => {
    countNumber();
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const countNumber = () => {
    interval = setInterval(() => {
      setCount((prevCount) => {
        return prevCount + 1;
      });
    }, 1000);
  };

  const wait = () => {
    clearInterval(interval);
    setTimeout(countNumber, 1000);
  };

  return (
    <div className="App">
      <h2>{count}</h2>
      <button onClick={wait}>1초 멈추고 다시 실행</button>
    </div>
  );
}
```

count가 변경될 때 이전 값을 가지고 +1 하면 고쳐지겠군! 이라는 생각으로 setCount 부분의 코드를 수정하였다. 중복되는 코드 부분은 countNumber 라는 함수로 만들어보았다.

![](https://velog.velcdn.com/images/reasonz/post/bf487e6d-3310-4304-b967-485b8c750d54/image.gif)

렌더링도 똑같이 잘 되고

![](https://velog.velcdn.com/images/reasonz/post/0b1d6c95-0b85-4ea6-8aac-3ccbe383d877/image.gif)

버튼 한번 눌렀을 때도 잘 멈췄다가 다시 잘 가고..
그리고 문제의 n번 클릭은 어떻게 될까

![](https://velog.velcdn.com/images/reasonz/post/41335460-0acb-423d-9c61-202f5001de75/image.gif)

이번에는 갑자기 카운트가 급발진하는 버그가 발생했다.
조금 더 코드를 고쳐보자..

```jsx
import { useEffect, useState, useRef } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(1);
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(countNumber, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [count]);

  const countNumber = () => {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  const wait = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;

      setTimeout(() => {
        interval.current = setInterval(countNumber, 1000);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <h2>{count}</h2>
      <button onClick={wait}>1초 멈추고 다시 실행</button>
    </div>
  );
}
```

interval을 useRef로 바꾸고 그와 관련된 코드도 수정해보았다.
이부분은 사실 작성하면서도 헷갈리긴 했는데 더 자주 사용해봐야 될 것 같다..ㅎㅎ..

이제 문제의 그 부분만 다시 확인해보자.

![](https://velog.velcdn.com/images/reasonz/post/bb8cc750-5368-4c3b-b241-de4b4181fe83/image.gif)

이제 아무리 막 눌러도 숫자가 고장나지 않고 원했던 동작대로 실행된다!

```jsx
interval.current = null;
```

위 코드에서 wait 함수 내부에서 if 조건문 안에 작성한 이 코드가 없으면 다시 버그가 발생한다. ㅋㅋ

머릿속으로는 아 이렇게 하면 고쳐지겠다! 했던 것도 막상 뇌피셜과 다르게 동작해서 당황을 시킬 때가 많다.

> 이제 다음에 해볼 것은 초반에 살펴본 `useInterval`로 코드를 수정해보는것..!! 인데 아직 useRef 활용하는 것도 익숙치 않아서 가야할 길이 먼 것 같다ㅎㅎㅎ,,

짱어려운 리액트 😑

---

> 참고 자료

> [Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

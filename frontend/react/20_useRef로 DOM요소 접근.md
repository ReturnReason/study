[1. 리액트 useRef](https://velog.io/@reasonz/2022.08.02-%EB%A6%AC%EC%95%A1%ED%8A%B8-useRef)

## useRef로 DOM 접근하기

useRef를 사용하면 DOM요소에 직접 접근할 수 있다.

```jsx
const ref = useRef(value);
/* { current : value } 를 반환함 */
```

HTML 요소 태그 중 접근하고자 하는 태그의 속성에 ref를 넣어주면 된다.

```html
<input ref="{" ref } />
```

보통 input 태그의 포커스를 줄 때 많이 사용된다.
클릭하지 않아도 자동으로 포커스가 생기기 때문이다.
ref를 사용하면 DOM 요소에 접근할 수 있다.

```jsx
import { useRef, useEffect } from 'react';

export default function App() {
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="App">
      <input ref={ref} type="text" placeholder="아이디 입력" />
      <button>확인</button>
    </div>
  );
}
```

인풋 태그 안에 ref 속성으로 useRef 반환 값을 담은 변수 이름을 작성해주면 된다.

useEffect를 사용해서 처음 화면이 렌더링됐을 때만 인풋 태그에 포커스가 되도록 작성한 코드이다.

![](https://velog.velcdn.com/images/reasonz/post/0a669c91-afef-43f9-8bd0-f268a608da69/image.gif)

페이지를 새로고침하면 바로 인풋창에 포커스가 생기는 것을 확인할 수 있다.

```js
console.log(ref);
```

![](https://velog.velcdn.com/images/reasonz/post/17d7a75f-fce8-419f-8797-8c7f3894ca0a/image.png)

콘솔에 찍어 확인해보면 current에 input 태그가 담긴 것을 확인할 수 있다.
input에 포커스를 줄 때 `ref가담긴변수명.current.focus()` 를 사용해야 하는 이유도 여기에 있다.

---

> 참고 자료

> [React Hooks에 취한다 - useRef 완벽 정리 2# DOM 요소 접근](https://www.youtube.com/watch?v=EMK8oUUwP5Q&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=4&ab_channel=%EB%B3%84%EC%BD%94%EB%94%A9)

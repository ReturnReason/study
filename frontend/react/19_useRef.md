# useRef

함수형 컴포넌트에서 useRef를 호출하면 ref 오브젝트를 반환해준다.

```jsx
const ref = useRef(초기값);
// { current : 초기값 }
```

`변수명.current`로 접근하여 초기값을 변경할 수 있다.

```jsx
const ref = useRef('레프레프');
ref.current = '안녕!';
```

반환된 ref는 렌더링 여부와 관계없이 값을 그대로 유지할 수 있다. (unmount 되기 전까지)

## useRef가 사용되는 유용한 순간

- 어떤 값을 저장할 때!
  state를 사용한다면 state가 변경될 때 리렌더링되면서 컴포넌트 내부 변수가 초기화 되기 때문에 변하지 않는 값이 필요하다면 ref를 사용할 수 있다.
  ref의 값이 변경될 때는 리렌더링이 되지 않는다. state 대신 ref를 사용하면 불필요한 렌더링을 막을 수 있고, 컴포넌트가 렌더링되어도 ref의 값이 변경되지 않고 유지된다.

- DOM 요소에 접근할 때!
  예를 들면 input창에 focus()를 주고 싶을 때 사용할 수 있다.
  input을 마우스로 클릭하지 않아도 자동으로 포커스가 되어있다면 바로 키보드로 입력할 수 있는데 ref를 사용하면 이러한 상황을 처리할 수 있다.

> useRef는 변화는 감지하지만 리렌더링을 발생시키지 않는다.

---

> 참고 자료

> [React Hooks에 취한다 - useRef 완벽 정리 1# 변수 관리 | 리액트 훅스 시리즈](https://youtu.be/VxqZrL4FLz8)
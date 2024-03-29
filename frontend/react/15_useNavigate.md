> react-router-dom

# useNavigate
useNavigate는 페이지를 이동할 때 사용된다.
Link를 써도 페이지 이동을 시킬 수 있지만 단순하게 이동만 시켜야 하는 경우 Link를 사용하면 좋고
useNavigate를 사용하면 특정 이벤트가 실행됐을 때 동작하도록 하거나 추가적인 로직이 필요한 경우 useNavigate를 사용한다.

### 사용방법

```jsx
import { useNavigate } from 'react-router-dom';
```
1. react-router-dom으로부터 useNavigate를 import 해온다.

```jsx
const navigate = useNavigate();
```
2. useNavigate를 호출하면 양식이 제출된 후 프로그래밍 방식으로 탐색할 수 있는 함수를 반환한다고 공식문서에 나와있는데 이것을 변수에 담는다.

이제 navigate 변수는 첫번째 인자로 이동시킬 페이지의 `주소` 를 넣거나 `-1` 과 같은 값을 넣어 페이지 히스토리의 뒤로가기 버튼과 같은 동작을 시킬 수도 있다.

두번째 인자는 선택사항(옵션)인데 `{replace : true}` 로 설정하는 경우 새 항목을 추가하는 대신 기록 스택의 현재 항목을 대체한다고 하는데 아직 무슨 의미인지 잘 모르겠으므로 나중에 사용할 일이 생기면 그때 다시 기록해보기로 하고 우선은 패스..ㅜㅜ

```jsx
<button onClick={() => { navigate('/about'); }}>
  어바웃 페이지로 이동하기
</button>
```
3. 클릭 이벤트와 함께 사용한 예시이다.
버튼을 클릭했을 때 `/about` 페이지로 이동 시킬 수 있다.

또는 다음과 같이 페이지 이전, 다음과 같은 형태로도 사용할 수 있다.

```jsx
<button onClick={() => { navigate(-1); }} >
이전 페이지로 이동하기
</button>
```
navigate 함수의 인자로 -1과 같은 숫자를 넣어서 이전 페이지로 이동시킬 수도 있다.
(음수는 이전 페이지, 양수를 넣으면 다음 페이지)

-- --
> 참고 자료
[리액트 라우터](https://reactrouter.com/docs/en/v6/hooks/use-navigate)

> 리액트 라우터로 중첩 라우팅(nested routing) 하는 방법

중첩 라우팅이란 서브 페이지를 만든다고도 할 수 있는데 해당하는 페이지에서 조금 더 구체적으로 구분을 지어 화면을 교체(표시) 해줄 필요가 있을 때 사용된다.

예를 들면, 쇼핑몰 상세 페이지가 있을 것인데
`myshop/products` 라는 주소로 입력했을 때는 단순히 쇼핑몰에 게시된 상품들이 나열되어 있다고 가정해보자.

여러 상품들 중 하나의 상품을 클릭하면 해당하는 상품의 상세 페이지를 보여주고 싶을 때 중첩 라우팅을 사용할 수 있다.

`myshop/products/01`과 같은 URL을 입력했다면 쇼핑몰 상품의 01번째 아이템 페이지가 나타나야 한다.

## 리액트 라우터 사용하기

```jsx
import { BrowserRouter } from 'react-router-dom';
```

```jsx
/* index.js */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

index.js 파일에서 App 컴포넌트를 BrowserRouter가 감싸도록 작성해준다.

## React nested routes

중첩된 라우터를 사용하려면 다음과 같이 react router dom으로부터 import 해온다.

```jsx
import { Routes, Route, Link } from 'react-router-dom';
```

```jsx
function App() {
  return (
    <div className="App">
      <div className="nav-btn">
        <button>
          <Link to="/"> HOME </Link>
        </button>
        <button>
          <Link to="/about"> ABOUT </Link>
        </button>
        <button>
          <Link to="/products"> PRODUCTS </Link>
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products" element={<Products />}></Route>
      </Routes>
    </div>
  );
}
```

Home, About, Products라는 컴포넌트를 하나씩 만들어서 import 해온 후 Route에 path와 element를 작성해주었다.
여기까지는 기본적인 라우터 작성 방법이다.

![](https://velog.velcdn.com/images/reasonz/post/86158e92-d173-4f24-878b-8fc845af3ce6/image.gif)

이제 서브 페이지(중첩 라우팅)을 작성해볼 것이다.
About 페이지에 서브 페이지를 추가해보자.

```jsx
<Route path="/about" element={<About />}>
  <Route path="location" element={<Location />}></Route>
</Route>
```

Route 안에 중첩(자식) Route를 작성해서 서브 페이지를 만들어 줄 수 있다.
서브 페이지의 path는 `/` 를 생략하고 작성하면 된다. 마찬가지로 element는 보여줄 컴포넌트 또는 HTML 태그를 작성해주면 된다.

현재는 /about/location URL로 접속해도 아무런 변화가 없을 텐데 `Outlet`으로 부모 라우트의 컴포넌트에서 자식 라우트 컴포넌트의 위치를 지정해주어야 하기 때문이다.

## Outlet

```jsx
/* About.js */
import { Outlet } from 'react-router-dom';

function About() {
  return (
    <div>
      <div>
        <h2>여기는 About 페이지입니다.</h2>
        <p>대충 쇼핑몰 페이지라는 뜻</p>
      </div>
      <Outlet />
    </div>
  );
}
```

부모 라우터 컴포넌트에서 Outlet을 import 해준 후 서브 페이지가 보여질 위치를 Outlet으로 지정해준다.

![](https://velog.velcdn.com/images/reasonz/post/08297ac7-70b5-4043-84e2-2d8c7271f5a5/image.gif)

Outlet으로 지정해준 자리에 서브 페이지로 보여줄 컴포넌트가 나타난다.

## Outlet 없이 서브 페이지 라우팅

```jsx
/* App.js */
<Routes>
  <Route path="/" element={<Home />}></Route>
  <Route path="/about/*" element={<About />}></Route>
  <Route path="/products" element={<Products />}></Route>
</Routes>
```

`/about/*` 와 같이 와일드 카드(\*)를 사용해서 about/ 주소 뒤에 무언가 더 올 수 있다고 명시를 해준다.
이후 해당 컴포넌트 (About)으로 가서 서브 페이지로 렌더링할 Routes와 Route를 작성해주면 된다.

```jsx
function About() {
  return (
    <div>
      <div>
        <h2>여기는 About 페이지입니다.</h2>
        <p>대충 쇼핑몰 페이지라는 뜻</p>
      </div>
      <Routes>
        <Route path="/location" element={<Location />}></Route>
      </Routes>
    </div>
  );
}
```

서브 페이지가 보여질 위치에 Routes와 Route를 작성해주면 된다.
여기서 path 부분은 `/` 를 제외하고 작성해도 동일하게 동작한다.

Outlet을 사용했을 때와 동일하게 중첩 라우팅이 된다.

---

> 참고 자료

> [리액트 라우터](https://react.vlpt.us/react-router/01-concepts.html)

> [리액트 라우터 공식 문서](https://reactrouter.com/docs/en/v6/components/outlet)

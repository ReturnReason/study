

# CSR과 SSR
웹 브라우저의 렌더링 방식으로 클라이언트 측에서 렌더링이 되는지, 
서버 측에서 렌더링이 되는지에 따라 (Client Side Rendering), SSR(Server Side Rendering)으로 나뉜다.

<br>

## CSR (클라이언트 사이드 렌더링)
CSR은 자바스크립트를 사용하여 브라우저에서 페이지를 직접 렌더링하는 것을 의미한다. SPA(Single Page Application)트렌드로 Angular, React, Vue 등의 프레임워크가 인기를 끌면서 CSR이 대두되기 시작했다.

CSR의 특징은 웹 브라우저의 HTML이 기본적인 뼈대만 구성되어 있고 자바스크립트 파일을 다운받아 브라우저에서 동적으로 HTML을 구성하게 된다. 이로 인해 페이지의 초기 로딩 시간이 느리다.
사용자의 인터렉션에 따라 필요한 부분만 렌더링하는 방식으로 인해 화면의 깜박임 없이 하나의 어플리케이션을 사용하는 것처럼 느껴진다는 장점이 있다.

<br>

### CSR 장점
1. 리로딩이 없어 인터렉션이 빠르다.
2. 화면의 깜박임이 없어 사용자 경험이 좋다.

<br>

### CSR 단점
1. 페이지의 초기 로딩 시간이 지연될 수 있다.
2. SSR에 비해 SEO(검색 엔진 최적화)가 좋지 않다.

<br>

## SSR (서버 사이드 렌더링)
클라이언트에서 모든 것을 처리하는 것이 아닌 서버에서 필요한 파일을 모두 가져와서 HTML을 만들고 동적으로 제어할 수 있는 소스를 포함하여 클라이언트로 보내준다. 즉, 서버가 페이지를 모두 구성하여 클라이언트로 보내주는 방식이다.

<br>

### SSR 장점
1. 페이지 초기 로딩이 빠르다.
2. 모든 컨텐츠가 HTML에 담겨져 있어서 SEO(검색엔진최적화)가 좋다.

<br>

### SSR 단점
1. 페이지를 이동하면 화면 깜박임이 있다. (사용자 경험이 좋지 않다.)
2. 동적인 컨텐츠가 많으면 CSR보다 비용이 증가할 수 있고 서버 과부하에 걸리기 쉽다.
3. 사용자가 사이트를 볼 수 있는 시간과 인터렉션이 가능한 공백 시간이 있다. (페이지 로딩은 되었지만  자바스크립트가 늦게 받아와져서 사용자가 클릭해도 반응이 없는 문제 등)

<br>

## CSR과 SSR 중에 어떤 것을 선택해야하나?
두가지 모두 장점과 단점이 있기 때문에 어느 것이 더 좋다고 보기 어렵다. 
기술적 한계, 서비스 구성 등을 따져보고 CSR과 SSR의 장단점에 따라 선택하는 것이 좋다.

<br>
<br>

-- --
> 참고 자료
[구글 웹 렌더링](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#static-rendering)
[드림코딩 by 엘리 서버사이드 렌더링](https://www.youtube.com/watch?v=iZ9csAfU5Os&ab_channel=%EB%93%9C%EB%A6%BC%EC%BD%94%EB%94%A9by%EC%97%98%EB%A6%AC)
[SSR VS CSR](https://medium.com/walmartglobaltech/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)
[네이버 블로그가 CSR에서 SSR로 전환한 이유](https://d2.naver.com/helloworld/7804182)
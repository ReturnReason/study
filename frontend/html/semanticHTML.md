# 의미있는 HTML?

공부를 하다보면 문서나 유튜브 등에서 시맨틱하게 HTML을 작성해야 한다는 말을 종종 듣곤 했다. 시맨틱한 태그가 도대체 뭘까? 시맨틱 단어 자체만 가지고 본다면 '의미의'라는 뜻이다.
즉, 의미있는 HTML 태그 작성을 해야 한다는 건데 어떻게 하면 의미있는 태그 작성을 할 수 있는지 궁금해졌다.
`div`나 `span`말고도 다른 태그를 이용하여 시맨틱한 HTML 작성을 위해 공부해보고자 한다.

<br>

## 시맨틱한 태그의 장점

시맨틱하게 작성한 HTML태그는 브라우저 뿐만 아니라 개발자에게도 해당 HTML 요소가 어떤 것을 뜻하는지 명확히 알려줄 수 있다. 검색 엔진 최적화(SEO)도 좋아지고 원하는 코드를 찾는데 더 편리하다.

<br>

## 시맨틱하지 않은 태그 (non-semantic)

시맨틱하지 않은 태그라 하면 대표적으로 `<div>`와 `<span>`이 있을 것이다.
특별히 어떤 의미를 담지 않고 있다 보니 아무데나 막 사용할 수 있다는 장점(?)이 있다.
특히 많은 웹 사이트를 둘러보면 컨테이너 역할을 위해 블록 요소인 `<div>`태그 사용이 빈번한 것을 확인할 수 있다. 시맨틱하지 않은 태그의 문제점이라 하면 장점이자 단점인 `아무런 의미없이 사용 된다`는 점일 것이다.
작성할 때는 편하게 사용할 수 있지만 막상 이 태그가 의미하는 바가 무엇인지 알기 어렵다.

<br>

# HTML Semantic Elements

의미없는 태그를 대신할 수 있는 시맨틱한 태그들이다.
물론 의미없는 태그도 적절히 섞어서 사용해야겠지만 웹 사이트의 큰 레이아웃들은 아래 시맨틱 요소들을 참고하여 작성하는 것이 좋다.

| index |     태그명     |                                                       용도                                                       |
| :---: | :------------: | :--------------------------------------------------------------------------------------------------------------: |
|   1   |  `<article>`   |            블로그 글, 뉴스와 같이 독립적 구분되거나<br> 재사용하여 배포할 수 있는 콘텐츠를 나타낸다.             |
|   2   |   `<aside>`    |                                 문서의 내용과 간접적으로 연관된 부분을 나타낸다.                                 |
|   3   |  `<details>`   |                         open 상태인 경우에만 정보를 보여주는 위젯을 생성할 때 사용된다.                          |
|   4   | `<figcaption>` |                     부모 `<figure>` 요소가 포함하는 다른 콘텐츠의 설명이나 범례를 나타낸다.                      |
|   5   |   `<figure>`   |                                      독립적인 콘텐츠를 표현할 때 사용한다.                                       |
|   6   |   `<header>`   |                                페이지 헤더로 들어갈 제목이나 로고 등에 사용된다.                                 |
|   7   |    `<main>`    |                           페이지 내 주요 컨텐츠를 작성할 때 사용한다. (유일해야한다.)                            |
|   8   |    `<nav>`     | 문서 내에서 다른 페이지 또는 현재 페이지의 링크를 보여줄 때 사용한다. <br> 메뉴, 목차, 색인 등에 사용할 수 있다. |
|   9   |  `<section>`   |                               로 내용이 비슷비슷한 컨텐츠들을 작성할 때 사용한다.                                |
|  10   |  `<summary>`   |               요약할 때 사용하는 태그이다. <br> 보통 `<details>` 태그의 첫 번째 자식으로 사용된다.               |
|  11   |    `<time>`    |                                         시간을 나타내는 태그로 사용된다.                                         |
|  12   |    `footer`    |                 저작권, 연락처 정보, 사이트맵, 관련문서 등과 같이 사이트의 최하단에서 사용된다.                  |

---

<br>

## 1. article

`<article>`안에 `<article>`을 자식 요소로 가질 수 있다.
중첩 사용시 바깥쪽 article과 관련된 글을 나타낸다. 예를 들면, 블로그 글 - 댓글이 있다.
`<article>`태그 안에는 `h1~h6`요소를 넣어 각각의 `<article>`을 식별하는 방법을 사용한다.
독립적으로도 사용이 가능한 컨텐츠를 article 태그를 사용하여 작성하면 된다.
(article을 떼어내고 단독으로 사용하거나, 다른데 가져다 놓아도 의미가 그래도 유지될 수 있는 컨텐츠)
9번에서 살펴볼 `<section>`과 비슷한데 차이점이라하면 `<article>`에 작성된 콘텐츠는 똑 떼서 다른곳에 사용할 수 있는 독립적인 컨텐츠라는 점이다

section을 article로 묶어 사용하거나, article을 section으로 묶어서 사용해도 된다.
(누가 부모가 되든 상관이 없다.)

![](https://velog.velcdn.com/images/reasonz/post/5629c482-6694-4311-bb51-863ad1d907d6/image.png)

```html
<h1>Article 태그</h1>
<article class="article-container">
  <aritcle class="content">
    <h2>글 제목</h2>
    <time datetime="2022-04-17">날짜</time>
    <p>글 내용</p>
  </aritcle>
  <aritcle class="content">
    <h2>Title</h2>
    <time datetime="2022-04-17">2022.04.17</time>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum praesentium optio, consectetur corporis molestiae dolor consequuntur? Tenetur illum quia magni adipisci? Ex hic repellendus alias amet voluptate sit, voluptatibus quod.</p>
  </aritcle>
</article>
```

<br>

## 2. aside

핵심 컨텐츠가 아닌 문서의 별도 컨텐츠를 의미한다. 예를 들면, 배너나 광고, 핵심 컨텐츠와 관련된 부가적인 정보가 aside에 해당된다.

![](https://velog.velcdn.com/images/reasonz/post/d7902668-a1e0-46d3-a481-66a810492687/image.png)

```html
<h1>Article 태그</h1>
<div class="container">
  <aritcle class="content">
    <h2>글 제목</h2>
    <time datetime="2022-04-17">날짜</time>
    <p>글 내용</p>
  </aritcle>
  <aside>광고</aside>
</div>
```

![](https://velog.velcdn.com/images/reasonz/post/d06be98e-3d24-4b86-9751-4bcc98646bd0/image.png)

```html
<h1>Article 태그</h1>
<div class="container">
  <aritcle class="content">
    <h2>오늘의 날씨</h2>
    <time datetime="2022-04-17">2022.04.17</time>
    <p>맑음</p>
  </aritcle>
  <aside>
    <p>날씨는 그날 그날의<br />기상 상태를 의미한다.</p>
  </aside>
</div>
```

<br>

## 3.details

`<details>`태그는 클릭하여 "open"상태일 때 내부 정보를 보여주는 위젯을 생성한다.
태그 속성에 `open`을 넣으면 내부 정보를 처음부터 열려있는 상태로 나타낼 수 있다.
`<details>`태그를 사용하면 기본 값으로 `▶ 세부정보`와 같은 형태가 나타나는데 이 미리보기 제목레이블을 바꾸기 위해서는 `<details>` 안 첫번째 자식으로`<summary>`태그에 요약할 내용을 작성하면 된다.

![](https://velog.velcdn.com/images/reasonz/post/82da36e6-c1b0-4e19-88c6-e41d2876018d/image.gif)

```
<details>
  <summary>눌러보세요.</summary>
  <p>내용</p>
</details>
```

<br>

## 4.figcaption

`figcaption`의 자식으로 사용되며 부가적인 내용을 추가할 수 있다. (캡션과 같은 형태로 사용)

```html
<figure>
  <img src="#" alt="img" />
  <figcation> 이미지에 대한 설명 </figcation>
</figure>
```

<br>

## 5. figure

독립적인 콘텐츠를 표현할 때 사용한다. 보통 부록으로 들어가는 이미지, 삽화, 도표와 같은 컨텐츠가 들어간다.
4번에서 살펴봤던 `figcaption`을 자식 요소로 넣어 부가적인 설명도 추가할 수 있다.

<br>

## 6. header

페이지 헤더로 들어갈 제목이나 로고 등에 사용된다.
`<article>`태그 등의 자식 태그로 사용되는 경우가 많으며 제목, 로고, 네비게이션을 정의할 때 사용한다.

```html
<header>
  <h1>헤더</h1>
  <nav>
    <ul>
      <li><a href="#">메뉴1</a></li>
      <li><a href="#">메뉴2</a></li>
      <li><a href="#">메뉴3</a></li>
    </ul>
  </nav>
</header>
```

<br>

## 7. main

`<body>`태그의 주요 콘텐츠를 나타낸다. 즉, 페이지 내의 핵심적인 컨텐츠를 작성할 때 사용한다.
하나 이상의 main 태그는 사용하지 않도록 한다. (문서의 유일한 내용이어야 함)

```html
<main>
  <h1>사이트 제목</h1>

  <article>
    <h2>제목</h2>
    <p>내용</p>
  </article>

  <article>
    <h2>제목</h2>
    <p>내용</p>
  </article>
</main>
```

<br>

## 8. nav

현재 페이지 내, 다른 페이지의 링크로 연결되는 것들을 나타낼 때 사용한다.
보통 메뉴, 목차, 색인을 나타낼 때 사용한다.

```html
<nav>
  <ul>
    <li><a href="#">메뉴1</a></li>
    <li><a href="#">메뉴2</a></li>
    <li><a href="#">메뉴3</a></li>
    <li><a href="#">메뉴4</a></li>
  </ul>
</nav>
```

<br>

## 9. section

콘텐츠를 분리하여 다른데 붙여놓아도 되는 경우엔 `<article>`태그를 사용하고, 서로 내용이 비슷비슷한 컨텐츠들을 작성할 때는 `<section>`태그를 사용하면 된다. section을 article로 묶어 사용하거나 article을 section으로 묶어서 사용해도 된다.
일반적인 스타일링을 위한 컨테이너로 사용한다면 section이 아닌, `<div>`태그를 사용해야 한다.

```html
<section>
  <h2>section 태그</h2>
  <p>일반 컨테이너로는 사용하지 말것.</p>
</section>
```

<br>

## 10. summary

요약을 나타내는 태그이다. 3번에서 살펴봤던 `<details>`태그의 첫번째 자식으로 사용된다.

<br>

## 11. time

시간을 나타내는 태그로 datetime 속성을 넣어서 사용한다. (datetime 속성은 필수는 아니다.)
유효한 datetime의 값이 있으니 참고하여 작성하면 된다.
[유효한 datetime](https://developer.mozilla.org/ko/docs/Web/HTML/Element/time)

```html
<time datetime="2022-04-07">2022년 04월 07일</time>
```

<br>

## 12. footer

바닥글에 사용되어 사이트 하단에 사이트 맵, 관련 문서, 저작권 정보와 같은 내용을 작성한다.

```html
<footer>
  <p>Portions of this content are ©1998–2022 by individual mozilla.org contributors.</p>
</footer>
```

<br>

---

> 참고 자료

> [W3school html semantic elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

> [MDN Semantics](https://developer.mozilla.org/ko/docs/Glossary/Semantics)

> [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

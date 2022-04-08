
> DOM과 BOM은 Window 객체 안에 소속된 객체이다.

<br>

# DOM (Document Object Model)
DOM(문서 객체 모델)은 XML, HTML 문서에 접근하기 위한 일종의 인터페이스이다.
W3C의 표준화한 API들이 기반이 되며, 브라우저의 렌더링 엔진이 HTML 문서를 로드하고 파싱하여 브라우저가 읽을 수 있는 구조로 구성하여 메모리에 적재하는 것이 DOM이다.
흔히 사용하는 html 태그(객체)가 여기에 포함되는 것이다.

<br>


자바스크립트는 이 객체 모델을 이용하여 HTML 요소, HTML 객체를 선택할 수 있는 다양한 작업이 가능하다.
예를 들면, HTML의 요소를 선택하는 메소드인 `document.getElementById()` 와 같은 것을 통해 DOM에 접근할 수 있다. 또, HTML 객체를 선택하는 객체 집합(Object collection) `document.body` 같은 것들도 있다.

<br>


[HTML 요소 선택, HTML 객체 선택 자세히 보기](http://www.tcpschool.com/javascript/js_dom_document)

<br>


![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/3628e4e7-4dda-45a4-d49b-0a1033111d00/public)

<br>


### 노드 트리(Node Tree)
DOM은 HTML 문서를 노드트리(위 사진 참고)로 나타낸다. 
트리 구조로 정렬된 노드(Node)는 데이터의 상하위(부모, 자식) 계층을 나타내는 항목을 의미한다.
트리에 있는 모든 노드는 객체이며 요소 내의 문자는 텍스트 노드가 된다.
참고로 텍스트 노드는 가장 낮은 레벨이라 자식 노드를 가질 수 없다.
자바스크립트로 HTML DOM을 사용하여 노드 트리에 포함된 모든 노드에 접근할 수 있다.

<br>


### DOM 종류
W3C DOM 표준 세가지 모델은 다음과 같다.
1. Core DOM : 모든 문서 타입을 위한 DOM
2. HTML DOM : HTML 문서를 위한 DOM
3. XML DOM : XML 문서를 위한 DOM

<br>


# BOM (Browser Object Model)
BOM(브라우저 객체 모델)은 웹 브라우저와 관련된 객체들을 의미한다. 
DOM과 달리 W3C의 표준 객체 모델은 아니다. **document 외의 모든 것을 제어**하기 위해 사용된다.

<br>


**Window(브라우저 전체를 담당) 객체의 하위 객체**
1. document(웹 사이트만 담당. div, input과 같은 요소의 속성 정보를 가져올 수 있음)
2. History(앞으로 가기, 뒤로 가기,)
3. Location(주소에 대한 정보(하이퍼링크 이동), 새로고침 등)
4. Navigator(사용자의 브라우저, 운영체제 정보)
5. Screen(크기, 높이와 같은 화면에 대한 정보)

<br>


### 전역 객체 window
자주 사용되는 메소드인 alert, confirm, prompt 등은 Window 객체의 메소드이다.
window는 전역 객체이기 때문에 window를 생략해서 사용할 수 있는 것이다.

![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/957681d2-c1d5-44e6-2d43-180471d24b00/public)

최상단 window 루트 객체는 브라우저를 제어할 수 있는 메소드를 제공한다.
자바스크립트 코드의 전역 객체로 사용된다. 

<br>


> 요약 : DOM은  document를 제어하는 것이라면
BOM은 document외의 window를 제어하는 것이다.

<br>
<br>

-- -- -- 

> 참고 자료

[TCP School : DOM의 개념](http://www.tcpschool.com/javascript/js_dom_concept)

[TCP School : 노드(Node)](http://www.tcpschool.com/javascript/js_dom_node)

[문서 객체 모델](https://poiemaweb.com/js-dom)

[위키백과 노드](https://ko.wikipedia.org/wiki/%EB%85%B8%EB%93%9C_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99))

[전역객체 Window](https://opentutorials.org/module/904/6633)

[모던 자바스크립트 튜토리얼 : 브라우저 환경과 다양한 명세서](https://ko.javascript.info/browser-environment)

[ZeroCho Window 객체와 BOM](https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946)
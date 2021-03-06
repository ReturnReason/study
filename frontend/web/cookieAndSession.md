# 쿠키와 세션에 대해서
쿠키와 세션은 HTTP 프로토콜의 약점을 보완하기 위해서 사용된다.
오늘은 쿠키와 세션에 대해서 적어보고 HTTP 프로토콜에 대해서는 추후에 따로 더 공부해보려 한다.

## 쿠키 🍪
브라우저에 저장되는 작은 크기의 텍스트 파일이다. 웹 서버가 웹 브라우저에 전송하여 저장해 놓았다가 요청시 Headers에 실려 서버로 전송된다. 같은 도메인에서 만들어진 쿠키만 전송되며, Expires 또는 Max-Age를 통해 만료 기간을 정할 수도 있다. 

### 쿠키는 왜 사용되나?
웹 페이지를 방문한 사용자들의 방문 기록 등의 정보를 저장하기 위해서이다. n번째 방문한 사용자도 처음 방문한 것처럼 인식되지 않도록 사용한다는 것이다. 또, 쿠키로 인해 사용자가 로그인을 다시 하지 않더라도 로그인을 유지할 수 있기 때문이다. 이 정보를 사용하여 사용자들을 식별할 수 있다.

### **쿠키의 기능**
1. 세션 관리
로그인, 장바구니, 게임 스코어 등의 정보를 서버에 저장
2. 개인화
사용자 테마 등 세팅
3. 트래킹
사용자 행동을 기록 및 분석 
(하지만 개인 정보 보호 문제에 대해 이슈가 있어 비필수 쿠키를 저장하려면 사용자로부터 정보에 입각한 동의를 얻어야 함.)

로그인 하지 않은 상태로 물건을 장바구니에 담거나, 
팝업창 하루동안 안 보기 등이 쿠키에 해당된다.

### 쿠키의 종류
1. 퍼스트파티 쿠키 (First party Cookie)
같은 도메인에서 생성된 쿠키로 서브 도메인도 포함된다.
2. 서드파티 쿠키(Third party Cookie)
다른 도메인에서 생성된 쿠키이다. 다른 도메인으로부터 스크립트, 이미지, 폰트 등 다른 도메인에 요청할 때 생성된다. 광고 목적으로도 사용되는 쿠키가 서드파티 쿠키이다. 

### 쿠키의 유통기한 🍪🤢 (라이프타임)
웹 브라우저 쿠키에도 기한이 있다. 쿠키의 종류에 따라 두가지 방법으로 정의할 수 있다.

1. 세션 쿠키(임시 쿠키) : 세션 쿠키는 마치 게임의 PC방 전용 아이템과도 같다고 보면 된다. PC방 전용 아이템은 PC방 게임을 종료하면 함께 제거되는 것처럼 세션 쿠키는 현재 세션이 끝날 때 삭제된다. 즉, 브라우저가 종료되면 삭제되는 것이다.

2. 영구 쿠키(추적 쿠키) : 영구적 쿠키는 특정 만료 기간이 될 때 삭제된다. 만료 기간이 정해져있는 쿠키를 영구 쿠키라고 한다. (기간이 정해져 있는데 이름이 왜 영구 쿠키인가 싶은 의문이 들지만 아마 웹을 종료해도 쿠키 기간이 지나지 않을 때까지는 유지라서 그런가 싶기도.) Expires 속성에 명시된 날짜에 삭제되거나, Max-Age 속성에 명시된 기간 이후 삭제된다.

쿠키의 용도 중 하나가 사용자의 로그인 상태를 추적하는 것인데, 웹 사이트에서 로그인을 한 후, 웹 사이트를 닫게 되면 로그인이 해제된다. 이는 세션 쿠키(임시 쿠키)로 인해 로그인이 해제되는 것이고 웹 사이트에서 '자동 로그인' 체크박스에 체크하는 것은 사용자의 요청에 따라 영구 쿠키로 변경할 수 있도록 제공하는 것이다.

### 쿠키의 보안 문제

인터넷을 통해 일반 텍스트로 전송되기 때문에 트래픽을 가로채는 패킷 스니핑, XSS, CSRF 등에 취약하다. 사용자의 로그인 쿠키 값을 가져오면 쿠키를 수동으로 설정하여 다른 곳에서 동일한 세션을 시뮬레이션 하는데에도 사용될 수 있고 사용자의 권한을 이용한 비밀번호 변경, 결제 요청 등으로 악용될 수 있다. 보안 취약점에 대해서는 이정도만 적고 오늘 공부할 내용과는 조금 벗어나는 것 같아 이번 글에서는 생략한다. 

> 쿠키(Cookie) 이름의 유래 : 유닉스 프로그래머들이 사용한 프로그램이 수신 후 변경하지 않은 채로 반환하는 데이터의 패킷을 의미하는 매직 쿠키라는 용어에서 비롯된 이름으로 임의 조각의 데이터를 의미한다.

## 세션(Session) 🧩
서버에 클라이언트의 상태 정보를 저장하는 것을 세션이라 칭한다. 웹 서버에 클라이언트에 대한 정보를 저장하고 클라이언트 마다 구분할 수 있는 세션 ID(Key)를 부여한다. 사용자의 중요한 정보는 서버의 메모리나 DB에 저장된다.

### 세션의 특징
1. 서버에 따라 다르지만 (이론상) 용량 제한이 없다.
2. 클라이언트 마다 고유한 세션 ID를 부여해 구분한다.
3. 웹 브라우저 종료시 세션 쿠키를 삭제한다.

### 세션은 왜 사용되나?
쿠키와 달리 로그인 등 악용될 수 있는 정보에 대한 보안을 개선하고자 사용된다. 쿠키는 사용자의 메모리에 저장되었다면 세션은 웹 서버에 저장되기 때문이다.

### 보안을 생각하면 세션만 사용하면 되지 않나?
세션은 서버에 저장되어 서버의 자원을 사용하기 때문에 사용자가 많으면 많을 수록 소모되는 자원이 많아져 쿠키와 세션을 적절히 사용한다고 한다. 세션 사용으로 인해 웹 사이트의 속도 저하 문제도 일으킬 수 있기 때문이다.

> 지워지고 조작되고 가로채이더라도 문제 없을 정보만 쿠키로 사용되고
중요한 보안과 관련된 정보 등은 세션을 통해 서버에서 다뤄지는 것이다.

-- -- 
> 참고문서
[MDN HTTP 쿠키](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
[우아한Tech - 10분 테코톡 디토의 웹스토리지&쿠키](https://www.youtube.com/watch?v=-4ZsGy1LOiE&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)
[humanwhocodes HTTP 쿠키 설명](https://humanwhocodes.com/blog/2009/05/05/http-cookies-explained/)
[TCP SCHOOL 세션](http://www.tcpschool.com/php/php_cookieSession_session)
[얄팍한 코딩사전 - 쿠키, 세션, 캐시가 뭔가요?](https://www.youtube.com/watch?v=OpoVuwxGRDI&ab_channel=%EC%96%84%ED%8C%8D%ED%95%9C%EC%BD%94%EB%94%A9%EC%82%AC%EC%A0%84)
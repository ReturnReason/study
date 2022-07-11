## require

> require는 노드의 모듈 시스템이다.

```jsx
module.exports = WordRelay;
```

WordRelay 라는 컴포넌트를 module.exports로 다른 컴포넌트에서도 불러올 수 있도록 작성하였다.
module.exports 에 담는 경우 require로 불러 사용할 수 있다.

```jsx
const React = require('react');
const { hot } = require('react-hot-loader/root');
/* 2022년 기준 hot은 사용되지 않음 */
```

> **구조 분해 할당**을 사용할 수 있는 경우는 exports 해온 것이 `객체` 또는 `배열` 인 경우 구조 분해 할당 문법을 사용할 수 있다.

노드 모듈 시스템에서 변수를 export 하는 방법

```jsx
export.hello = 'a';
module.exports = { hello : 'a' };
/* 위 두가지 모두 같다. */
```

## import

import는 ES2015 문법이다.

> 일부분은 node의 모듈 시스템과 호환이 된다.

import를 사용할 때는 module.export 부분을 `export default` 로 바꾸면 된다.

```jsx
export default WordRelay;
```

export default 한 컴포넌트는 import 를 사용하여 불러올 수 있다.

```jsx
import React, { Component } from 'react';
```

> { Component } 는 default로 export한 것이 아니므로 괄호를 사용하여 import 한다.

**export 예시를 확인해보자.**
첫번째는 변수 형태로 작성된 export이다.

```jsx
export const hello = 'hello';
// import { hello }
```

위 문법은 변수명만 겹치지 않는다면 여러번 사용할 수 있다.

두번째는 export default를 사용하였다.

```jsx
export default NumberBaseball;
//import NumberBaseball
```

export default는 1번만 사용할 수 있다.

> 엄밀히 따지면 export default와 module.export는 다르다.
> 하지만, 어느정도 호환이 되기 때문에 리액트에서 import, export 하는데 있어서는 문제가 없다.

**정리**
node에서는 require를 쓰고 리액트에서는 import와 export를 쓴다.

---

> 참고 자료

> [import vs require!](https://www.youtube.com/watch?v=3X4J2L_PhiY&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=23&ab_channel=ZeroChoTV)

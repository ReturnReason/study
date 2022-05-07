매번 CSS는 자주 사용하는 몇가지 속성만 주구장창 사용하다보니 다른 속성들이 많아도 뭔지 모르고 사용하는 방법도, 어떤 것을 만들 수 있는지 조차 지나치게 되는 것 같다.

물론, 자주 사용하는게 더 중요하고 꼭 알아야하겠지만 흔히 보지 못한 속성들도 한번씩 사용해보고 괜찮다면 여러 곳에서 유용하게 사용해 볼 수 있을 것 같아서 하나씩 시도해보려 한다.

<br>

> 잘 사용하면 정말 다양한 효과를 만들 수 있는 mask-image 속성에 대해 공부해보았다.

<br>

# mask-image

포토샵을 사용해봤다면 클리핑 마스크를 사용해본 경험이 있는 사람이 많을 것이다. css에서도 특별한 이미지 편집을 하지 않아도 포토샵의 클리핑 마스크와 같은 효과를 낼 수 있다.

mask-image는 이미지 파일이나 그라디언트를 활용해 사용할 수 있다.
[CAN I USE.COM](https://caniuse.com/css-masks)에서 브라우저 호환성을 확인해 볼 필요가 있는데 구글 크롬에서 사용하려면 -webkit-이라는 접두어를 붙여서 사용해야 한다.

접두어 없이 사용하는건 파이어 폭스의 53버전 이상이나 사파리 15.4이상에서만 제대로 보여지는 것 같다.

<br>

## 사용해보기

일단 적용할 이미지와 배경이 될 이미지를 하나씩 있어야 한다.
아이유 이미지와 멜론 로고는 구글 검색을 통해 구해보았다.

![](https://velog.velcdn.com/images/reasonz/post/84da21bf-cb30-45cc-8c49-3f80a5f1adcf/image.png)

아무 것도 적용하지 않은 이미지의 상태이다.
이제 클리핑 마스크로 사용할 이미지를 css로 불러와서 적용해 볼 것이다.

<br>

```css
img {
  width: 500px;
  mask-image: url('Melon_logo.png');
  -webkit-mask-image: url('Melon_logo.png');
  mask-size: 100px;
  -webkit-mask-size: 100px;
}
```

멜론 png 로고를 구해서 적용해보았다.
구글 크롬으로 확인하고 있기 때문에 꼭 `-webkit-`접두어가 붙은 속성을 넣어주어야 한다.
mask-size 속성을 사용하면 마스크 이미지의 크기도 조정할 수 있다.

<br>

![](https://velog.velcdn.com/images/reasonz/post/1e1a15aa-7cd4-4af8-9d76-7bc66d859dde/image.png)

결과물은 이렇게 나타난다.

<br>

## 그라디언트로 사용해보기

이번에는 이미지 대신 그라디언트를 mask-image 속성에 적용해보기로 했다.
이것을 사용하면 다양한 패턴을 이미지에 적용하는 것도 가능하다.

<br>

```css
img {
  width: 500px;
  mask-size: 100px;
  -webkit-mask-size: 100px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 50%);
  -webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 50%);
}
```

간단하게 리니어 그라디언트 속성으로 줄무늬 느낌의 효과를 내보기로 했다.

![](https://velog.velcdn.com/images/reasonz/post/53fe6114-72b9-4252-aaaf-5859244adb31/image.png)

해당 속성을 사용하면 위와 같은 결과물이 나타난다.
다른 사이트에 있는 코드도 복사해서 적용해보았다.

```css
img {
  width: 500px;
  mask-size: 10px 10px;
  -webkit-mask-size: 10px 10px;
  mask-image: linear-gradient(45deg, #000000 25%, rgba(0, 0, 0, 0.2) 25%), linear-gradient(-45deg, #000000 25%, rgba(0, 0, 0, 0.2) 25%), linear-gradient(45deg, rgba(0, 0, 0, 0.2) 75%, #000000 75%), linear-gradient(-45deg, rgba(0, 0, 0, 0.2) 75%, #000000
        75%);
  -webkit-mask-image: linear-gradient(45deg, #000000 25%, rgba(0, 0, 0, 0.2) 25%), linear-gradient(-45deg, #000000 25%, rgba(0, 0, 0, 0.2) 25%), linear-gradient(45deg, rgba(0, 0, 0, 0.2) 75%, #000000 75%), linear-gradient(-45deg, rgba(0, 0, 0, 0.2) 75%, #000000
        75%);
}
```

![](https://velog.velcdn.com/images/reasonz/post/4f48826b-7dfd-40e7-af94-20a5d90817a2/image.png)

이렇게 포토샵 같은 편집 프로그램없이도 css를 사용하면 이미지에 다양한 효과를 낼 수 있다!
<br>

linear-gradient만 잘 써도 이렇게 멋진 효과를 낼 수 있다니 ㅠㅠ
그라디언트 활용법을 공부해야될까 싶기도 하다.ㅋㅋ

<br>

---

> 참고 자료

> [MDN mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image#setting_a_mask_image_with_a_url)

> [CSS의 mask-image 속성을 사용하여 이미지에 효과적용](https://web.dev/i18n/ko/css-masking/)

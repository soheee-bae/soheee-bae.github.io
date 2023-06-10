---
title: "React Three Fiber 연습하기"
date: 2023-06-09
subtitle: "React Three Fiber 기본적인 기능들을 정리했습니다."
category: "React Three Fiber"
tags:
  - r3f
background: "r3f/r3f-livingroom.jpeg"
emoji: "🔬"
draft: false
---

### Setup

```jsx
npm install three @types/three @react-three/fiber
```

여기서 집중해서 봐야 할것은 @react-three/fiber 앞에 @ 이라는 기호가 붙어있다는 건데요. 이 뜻은 react-three라는 더 큰 시스템의 일부에서 /fiber이라는 일부를 사용하려한다는 걸 의미합니다. 여기서 하나더 알수 있는건 /fiber이 아닌 다른 일부들도 존재한다는겁니다. 이 글에서는 /fiber에 대한 글을 정리해서 적어보려고 합니다.

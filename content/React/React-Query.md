---
title: "React Query 사용법 및 쓰는 이유"
date: 2023-08-11
subtitle: "리액트 쿼리를 사용해야하는 이유와 기본적인 설명을 적었습니다."
category: "React"
tags:
  - react-query
background: "r3f/r3f-livingroom.jpeg"
emoji: "🖥️"
draft: true
---

</br>

 value     │  !value  │  !!value
━━━━━━━━━━━┿━━━━━━━━━━┿━━━━━━━━━━━
 false     │ ✔ true   │   false
 true      │   false  │ ✔ true
 null      │ ✔ true   │   false
 undefined │ ✔ true   │   false
 0         │ ✔ true   │   false
 -0        │ ✔ true   │   false
 1         │   false  │ ✔ true
 -5        │   false  │ ✔ true
 NaN       │ ✔ true   │   false
 ''        │ ✔ true   │   false
 'hello'   │   false  │ ✔ true

 
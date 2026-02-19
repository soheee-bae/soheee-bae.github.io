---
title: "var / let / const & TDZ"
date: 2026-02-06
subtitle: "웹페이지가 사용자에게 보여지기까지의 과정을 적어보았습니다. "
category: "JavaScript"
tags:
  - javascript
background: "r3f/r3f-livingroom.jpeg"
emoji: "🖥️"
draft: true
---

var / let / const의 차이 — Execution Context 관점에서 이해하기

JavaScript에서 var, let, const의 차이는 단순히 문법의 차이가 아니다.

많은 사람들이 이렇게 외운다.

var → 옛날 방식

let / const → 최신 문법

하지만 실제 차이는 JavaScript 엔진이 변수를 처리하는 방식,
즉 Execution Context 생성 과정에서 발생한다.

이번 글에서는 Execution Context 관점에서 변수 선언 방식의 차이를 이해해보자.

Execution Context에서 무슨 일이 일어날까?

JavaScript는 코드를 위에서 아래로 바로 실행하지 않는다.

먼저 Execution Context(실행 컨텍스트) 를 생성하고,
그 안에서 코드를 실행한다.

Execution Context는 두 단계로 동작한다.

1️⃣ Creation Phase (생성 단계)

코드를 실행하기 전에 엔진이 먼저 수행하는 단계이다.

이 단계에서:

변수 선언 등록

함수 선언 등록

this 결정

이 과정에서 변수의 등록 방식과 초기화 방식이 var, let, const마다 달라진다.

2️⃣ Execution Phase (실행 단계)

이제 코드가 한 줄씩 실행되며:

값이 할당되고

함수가 호출된다.

👉 핵심은 여기다.

var / let / const의 차이는
Creation Phase에서 변수의 초기화 방식이 다르기 때문에 발생한다.

🔹 var의 동작 방식
console.log(a);
var a = 10;

Creation Phase

엔진은 var a를 발견하면:

변수 등록 ✅

동시에 undefined로 초기화 ✅

메모리 상태
a: undefined

즉, var는 선언과 초기화가 동시에 이루어진다.

Execution Phase
console.log(a); // undefined

이미 a가 존재하기 때문에 에러가 아니라 undefined가 출력된다.

이 현상이 바로 우리가 말하는 Hoisting처럼 보이는 현상이다.

🔹 let / const의 동작 방식
console.log(a);
let a = 10;

Creation Phase

엔진은 다음과 같이 처리한다.

변수 등록 ✅

초기화 ❌

메모리 상태
a: <uninitialized>

변수는 존재하지만 아직 사용할 수 없는 상태가 된다.

Execution Phase
console.log(a); // ReferenceError

초기화되지 않은 변수에 접근했기 때문에 에러가 발생한다.

이 구간을 TDZ(Temporal Dead Zone) 라고 한다.

TDZ (Temporal Dead Zone)란?

변수가 선언되었지만 아직 초기화되지 않아 접근할 수 없는 구간

중요한 점:

👉 TDZ는 변수가 없는 구간이 아니다.
👉 변수는 존재하지만 접근이 금지된 구간이다.

TDZ는 변수 선언이 시작되는 시점부터
실제 초기화가 이루어지는 시점까지 유지된다.

왜 TDZ가 생겼을까?

var에는 오래된 설계 문제가 있었다.

1️⃣ 블록 스코프를 무시한다
if (true) {
var a = 10;
}

console.log(a); // 10

블록 내부 변수인데 외부에서 접근 가능하다.

2️⃣ 선언 전에 사용해도 에러가 없다
console.log(a); // undefined
var a = 10;

버그가 발생해도 발견하기 어렵다.

그래서 ES6에서는 다음 목표로 let과 const가 도입되었다.

블록 스코프 제공

선언 전 접근 방지

예측 가능한 코드 작성

런타임 버그 감소

TDZ는 이러한 실수를 강하게 막기 위한 설계다.

const는 왜 내부 값 변경이 가능할까?
const obj = { a: 1 };

obj.a = 2; // 가능

많이 오해하는 부분이다.

const는 값을 고정하는 것이 아니다.

👉 변수 바인딩(binding)을 고정한다.

즉:

다른 객체로 재할당 ❌

내부 속성 변경 ✅

obj = {}; // ❌ 재할당 불가

JavaScript는 객체를 참조(reference) 로 다루기 때문이다.

정리표
구분 var let const
스코프 함수 스코프 블록 스코프 블록 스코프
재선언 가능 불가 불가
재할당 가능 가능 불가
Hoisting undefined 초기화 TDZ TDZ
초기화 시점 Creation Phase Execution Phase Execution Phase
🎯 핵심 정리

결국 var, let, const의 차이는

Hoisting이 되느냐 안 되느냐의 문제가 아니다.

모든 선언은 Hoisting 된다.

진짜 차이는:

👉 Execution Context의 Creation Phase에서
변수가 어떻게 초기화되는가의 차이다.

var → 선언 + 초기화 동시에 진행

let / const → 선언만 먼저 진행 → TDZ 발생

다음 글에서는

👉 JavaScript 엔진은 변수를 어떻게 찾아낼까?

Execution Context 내부의 핵심 구조인
Lexical Environment와 Scope Chain으로 이어서 정리해보겠다. 🚀

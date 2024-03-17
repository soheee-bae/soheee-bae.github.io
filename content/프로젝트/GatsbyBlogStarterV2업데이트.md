---
title: "[프로젝트] Gatsby Blog Starter V2 업데이트"
date: 2023-04-22
subtitle: "Gatsby Blog Starter v2로 업데이트하는 과정을 담았습니다."
category: "프로젝트"
tags:
  - project
  - gatsby
background: "project/gatsbyBlog/gatsbyBlogBackground.png"
emoji: "🔖"
draft: false
---

</br>

## Gatsby Blog Starter의 문제점과 V2로 업데이트하기 까지

Gatsby Blog Starter 개발이 끝난 이 시점 제가 막상 이 스타터를 쓰려고 하니 부족한 점들이 하나하나씩 보이기 시작했고 보안하고 싶은 점들을 모아서 V2로 프로젝트를 업데이트 하게 되었습니다.

#### 목차의 불편함

목차 기능이 이전 버전 프로젝트에서의 제일 핵심 기능이였기에 목차를 기준으로 블로그 디자인을 했었는데요. 그 결과로 블로그의 기능성을 높여 주는데에는 성공했지만 디자인에서는 불편함을 느꼈습니다. 목차가 모든 페이지의 왼쪽 부분을 차지 했기에 반응형 레이아웃에 대해 신경을 많이 써야함과 동시에 페이지의 오른쪽 부분을 차지하던 메인 컨텐츠 공간 활용도가 낮아졌습니다. 목차 기능에 대해 한번 더 생각하게 되었고 비슷한 역할을 할수 있는 기능이 어떤 것들이 있을까 하던 고민 끝에 목차를 제거함과 동시에 목차기능을 대신 해줄수 있는 filtering과 search 기능을 추가하며 업데이트를 진행 하기로 계획했습니다.

#### 특색없는 블로그

이전 버전의 블로그 탬플릿은 특색이 없다고 생각했습니다. 이 블로그 탬플릿의 제일 핵심은 커스터마이징 할수 있는 점이라고 생각하고 그만큼 사용자가 커스터마이징 할 수 있는 부분들이 다양해야 한다고 생각했습니다. UI를 중심으로 개선하기 위해 여기저기 참고 블로그들을 찾아보던중 제가 자주 사용하던 노션이라는 서비스가 눈에 들어오게 되었는데요. 노션에서는 페이지 상단마다 사용자가 아이콘을 넣고 배경화면을 넣을수 있는 시스템이 있습니다. 그 점이 마음에 들었고 제가 사용자에게 제공할수 있는 커스터마이징 옵션 중 하나라고 생각하게 되었습니다. Formatter의 수를 늘리면서 조금 더 다양한 데이터들로 페이지 상단부분을 채우고 각기 다른 이미지와 이모티콘을 각 페이지의 상단 부분에 넣음으로 모든 페이지가 조금씩은 다른 느낌을 주면 조금 더 개성있지 않을까 하는 기대감과 함께 계획하게 되었습니다.

#### 생동감 없는 블로그

위의 특색없는 블로그에서 더 나아가 이 블로그 템플릿뿐만이 아닌 모든 웹 서비스들이 생동감이 있으면 사용자 경험을 향상시킨다는 믿음이 있습니다. 생동감이 없던 이전 블로그 템플릿에서 조금 더 개선하여 페이지의 컴포넌트에 애니매이션을 추가해 사용자 경험을 높이고 싶었습니다.

</br>

## 프로젝트 상세 소개

### 🎨 디자인 계획

프로젝트를 V2로 업데이트 하면서 디자인에 큰 변화를 주었습니다. 대표적으로 왼쪽에 위치하고 있었던 목차 부분을 없애면서 블로그 전체 레이아웃에 큰 변화를 주었고 내비게이션 바를 추가해보았습니다. 또 모든 페이지 상단에 이미지 배경화면을 넣으면서 좀 더 깔끔한 UI에 집중할수 있게 바꾸어 보았습니다.

<div style="float:left; width:100%; margin:auto; text-align:center;">

<div style="width:48%; margin:auto; text-align:center;">

![gatsbyBlogV2DesignI](../../assets/images/project/gatsbyBlog/gatsbyBlogV2DesignI.png)

##### 메인 페이지

</div>

</div>

<div style="position:relative; width:100%; margin:auto; text-align:center;">

<div style="float:left; width:48%; margin:auto; text-align:center;">

![gatsbyBlogV2DesignII](../../assets/images/project/gatsbyBlog/gatsbyBlogV2DesignII.png)

##### 게시글 메인 페이지

</div>

<div style="float:right; width:48%; margin:auto; text-align:center;">

![gatsbyBlogV2DesignIII](../../assets/images/project/gatsbyBlog/gatsbyBlogV2DesignIII.png)

##### 게시글 디테일 페이지

</div>

</div>

<div style="float:left; width:100%; margin:auto;">

<br/>

### 🧱 구조도 계획

간단히 이 프로젝트의 파일 구조와 메뉴 구조도를 whimsical을 통해 정리해 보았습니다.

![gatsbyBlogV2Files](../../assets/images/project/gatsbyBlog/gatsbyBlogV2Files.png)

<br/>

### 🖥️ 개인 프로젝트

프론트엔드 개발, 디자인, 기획

<br/>

### 🔨 활용한 기술스택

Gatsby, Graphql, React, SCSS

<br/>

## 프로젝트를 진행하면서

#### 프로젝트 전체 UI & 페이지 구조 업데이트

UI와 기능에서 제일 핵심이였던 목차를 없앰과 동시에 프로젝트 전체의 UI를 수정하게 되었습니다. 

- 게시글 디테일 페이지 디자인
- 게시글 리스트 디자인
- 상단 이미지를 이용한 홈페이지와 게시글 페이지

#### Filtering과 Search 기능 추가

블로그의 실용성을 높이며 목차 기능을 대체할 다른 기능을 찾아보다가 추가하기로한 filtering과 search 기능을 업데이트 과정중에서 추가하였습니다. Filtering과 search 기능을 구현하기 위해선 다양한 방법들이 있겠지만 저는 `query-string`이라는 라이브러리를 이용해 카테고리나 태그들이 선택 될때마다 값을 페이지 `url`에 넣어서 값을 확인한 다음 필터링을 했고 조금 더 깔끔하고 다른 컴포넌트나 페이지들에서도 선택된 값들을 불러 올수 있게 `ContextApi`를 사용해 하나의 `hook`으로 만들어서 정리하였습니다.

> category로 "프로젝트", tag로 "blog, r3f, webgl"들이 선택 되었을때의 url : /posts/?category=프로젝트&tag=blog&tag=r3f&tag=webgl

```
import qs from "query-string";
const { category, tag } = qs.parse(search);
```

#### 애니매이션 추가

블로그 탬플릿에 생동감을 주기위해 다양한 컴포넌트에 애니매이션을 추가하였습니다. 작은 hover 효과에 대한 애니매이션부터 Navbar에 스크린 스크롤에 의한 애니매이션과 스타일 변화에 신경을 썼습니다. 또 새로운 페이지가 렌더 될때마다 페이지 상단에 있는 배경 이미지가 자연스럽게 보일수 있도록 fade 애니매이션을 주어 자연스러운 transition에 집중하였습니다. 이외에 작고 큰 애니매이션을 프로젝트 여러군데에 추가하였습니다.

<br/>

</div>

---
title: "[프로젝트] Gatsby Blog Starter V2 회고"
date: 2023-04-22
subtitle: "Gatsby Blog Starter v2로 업데이트한 후의 제 생각들을 적었습니다."
category: "프로젝트"
tags:
  - project
  - gatsby
background: "project/gatsbyBlog/gatsbyBlogBackground.png"
emoji: "🔖"
draft: false
---

</br>

<div style="position:relative; width:100%; margin:auto; text-align:center;">

<div style="float:left; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_MainLight.png)

</div>

<div style="float:right; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_Main2Light.png)

</div>

<div style="float:left; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_PostsLight.png)

</div>

<div style="float:right; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_Posts2Light.png)

</div>

</div>

<div style="float:left; width:100%; margin:auto; text-align:center;">

##### 라이트 모드

</div>

<div style="position:relative; width:100%; margin:auto; text-align:center;">

<div style="float:left; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_MainDark.png)

</div>

<div style="float:right; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_Main2Dark.png)

</div>

<div style="float:left; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_PostsDark.png)

</div>

<div style="float:right; width:48%; margin:auto; text-align:center;">

![gatsbyBlogDesignI](../../assets/images/project/gatsbyBlog/Blog_Posts2Dark.png)

</div>

</div>

<div style="float:left; width:100%; margin:auto; text-align:center;">

##### 다크 모드

</div>

<div style="float:left; width:100%; margin:auto;">

<br/>

### 프로젝트 결과물

🔗 Github : https://github.com/soheee-bae/Gatsby-Image-Blog-Starter

🚀 Demo : https://gatsbyimageblogstartermain.gatsbyjs.io/

</br>

### 프로젝트를 끝내고

업데이트후의 디자인, 기능들이 훨씬 깔끔하고 사용자들이 보다 더 편하게 쓸수 있을것 같다는 생각에 업데이트 하길 잘 했다고 생각이 됩니다. 이번 업데이트는 사용자가 블로그 게시글 마다 각각 개성있게 꾸밀수 있음을 가능하게 만드는것에 중점을 두었습니다.

</br>

### 기억에 남는 구현

업데이트 하는 과정중 제일 신경썼던 부분은 게시글 filtering과 search 기능이였습니다. 목차 기능을 제거하면서 게시글들을 카테고리와 태그로 나눌수 있는 기능의 필요성을 느꼈습니다. 이전 목차와 다르게 graphql을 사용해서 파일 구조를 파악해 자동으로 목차를 만들기 보단 사용자가 게시글을 작성할때 마다 하나의 `frontmatter`로 카테고리를 넣게끔 만들어 카테고리를 filtering 할수 있게 만들었습니다.

</br>

### 어려웠던 점

디자인에 중점을 두어 업데이트를 했던 만큼 새로운 디자인을 구현하는데 많은 시간을 썼습니다. 목차를 제거함과 동시에

</br>

### 추가 하고 싶은 기능

- utterances를 이용한 댓글 기능
- 참고 창

</br>

### 무엇을 배웠고 어떤 부분이 성장했나?

</div>

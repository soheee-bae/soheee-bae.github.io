---
title: "React Query 사용법 및 쓰는 이유"
date: 2023-08-11
subtitle: "리액트 쿼리를 사용해야하는 이유와 기본적인 설명을 적었습니다."
category: "React"
tags:
  - react-query
background: "r3f/r3f-livingroom.jpeg"
emoji: "🖥️"
draft: false
---

</br>

React Query를 사용하는 이유

React Query는 Data Fetching, Cashing, 동기화, 서버 업데이트 등을 직관적이고 효율적이게 관리를 하게 해주는 라이브러리입니다. 전역 상태 관리 도구의 대표적인것중 `redux`나 `recoil` 같은 라이브러리들이 있는데, 이번 글에서는 React Query에 대한 정보들을 담아보려고 합니다.

install 하는 방법

```
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools
```

사용 방법

1. React Provider을 만들어 사용하고 싶은 페이지들이나 app 전체를 감싸야 한다.

```
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

자세히 알아보기

React Query는 크게 2가지로 나뉘기 때문에 접근성이 아주 쉽습니다.

- Query : 데이터를 가져오는 것
- Mutation : 데이터의 값을 바꾸거나 추가 또는 삭제하는것

useQuery에 대해서

useQuery를 사용할땐 두가지를 주의해야 합니다.

- queryKey : useQuery마다 배열 형태로 부여되는 고유한 key 값. 이 queryKey를 통해서 다른 mutation function이나 다른 곳에서도 해당 쿼리의 결과를 꺼내오는것이 가능합니다.
- queryFn : Promise 처리가 이뤄지는 함수로 서버에 api를 요청하는 코드입니다.

```
import { useQuery, useMutation} from '@tanstack/react-query'

function wait(duration){
  return new Promise(resolve => setTimeout(resolve, duration))
}

function App(){
  const newQuery =  useQuery({
    queryKey : ["uniqueKeyName"]
    queryFn : ()=> wait(1000).then(()=> [...POSTS])
  })
}

```

useQuery 결과에 대해서

- data : queryFn 함수를 랜더한 결과값을 나타낸다.
- isLoading : 서버에서 데이터를 받아오는 동안 로딩 화면을 보여주고 싶다면 이 값을 쓸수 있다.
- isError : boolean 형태의 값으로 여러번의 시도끝에 계속 queryFn 함수가 에러를 낸다면 이 값으로 에러를 확신할수 있다.
- error: 에러가 생겼을때 화면에 에러 메세지를 보고 싶거나 확인하고 싶다면 이 값을 쓸수 있다.

```
  const {data, isLoading, isError, error} =  useQuery({
    queryKey : ["uniqueKeyName"]
    queryFn : ()=> wait(1000).then(()=> [...POSTS])
  })

  if(isError){
    return <pre>{JSON.stringify(error)}</pre>
  }

  return (
    <div>{data.map(()=>...)}</div>
  )

```

### Mutation

- mutationFn : queryFn과 같이 Promise 처리가 이뤄지는 함수로 서버에 api를 요청하는 코드입니다. 하나의 props를 받을수 있으며 이 값을 함수에 전달하여 사용할수 있습니다. 

```
  const {mutate} =  useMutation({
   mutationFn :  title => wait(1000).then(()=> POSTS.push({id: 1, title}))
  })

  return (
      <button onClick={()=> mutate('New post') } />
  )
```


### Devtool

React Query Devtools는 React Query의 장점중의 하나인 강력한 내장 개발 도구입니다. 
사용중인 모든 쿼리 상태들을 시각화하여 확인할수 있게 도와주고 에러가 생기거나 예상대로 작동하지 않는 경우 문제를 해결할수 있게 도와줍니다. 

```
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
```

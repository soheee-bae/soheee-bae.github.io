---
title: "React Query의 Query와 Mutation"
date: 2023-08-13
subtitle: "리액트 쿼리를 사용하기 위해서 알아야 할 점들과 자세한 정보들을 정리했습니다."
category: "React"
tags:
  - react-query
background: "react/reactQueryBackground.jpeg"
emoji: "🗞️"
draft: false
---

</br>

## React Query 자세히 알아보기

React Query는 크게 2가지로 나뉩니다.

- Query : 서버 데이터를 가져오는 것
- Mutation : 서버 데이터의 값을 바꾸거나 추가 또는 삭제하는것

</br>

## Query

### 💬 useQuery 기본 설명

GET 요청과 비슷하게 서버 데이터를 가져오기 위해선 `useQuery`라는 hook이 사용됩니다. 이 `useQuery`를 사용할 때 두가지를 주의해야 합니다.

```
const data = useQuery(queryKey, queryFn)
```

- queryKey : `useQuery`마다 배열 형태로 부여되는 고유한 `key` 값입니다. 이 `queryKey`를 통해서 다른 mutation function이나 다른 곳에서도 해당 쿼리의 결과를 꺼내오는것이 가능합니다. `React query`는 이 `queryKey`로 캐싱 관리를 하여 데이터마다 고유한 `key` 값을 지정하는게 중요합니다. 더 나아가서 특정한 데이터를 가져오기 위해서 데이터의 아이디나 필요한 필터링 조건을 배열 형태로 보내줄수 있습니다.

```
/posts => ["posts"]
/posts/1 => ["posts", post.id]
/posts?authorId=1 => ["posts", {authorId : 1}]
/posts/2/comments => ["posts", post.id, "comments"]
```

- queryFn : `Promise` 처리가 이뤄지는 함수로 서버에 api를 요청하는 코드입니다.

`useQuery`는 비동기로 작동합니다. 만약 여러개의 `useQuery`가 한 컴포넌트에서 사용될 경우 하나가 끝난다음 다음 `useQuery`가 실행되는 것이 아닌 여러개의 `useQuery`가 동시에 실행됩니다.

</br>

### 📌 useQuery return 값

```
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isSuccess, status} = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  if (isLoading || status === 'loading') return <div>...isLoading</div>;
  if (isError || status === 'error') {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <div>{data.map((data) => (<p key={data.id}>{data.title}</p>))}</div>
  )
```

- data : queryFn 함수를 랜더한 결과값을 나타냅니다.
- isLoading : boolean 형태의 값으로 서버에서 데이터를 받아오는 동안 로딩 화면을 보여주고 싶다면 이 값이 유용하게 쓰일것입니다.
- isError : boolean 형태의 값으로 여러번의 시도끝에 계속 queryFn 함수가 에러를 낸다면 이 값으로 에러를 확신할수 있습니다.
- error: 에러가 생겼을때 화면에 에러 메세지를 보이게 하고 싶거나 확인하고 싶다면 이 값을 쓸수 있습니다.
- isSuccess : boolean 형태의 값으로 성공적으로 데이터를 받아왔는지를 확인할 수 있습니다.
- status : `error`, `loading`, `success`중 값의 상태를 확인할 수 있습니다.
- fetchStatus :
  - `fetching` : 현재 데이터를 가지고 오는 중일때를 뜻합니다
  - `idle` : 현재 아무것도 하지 않고 있거나 데이터를 가져온 후를 뜻합니다.
  - `paused` : 데이터를 가져오는중에 인터넷과 끊겼거나 어떠한 이유로 멈췄을 때를 뜻합니다.

</br>

### 📌 useQuery를 사용해 fetching 할때의 과정

1. 페이지안의 컴포넌트에 `useQuery`가 있을 `useQuery`는 실행된다.

- 페이지 새로고침
- 한 페이지에서 다른 페이지로 넘어갈때
- 마우스 포커스를 다른 곳에 뒀다가 다시 페이지로 돌아갈때
- 인터넷이 끊겼다가 다시 돌아오는 동시에 페이지를 보여줄때

2. QueryKey를 사용해 데이터가 `stale`한지를 알아본다음 `refetch`를 한다.
3. `refetch`된 데이터를 화면에 보여준다.

제일 처음에 페이지를 로딩할때

- fetchStatus : "fetching"
- status : "loading"

데이터를 성공적으로 가져왔을 때

- fetchStatus : "idle"
- status : "success" (실패할 경우 "error")

다른 페이지로 넘어갈때 똑같은 데이터를 넘어가는 페이지에서도 부를 경우 (Refetching)

- fetchStatus : "fetching"
- status : "success"

</br>

### 📌 useQuery에서 자주 사용되는 옵션

```
  const { data, isLoading, isError, error, isSuccess, status} = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime : 1000,
    refetchInterval : 1000,
  });
```

staleTime : 데이터를 `fresh`상태에서 `stale`상태로 전환될 때까지의 시간을 정해줄 수 있습니다. 만약 5분을 지정해준다면 5분동안은 데이터가 `fresh`상태를 유지할것이며 `fresh`상태의 데이터는 항상 cache에서 읽어온다는 것을 뜻합니다.

refetchInterval: milisecond 단위의 시간으로 지정한 시간마다 데이터를 refetch 할수 있습니다. 만약 1000를 지정해주었다면 1초마다 한번씩 데이터를 refetch 해줍니다. 

</br>

## Mutation

- mutationFn : queryFn과 같이 Promise 처리가 이뤄지는 함수로 서버에 api를 요청하는 코드입니다. 하나의 props를 받을수 있으며 이 값을 함수에 전달하여 사용할수 있습니다.
- onSuccess : 예상대로 작동해 값을 받을 경우 하고 싶은 함수
  - queryClient.invalidateQueries : queryKey를 사용해 값을 다시 refetch를 한다

하나 주의 할점!
onSuccess를 사용하지 않는다면 mutationFn이 랜더된 후에도 화면에 바뀐 결과가 나타나지 않을겁니다. 그 이유로는 mutation은 단순히 `uniquekeyname`을 가지고 있는 값을 바꾸어버릴 뿐 다시 fetch 해오지 않기 때문입니다.

```
// const queryClient = new QueryClient() 를 사용하는 방법
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (title) => wait(1000).then(() => POSTS.push({ id: 1, title })),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
      <button onClick={()=> mutate('New post') } />
  )
```

</br>

## Devtool

React Query Devtools는 React Query의 장점중의 하나인 강력한 내장 개발 도구입니다.
사용중인 모든 쿼리 상태들을 시각화하여 확인할수 있게 도와주고 에러가 생기거나 예상대로 작동하지 않는 경우 문제를 해결할수 있게 도와줍니다.

사용 방법 : QueryClientProvider wrapper 안에 ReactQueryDevtools를 넣어줍니다.

```
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

...

return
  <QueryClientProvider client ={queryClient}>
    //initialIsOpen : open된 채로 시작
    //position : devtools를 열 수 있는 logo 위치 - 우측 하단으로 지정
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
```

//사진 넣기

npm i @tanstack/react-query-devtools

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

- <b>Query</b> : 서버 데이터를 가져오는 것
- <b>Mutation</b> : 서버 데이터의 값을 바꾸거나 추가 또는 삭제하는것

</br>

## Query

### 💬 useQuery 기본 설명

GET 요청과 비슷하게 서버 데이터를 가져오기 위해선 `useQuery`라는 hook이 사용됩니다. 이 `useQuery`를 사용할 때 두가지를 주의해야 합니다.

```
const data = useQuery(queryKey, queryFn)
```

- <b>queryKey</b> : `useQuery`마다 배열 형태로 부여되는 고유한 `key` 값입니다. 이 `queryKey`를 통해서 다른 mutation function이나 다른 곳에서도 해당 쿼리의 결과를 꺼내오는것이 가능합니다. `React query`는 이 `queryKey`로 캐싱 관리를 하여 데이터마다 고유한 `key` 값을 지정하는게 중요합니다. 더 나아가서 특정한 데이터를 가져오기 위해서 데이터의 아이디나 필요한 필터링 조건을 배열 형태로 보내줄수 있습니다.

```
/posts => ["posts"]
/posts/1 => ["posts", post.id]
/posts?authorId=1 => ["posts", {authorId : 1}]
/posts/2/comments => ["posts", post.id, "comments"]
```

- <b>queryFn</b> : `Promise` 처리가 이뤄지는 함수로 서버에 api를 요청하는 코드입니다.

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

- <b>data</b> : queryFn 함수를 랜더한 결과값을 나타냅니다.
- <b>isLoading</b> : boolean 형태의 값으로 서버에서 데이터를 받아오는 동안 로딩 화면을 보여주고 싶다면 이 값이 유용하게 쓰일것입니다.
- <b>isError</b> : boolean 형태의 값으로 여러번의 시도끝에 계속 queryFn 함수가 에러를 낸다면 이 값으로 에러를 확신할수 있습니다.
- <b>error</b> : 에러가 생겼을때 화면에 에러 메세지를 보이게 하고 싶거나 확인하고 싶다면 이 값을 쓸수 있습니다.
- <b>isSuccess</b> : boolean 형태의 값으로 성공적으로 데이터를 받아왔는지를 확인할 수 있습니다.
- <b>status</b> : `error`, `loading`, `success`중 값의 상태를 확인할 수 있습니다.
- <b>fetchStatus</b> :
  - `fetching` : 현재 데이터를 가지고 오는 중일때를 뜻합니다
  - `idle` : 현재 아무것도 하지 않고 있거나 데이터를 가져온 후를 뜻합니다.
  - `paused` : 데이터를 가져오는중에 인터넷과 끊겼거나 어떠한 이유로 멈췄을 때를 뜻합니다.

</br>

### 📌 useQuery를 사용해 fetching 할때의 과정

1. 페이지안의 컴포넌트에 `useQuery`가 있을때 `useQuery`는 실행되며 밑의 상황들이 일어날때 다시 실행됩니다.

   - 페이지 새로고침
   - 한 페이지에서 다른 페이지로 넘어갈때
   - 마우스 포커스를 다른 곳에 뒀다가 다시 페이지로 돌아갈때
   - 인터넷이 끊겼다가 다시 돌아오는 동시에 페이지를 보여줄때

2. `QueryKey`를 사용해 데이터가 `stale`인지를 알아본다음 `refetch`를 합니다.
3. `refetch`된 데이터를 화면에 보여줍니다.

제일 처음에 페이지를 로딩할때

```
fetchStatus : fetching
 status : loading
```

데이터를 성공적으로 가져왔을 때

```
fetchStatus : idle
 status : success (실패할 경우 "error")
```

다른 페이지로 넘어갈때 똑같은 데이터를 넘어가는 페이지에서도 부를 경우 (Refetching)

```
fetchStatus : fetching
 status : success (실패할 경우 "error")
```

</br>

### 📌 useQuery에서 자주 사용되는 옵션

```
  const { data, isLoading, isError, error, isSuccess, status} = useQuery({
    queryKey: ["posts", postQuery?.data?.postId],
    queryFn: getPosts,
    enabled: postQuery?.data.postId !== null,
    staleTime : 1000,
    refetchInterval : 1000,
  });
```

<b>enabled</b> : 위에서 말했듯이 `useQuery`는 비동기로 작동합니다. 만약 여러개의 `useQuery`를 한 컴포넌트에서 동기로 작동하고 싶다면 `enable`를 사용할수 있습니다. boolean 형태의 조건을 넣어주면서 조건이 `true`일때 `useQuery`를 작동시킵니다.

<b>staleTime</b> : 데이터를 `fresh`상태에서 `stale`상태로 전환될 때까지의 시간을 정해줄 수 있습니다. 만약 5분을 지정해준다면 5분동안은 데이터가 `fresh`상태를 유지할것이며 `fresh`상태의 데이터는 항상 cache에서 읽어온다는 것을 뜻합니다.

<b>refetchInterval</b>: milisecond 단위의 시간으로 지정한 시간마다 데이터를 refetch 할수 있습니다. 만약 1000를 지정해주었다면 1초마다 한번씩 데이터를 refetch 해줍니다.

> 💡 <b>stale이란?</b> React query는 캐싱된 data를 `stale`한 상태로 여깁니다. 여기서 `stale`은 "신선하지 않다"라는 뜻이 있는데요. 이 `stale`한 data는 최신화가 필요한 데이터라는 의미로 컴포넌트가 마운트나 업데이트되면 refetch가 됩니다.

</br>

## Mutation

### 💬 useMutation 기본 설명

POST나 PUT 요청과 비슷하게 서버 데이터의 값을 바꾸거나 추가 또는 삭제하기 위해선 `useMutation`이라는 hook이 사용됩니다. 받는 props들이 위의 `useQuery`와 동일하지만 그 외에 또 다른 하나의 `mutate` 또는 `mutateAsync`이라는 props를 받습니다.

- `mutate`는 함수 형태이며 `useMutation`을 실행할수 있게 도와줍니다.
- `mutateAsync`는

- <b>mutationFn</b> : queryFn과 같이 Promise 처리가 이뤄지는 함수로 서버에 api를 요청하는 코드입니다. 하나의 props를 받을수 있으며 이 값을 함수에 전달하여 사용할수 있습니다.
- <b>onSuccess</b> : 예상대로 작동했을때 실행되는 함수입니다. `onSuccess`를 사용하지 않는다면 `mutationFn`이 랜더된 후에도 화면에 바뀐 결과가 나타나지 않을겁니다. 그 이유로는 mutation은 단순히 `uniquekeyname`을 가지고 있는 값을 바꾸어버릴 뿐 다시 `fetch` 해오지 않기 때문입니다. `onSuccess`가 실행될때 세개의`props`를 받는데요. `data`는 결과값을 나타내고 `props`는 `mutationFn`에서 전달했던 값과 같은 값을 받습니다. 마지막으로 `context`는 `onMutate` 함수에서 return 하는 값을 뜻합니다.

  - queryClient.invalidateQueries : queryKey를 사용해 값을 다시 refetch를 할수 있습니다.

- <b>onError</b> : 예상대로 작동하지 않았을때 실행되는 함수입니다.
- <b>onSettled</b> : 위의 `onError`과 `onSuccess`와 다르게 4개의 props를 받아내며 `data`와 `error`을 다 전달 받을수 있습니다.
- <b>onMutate</b> : 위의 세개의 함수와 다르게 props를 하나만 전달 받는 함수 입니다. 이 함수는 `mutationFn`이 작동되기 전에 실행되며 여기서 보내는 값은 `onSuccess`의 `context`로 전달됩니다. 데이터를 여러번 생성또는 변경되는걸 막기위해 이 함수는 예상대로 작동하지 않아도 다시 시도를 해보려 하지 않습니다. 하지만 `retry`를 통해 다시 시도 해볼 수를 지정할수 있습니다.

```
  const queryClient = useQueryClient();

  const {data, error, status,isIdle, isSuccess, isError, mutate } = useMutation({
    mutationFn: (props) => wait(1000).then(() => POSTS.push({ id: 1, props })),
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error, props, context) => {
      ...
    },
    onSettled: (data, error, props, context) => {
      ...
    },
    retry: 3,
    onMutate: props => {
      return {key:"value"}
    },
  });


  return (
      <button onClick={()=> mutate('New post') } />
      <button onClick={()=> mutateAsync('New post').then(()=>{}) } />
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

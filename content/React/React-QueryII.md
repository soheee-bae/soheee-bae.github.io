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

Query : 데이터를 가져오는 것
Mutation : 데이터의 값을 바꾸거나 추가 또는 삭제하는것

### useQuery에 대해서

useQuery를 사용할땐 두가지를 주의해야 합니다.

- queryKey : useQuery마다 배열 형태로 부여되는 고유한 key 값. 이 queryKey를 통해서 다른 mutation function이나 다른 곳에서도 해당 쿼리의 결과를 꺼내오는것이 가능합니다. 더 나아가서 특정한 데이터를 가져오기 위해서 데이터의 아이디나 필요한 필터링 조건을 배열 형태로 보내줄수 있습니다.

```
/posts => ["posts"]
/posts/1 => ["posts", post.id]
/posts?authorId=1 => ["posts", {authorId : 1}]
/posts/2/comments => ["posts", post.id, "comments"]
```

- queryFn : Promise 처리가 이뤄지는 함수로 서버에 api를 요청하는 코드입니다.

```
import { useQuery, useMutation} from '@tanstack/react-query'

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function App() {
  const newQuery = useQuery({
    queryKey: ["uniqueKeyName"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });
}

```

#### useQuery 결과에 대해서

- data : queryFn 함수를 랜더한 결과값을 나타낸다.
- isLoading : 서버에서 데이터를 받아오는 동안 로딩 화면을 보여주고 싶다면 이 값을 쓸수 있다.
- isError : boolean 형태의 값으로 여러번의 시도끝에 계속 queryFn 함수가 에러를 낸다면 이 값으로 에러를 확신할수 있다.
- error: 에러가 생겼을때 화면에 에러 메세지를 보고 싶거나 확인하고 싶다면 이 값을 쓸수 있다.
- isSuccess :
- status : `error`, `loading`, `success`

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
- onSuccess : 예상대로 작동해 값을 받을 경우 하고 싶은 함수
  - queryClient.invalidateQueries : queryKey를 사용해 값을 다시 refetch를 한다

하나 주의 할점!
onSuccess를 사용하지 않는다면 mutationFn이 랜더된 후에도 화면에 바뀐 결과가 나타나지 않을겁니다. 그 이유로는 mutation은 단순히 `uniquekeyname`을 가지고 있는 값을 바꾸어버릴 뿐 다시 fetch 해오지 않기 때문입니다.

```
// const queryClient = new QueryClient() 를 사용하는 방법
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (title) => wait(1000).then(() => POSTS.push({ id: 1, title })),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
      <button onClick={()=> mutate('New post') } />
  )
```

### Devtool

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

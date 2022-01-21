import React, { FC, useState } from 'react'
import { useGetPostIdQuery, useGetPostsQuery } from '../../api/jsonPlaceHolder'
import s from './app.module.scss'

const App: FC = () => {
  const [count, setCount] = useState('')
  const [id, setId] = useState('')
  const [value, setValue] = useState('')
  const { data = [], error, isLoading: loadPosts, isFetching: fetchPosts } = useGetPostsQuery(count)
  const { data: postId, isLoading: loadPost, isFetching: fetchPost } = useGetPostIdQuery(id)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setId(value)
  }
  return (
    <div className={s.component}>
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value=''>all</option>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
      </select>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange} />
      </form>
      {error ? (
        <>Oh no, there was an error</>
      ) : fetchPosts ? (
        <>Loading...</>
      ) : data ? (
        <>
          {fetchPost ? (
            <>Loading...</>
          ) : postId ? (
            <div className={s.big}>{postId?.title}</div>
          ) : null}

          <div className={s.block}>
            {data.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
export default App

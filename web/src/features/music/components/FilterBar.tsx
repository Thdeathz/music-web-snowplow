import React from 'react'
import { useGetAllTopicsQuery } from '../store/musicService'
import Loading from '~/components/Loading'
import { useDispatch } from 'react-redux'
import { selectCurrentFilterTopic, setFilterTopic } from '../store/musicSlice'
import { useAppSelector } from '~/hooks/useRedux'
import { trackSelfDescribingEvent } from '@snowplow/browser-tracker'
import useAuth from '~/hooks/useAuth'

type FilterItemPropsType = {
  id: string
  name: string
  actived?: boolean
}

const FilterItem = ({ id, name, actived = false }: FilterItemPropsType) => {
  const dispatch = useDispatch()
  const { userId, username } = useAuth()

  const onClick = () => {
    if (id !== 'All')
      trackSelfDescribingEvent({
        event: {
          schema: 'iglu:com.chillzone/filter_topic/jsonschema/1-0-0',
          data: {
            user_id: userId,
            username,
            topic_id: id,
            topic_name: name
          }
        }
      })

    dispatch(setFilterTopic(name))
  }

  return (
    <button
      className={`font-secondary whitespace-nowrap rounded-full border-2 border-clr-link-light px-5 text-3xl font-semibold leading-6 transition-all duration-200 hover:translate-y-[-3px] active:scale-95 ${
        actived ? 'bg-clr-link-light text-white' : ''
      }`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

const FilterBar = () => {
  const filterTopic = useAppSelector(selectCurrentFilterTopic)
  const { data: topics, isLoading } = useGetAllTopicsQuery({ page: 1 })

  if (isLoading || !topics) return <Loading className="text-3xl" />

  return (
    <div className="hidden-scroll-bar flex w-full items-center justify-start gap-1 overflow-x-auto pt-4">
      <FilterItem name="All" id="All" actived={filterTopic === 'All'} />

      {topics.data.map(topic => (
        <FilterItem key={topic.id} id={topic.id} name={topic.name} actived={filterTopic === topic.name} />
      ))}
    </div>
  )
}

export default FilterBar

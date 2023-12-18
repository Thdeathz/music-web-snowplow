import React from 'react'

type PropsType = {
  topics: ITopic[]
}

const Topics = ({ topics }: PropsType) => {
  return (
    <div className="flex items-center justify-start gap-2">
      {topics.map(topic => (
        <div
          key={`topic-${topic.id}`}
          className="font-secondary w-min whitespace-nowrap rounded-full border-2 border-clr-link-light bg-clr-link-light px-5 text-3xl font-semibold leading-6 text-white"
        >
          {topic.name}
        </div>
      ))}
    </div>
  )
}

export default Topics

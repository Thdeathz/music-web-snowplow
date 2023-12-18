import React from 'react'

type PropsType = {
  type?: 'list' | 'detail'
  title: string
  titleSize?: string
}

const SectionHeader = ({ type = 'list', title, titleSize = 'text-5xl' }: PropsType) => {
  return (
    <div
      className={`flex w-full items-end justify-between bg-app-light ${type === 'detail' ? 'sticky top-24 z-10' : ''}`}
    >
      <p className={`font-secondary font-semibold ${titleSize} max-w-[25rem]`}>{title}</p>

      {type === 'list' && (
        <button className="text-xl font-medium tracking-wider underline transition-transform duration-200 hover:translate-y-[-3px]">
          View all
        </button>
      )}
    </div>
  )
}

export default SectionHeader

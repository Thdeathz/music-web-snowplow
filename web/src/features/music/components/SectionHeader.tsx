import React from 'react'

type PropsType = {
  title: string
  titleSize?: string
}

const SectionHeader = ({ title, titleSize = 'text-5xl' }: PropsType) => {
  return (
    <div className="flex w-full items-end justify-between">
      <p className={`font-secondary font-semibold ${titleSize} max-w-[25rem]`}>{title}</p>

      <button className="text-xl font-medium tracking-wider underline transition-transform duration-200 hover:translate-y-[-3px]">
        View all
      </button>
    </div>
  )
}

export default SectionHeader

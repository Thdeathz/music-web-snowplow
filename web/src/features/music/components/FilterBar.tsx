import React from 'react'

type FilterItemPropsType = {
  name: string
  actived?: boolean
}

const FilterItem = ({ name, actived = false }: FilterItemPropsType) => {
  return (
    <button
      className={`font-secondary rounded-full border-2 border-clr-link-light px-5 text-3xl font-semibold leading-6 ${
        actived ? 'bg-clr-link-light text-white' : ''
      }`}
    >
      {name}
    </button>
  )
}

const FilterBar = () => {
  return (
    <div className="flex items-center justify-start gap-1">
      <FilterItem name="Classic" actived />

      <FilterItem name="90s" />

      <FilterItem name="New" />
    </div>
  )
}

export default FilterBar

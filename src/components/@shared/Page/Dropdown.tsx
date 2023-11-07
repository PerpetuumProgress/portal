import React from 'react'

interface DropdownProps {
  options: string[]
  onSelect: (selectedOption: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <select onChange={(event) => onSelect(event.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Dropdown

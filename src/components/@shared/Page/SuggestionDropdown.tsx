import React from 'react'

interface SuggestionDropdownProps {
  suggestions: string[]
}

const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  suggestions
}) => {
  return (
    <div>
      {suggestions.map((suggestion, index) => (
        <div key={index}>{suggestion}</div>
      ))}
    </div>
  )
}

export default SuggestionDropdown

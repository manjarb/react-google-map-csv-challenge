import React from 'react'

export const CsvSidebar = ({ id, fileName, onChoose }) => (
  <div>
    <p>{fileName}</p>
    <button
      type="button"
      className="button is-info"
      onClick={() => onChoose(id)}
    >
      Choose
    </button>
  </div>
)

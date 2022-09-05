import React from 'react'
import Word from '../components/word'

export default function Home() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Wordle!</h1>
      <div
        style={{
          height: '30vw',
          width: '25vw',
          padding: '1vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '1vw 0',
        }}
      >
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
      </div>
    </div>
  )
}

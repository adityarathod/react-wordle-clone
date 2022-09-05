import React, { useEffect } from 'react'
import Word from '../components/word'

export default function Home() {
  // Start listening for events when page loads
  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [])
  
  // Handle key presses
  const handleKey = (event) => {
    // If a letter is typed
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      console.log(event.key.toLowerCase());
    }
  }

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

import { useRef, useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState(null)
  const inputRef = useRef()

  const submitHandler = () => {
    setPlayerName(inputRef.current.value)
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={inputRef} type="text" />
        <button onClick={submitHandler}>Set Name</button>
      </p>
    </section>
  );
}

import { useCallback, useEffect, useState, useRef } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const [isCopied, setIsCopied] = useState(false)

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    //passwordRef.current?.setSelectionRange(0,9) when you need by default range
    window.navigator.clipboard.writeText(password)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }, [password])
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"

    if (charAllowed) str += "[]{}*&^%$#@!_-+=?<>"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center text-3xl my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password}
            className="outline-none text-xl w-full py-1 px-3 bg-white"
            placeholder="Password"
            readOnly
            ref={passwordRef} />
          <button
            onClick={copyPasswordToClipBoard}
            className={`outline-none px-3 py-0.5 shrink- text-white ${isCopied ? "bg-green-600" : "bg-blue-700"
              }`}>
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={100}
              value={length} className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => { setNumberAllowed((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => { setCharAllowed((prev) => !prev) }} />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

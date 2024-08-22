
import './App.css'

function App() {
  
  return (
<div>
  <header className="p-4 flex justify-between">
    <a href="" className="flex items-center gap-1">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 -rotate-90" >
     <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
     </svg>
    <span className="font-bold text-xl">
      SafariStay
    </span>

    </a>
    <div className="flex gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500">
      <div>Anywhere</div>
      <div className="border-l border-gray-300"></div>
      <div>  Any week</div>
      <div className="border-l border-gray-300"></div>
      <div>  Any Guests</div>
      <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
     <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>

      </button>
    </div>
  </header>
</div>
  )
}

export default App
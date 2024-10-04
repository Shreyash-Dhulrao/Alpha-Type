import React, { useState, useEffect } from 'react'
import assets from '../../Assets'
import { Link } from 'react-router-dom';

const rowsOfKeys1 = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
];
const basicWords = [
  ['H', 'E', 'L', 'L', 'O'], ['W', 'O', 'R', 'L', 'D'],
  ['I'], ['A', 'M'], ['T', 'Y', 'P', 'I', 'N', 'G'], ['O', 'N'], ['A', 'L', 'P', 'H', 'A'], ['T', 'Y', 'P', 'E'],
  ['S', 'O', 'O', 'N'], ['I'], ['B', 'E', 'C', "O", 'M', 'E'], ['B', 'E', 'S', 'T'], ['T', 'Y', 'P', 'E', 'R'], ['I', 'N'], ['M', 'Y'], ['F', 'I', 'E', 'L', 'D']
];

function App() {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showTypingArea, setShowTypingArea] = useState(false);
  const [rowsOfKeys, setRowsOfKeys] = useState(rowsOfKeys1);
  const [typedText, setTypedText] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [disableTyping, setDisableTyping] = useState(false);
  const [lastWordTyped, setLastWordTyped] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const currentRowKeys = rowsOfKeys[currentRowIndex];
  const currentKey = currentRowKeys[currentCharIndex];

  useEffect(() => {
    if (showTypingArea) {
      setCurrentCharIndex(0);
      setTypedText('');
    }
  }, [currentRowIndex, showTypingArea]);

  const handleStartTyping = () => {
    setCurrentRowIndex(0);
    setShowTypingArea(true);
  };

  const handleKeyPress = (event) => {
    if (!showTypingArea || disableTyping) return;


    if (event.key === "Backspace") {
      setTypedText((prevText) => prevText.slice(0, -1));
      return;
    }

    if (event.key === currentKey) {
      if (currentCharIndex === currentRowKeys.length - 1) {
        if (currentRowIndex === rowsOfKeys.length - 1) {
          handleFinishTyping();
          setShowNextButton(true);
          setDisableTyping(true);
          return;
        } else {
          setCurrentRowIndex(currentRowIndex + 1);
          setCurrentCharIndex(0);
          setTypedText('');
          return;
        }
      } else {
        setCurrentCharIndex(currentCharIndex + 1);
      }
      setTypedText(typedText);

    }
  };
  const handleChange = (e) => {
    const input = e.target.value;
    setTypedText(input);
  };

  const handleFinishTyping = () => {
    setShowNextButton(false);
    setDisableTyping(false)
    setCurrentRowIndex(0);
    setCurrentCharIndex(0);
    setTypedText('');
    setTypingFinished(true);
    setRowsOfKeys(basicWords);
    const lastWord = basicWords[basicWords.length - 1];
    const lastWordLastChar = lastWord[lastWord.length - 1];
    if (currentKey === lastWordLastChar) {
      setLastWordTyped(true);
    }
  };



  return (
    <div className="font-Inter min-h-screen h-full bg-zinc-100 dark:bg-zinc-700 pt-16 dark:text-white">
      <header className="text-white bg-purple-500 py-3">
        <h1 className="text-3xl font-bold text-center tracking-wider">Welcome to Typing Practice</h1>
      </header>
      <main className="flex-1 container mx-auto p-4">
        <section className="mb-8">
          <h2 className='text-2xl font-semibold tracking-wider'>Introduction</h2>
          <p className="text-lg ">Typing skills are essential in today's digital world, impacting productivity and efficiency in various domains.
            Proficient typing enhances communication, work performance, and overall computer literacy.The QWERTY keyboard layout is the standard for most English-language keyboards, with keys arranged in a specific order.
            This layout is named after the first six letters in the top row of keys and was designed to prevent jamming on early typewriters.
          </p>
          <h2 className='text-2xl font-semibold mt-4 tracking-wider'>Hand Position</h2>
          <p className='text-lg'>Proper hand positioning is crucial for efficient typing, with fingers resting on the home row keys: ASDF for the left hand and JKL; for the right hand.
            The index fingers should be placed on the F and J keys, which typically have tactile markers for easy identification.Touch typing involves typing without looking at the keyboard, using all fingers to minimize movement and increase speed and accuracy.
            Beginners can start with simple exercises, gradually progressing to more complex ones to develop touch typing skills.</p>

          <h2 className="text-2xl font-semibold mt-4 tracking-wider">Practice</h2>
          <p className="text-lg">
            Click the "Start Typing" button below to begin practicing typing. Once you reach the end of the row, press Enter to switch to the next row.
          </p>
          <h2 className="text-2xl font-semibold mt-4 tracking-wider">Hands</h2>
          <p className="text-lg">
            Before start of typing you should keep your hands as mentioned below Video
          </p>
          <img src={assets.Keyboard} alt="Keyboard" width='1024px' className='my-5 outline-none mx-auto rounded-lg' />
            </section>
            <section className="mb-8 flex flex-col items-center gap-3">
              {!showTypingArea && (
                <button
                  className='bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-purple-500 hover:bg-purple-500 transition dark:text-white py-2 px-4 rounded-lg '
                  onClick={handleStartTyping}
                >
                  Start Typing
                </button>
              )}
              {showTypingArea && (
                <div className="flex justify-center mb-4 select-none textbox">
                  {rowsOfKeys[currentRowIndex].map((char, index) => (
                    <div key={index} className="border border-zinc-300 p-2 rounded-md mx-1 bg-white text-black outline-none">
                      <span className={index === currentCharIndex ? 'text-purple-400 border-b-2 border-purple-400' : ''}>
                        {char}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {showTypingArea && (
                <textarea
                  className="border border-zinc-300 p-2 w-3/4 rounded-lg p-3 h-40 text-black outline-none textbox"
                  placeholder="Start typing here..."
                  value={typedText}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  disabled={disableTyping}
                />
              )}
              {showNextButton && !nextButtonClicked && (
                <button
                  className='bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-purple-500 hover:bg-purple-500 transition dark:text-white py-2 px-4 rounded-lg '
                  onClick={handleFinishTyping}
                >
                  Practice Words
                </button>
              )}
              {lastWordTyped && (
                <Link to='/Normal' className=' border-b-2 border-transparent hover:dark:border-purple-500 hover:dark:text-purple-400 transition dark:text-white py-3 mx-3 px-4 '>Go to next</Link>
              )}
            </section>
          </main>
        </div>
        );
}

        export default App;

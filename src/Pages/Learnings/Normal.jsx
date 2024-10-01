import React, { useState, useEffect } from 'react';
import assets from '../../Assets'

const generateRandomWords = () => {
    const words = [
        'coffee', 'table', 'window', 'book', 'computer', 'keyboard', 'chair', 'lamp', 'phone', 'door',
        'music', 'movie', 'friend', 'work', 'school', 'exercise', 'food', 'family', 'sleep', 'dream',
        'happy', 'sad', 'love', 'smile', 'laugh', 'game', 'time', 'watch', 'listen', 'learn'
    ];    

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

const App = (props) => {
    const [randomWords, setRandomWords] = useState(generateRandomWords());
    const [typedWord, setTypedWord] = useState('');
    const [timer, setTimer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [wordsTyped, setWordsTyped] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        if (isTimerRunning && typedWord === randomWords) {
            setRandomWords(generateRandomWords());
            setTypedWord('');
            setWordsTyped(prevWordsTyped => prevWordsTyped + 1);
        }
    }, [typedWord, randomWords, isTimerRunning]);

    useEffect(() => {
        if (remainingTime === 0) {
            setIsTimerRunning(false);
            clearInterval(timer);
            setTypedWord('');
        }
    }, [remainingTime, timer, wordsTyped]);

    const handleChange = (e) => {
        const input = e.target.value;
        setTypedWord(input);
    };

    const handleAddTimer = () => {
        const timerDuration = 30; // Duration in seconds
        
        // Clear previous interval
        if (timer) {
            clearInterval(timer);
        }
        
        // Initialize remaining time
        setRemainingTime(timerDuration);
        
        // Set up new interval
        const newTimer = setInterval(() => {
            setRemainingTime(prevRemainingTime => {
                const updatedTime = prevRemainingTime - 1;
                if (updatedTime === 0) {
                    clearInterval(newTimer); // Clear the timer
                    setTimer(null);
                    setTypedWord(''); // Reset the typed word
                    setIsTimerRunning(false); // Set timer running state to false
                }
                return updatedTime;
            });
        }, 1000); // Update every second
        
        setTimer(newTimer);
        setIsTimerRunning(true); // Set timer running state to true
        setWordsTyped(0); // Reset words typed count
    };
    
    const handleDisableTextbox = () => {
        return !isTimerRunning;
    };

    return (
        <div className="font-Inter min-h-screen h-full bg-zinc-100 dark:bg-zinc-700 pt-16 dark:text-white">
      <header className="text-white bg-purple-500 py-3">
        <h1 className="text-3xl font-bold text-center tracking-wider">Welcome to Typing Practice</h1>
      </header>
        <div className="mb-8 p-4">
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
            </div>
            <div className={`mx-4 pb-5 dark:text-white w-1/2 rounded-lg p-4 `}>
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-2">Random Words:</h1>
                    <div className="border border-gray-300 rounded-md px-4 py-2 w-full select-none textbox">
                        {randomWords.split('').map((char, index) => {
                            const isTyped = typedWord.charAt(index) === char
                            return (
                                <span key={index} className={isTyped ? 'text-indigo-400 border-b-2 border-indigo-400' : '' }>
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                </div>
                {isTimerRunning && (
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Type the Random Words:</h1>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md text-black px-4 py-2 w-full outline-none textbox"
                            value={typedWord}
                            onChange={handleChange}
                            disabled={handleDisableTextbox()}
                        />
                    </div>
                )}
                {!isTimerRunning && (
                    <div className='flex flex-row justify-center gap-3'>

                        <p className='pt-6'>Words Typed: <span>{wordsTyped}</span></p>
                    </div>
                )}
                {!isTimerRunning ? (
                    <button onClick={handleAddTimer} className='bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-purple-500 hover:bg-purple-500 transition dark:text-white py-2 px-4 rounded-lg ' >Start Typing</button>
                ) : (
                    <div className='flex flex-row justify-center gap-3'>
                        <p>{remainingTime} seconds remaining</p>
                    </div>

                )}

            </div>

        </div>
    );
};

export default App;

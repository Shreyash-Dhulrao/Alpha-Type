import React, { useState, useEffect } from 'react';
import assets from '../../Assets'

const stories = [
    'There was once a hare who was friends with a tortoise. One day, he challenged the tortoise to a race. Seeing how slow the tortoise was going, the hare thought he\'d win this easily. So, he took a nap while the tortoise kept on going. When the hare woke, he saw that the tortoise was already at the finish line. Much to his chagrin, the tortoise won the race while he was busy sleeping.',
    'After flying a long distance, a thirsty crow wandered the forest searching for water. Finally, he saw a pot half-filled with water. He tried to drink from it, but his beak wasn\'t long enough to reach the water inside. He then saw pebbles on the ground, and one by one, he put them in the pot until the water rose to the brim. The crow then hastily drank from it and quenched his thirst.',
    'There was a boy named John who was so lazy he couldn\'t even change his clothes. One day, he saw the apple tree in their yard was full of fruits. He wanted to eat some apples, but he was too lazy to climb the tree and take the fruits. So he lay down underneath the tree and waited for the fruits to fall off. John waited until he was starving, but the apples never fell.',
    'There was once a proud elephant who constantly bullied smaller animals. He would go to the anthill near his home and spray water at the ants. The ants, with their size, could do nothing but cry. The elephant just laughed and threatened the ants that he would crush them to death. One day, the ants had enough and decided to teach the elephant a lesson. They went straight into the elephant\'s trunk and started biting him. The elephant could only howl in pain. He realized his mistake and apologized to the ants and all the animals he bullied.',
    'The ant and the grasshopper were good friends. In the summer, the ant works hard to fill his storage with food. While the grasshopper was enjoying the fine weather and playing all day.When winter came, the ant was lying cozily in his home, surrounded by the food he stored during the summer. While the grasshopper was in his home, hungry and freezing. He asked the ant for food, and the ant gave him some. But it wasn\'t enough to last the entire winter. When he tried to ask the ant again, the latter replied: “I\'m sorry my friend but my food is just enough for my family to last until the end of winter. If I give you more, we too will starve. We had the entire summer to prepare for the winter but you chose to play instead.”',
];

const App = () => {
    const [typedWord, setTypedWord] = useState('');
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [storyLines, setStoryLines] = useState([]);
    const [showTypingSpeed, setShowTypingSpeed] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [wordsTyped, setWordsTyped] = useState(0); 

    useEffect(() => {
        if (storyIndex < stories.length) {
            const lines = splitIntoLines(stories[storyIndex], 50); // Adjust the number of characters per line as needed
            setStoryLines(lines);
            setCurrentLineIndex(0);
            setTypedWord('');
            setShowTypingSpeed(false);
            setWordsTyped(0); // Reset wordsTyped state when changing the story
        }
    }, [storyIndex]);

    useEffect(() => {
        if (typedWord === storyLines[currentLineIndex]) {
            const nextIndex = currentLineIndex + 1;
            if (nextIndex < storyLines.length) {
                setCurrentLineIndex(nextIndex);
                setTypedWord('');
            } else {
                setShowTypingSpeed(true);
                calculateTypingSpeed(); // Calculate typing speed when reaching end of story
            }
        }
    }, [typedWord, currentLineIndex, storyLines]);

    const splitIntoLines = (text = '', maxCharsPerLine) => {
        const lines = [];
        let currentLine = '';
        const words = text.split(' ');
        words.forEach(word => {
            if (currentLine.length + word.length <= maxCharsPerLine) {
                currentLine += word + ' ';
            } else {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            }
        });
        if (currentLine.trim() !== '') {
            lines.push(currentLine.trim());
        }
        return lines;
    };

    const handleChange = (e) => {
        const input = e.target.value;
        setTypedWord(input);
        if (!startTime) {
            setStartTime(new Date());
        }
    };

    const handleNextStory = () => {
        setStoryIndex(storyIndex + 1);
        setStartTime(null);
        setCurrentLineIndex(0);
        setShowTypingSpeed(false);
        setWordsTyped(0); // Reset wordsTyped state when starting a new story
    };

    const calculateTypingSpeed = () => {
        const elapsedTime = (new Date() - startTime) / 1000 / 60; // Convert to minutes
        const speed = Math.round(wordsTyped / elapsedTime); // Calculate typing speed based on words typed
        setTypingSpeed(speed);
    };

    useEffect(() => {
        if (startTime && typedWord === storyLines[currentLineIndex]) {
            const wordsInLine = typedWord.split(' ').filter(word => word !== '').length; // Count words in the current line
            setWordsTyped(prevWordsTyped => prevWordsTyped + wordsInLine); // Update wordsTyped state
        }
    }, [typedWord, currentLineIndex, storyLines, startTime]);

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
                    <div className="border border-gray-300 rounded-md px-4 py-2 w-full select-none textbox" style={{ whiteSpace: 'nowrap' }}>
                        {storyLines[currentLineIndex] && storyLines[currentLineIndex].split('').map((char, index) => {
                            const isTyped = index < typedWord.length && typedWord.charAt(index) === char;
                            return (
                                <span key={index} className={isTyped ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}>
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                </div>
                {showTypingSpeed ? (
                    <div className='flex flex-row justify-center gap-3'>
                        <p className='pt-6'>Typing Speed (WPM): <span>{typingSpeed}</span></p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Type the Random Words:</h1>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md text-black px-4 py-2 w-full outline-none textbox"
                            value={typedWord}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {showTypingSpeed && (
                    <div className='flex flex-row justify-center gap-3'>
                        <button onClick={handleNextStory} className='bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-purple-500 hover:bg-purple-500 transition dark:text-white py-2 px-4 rounded-lg ' >Next Story</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

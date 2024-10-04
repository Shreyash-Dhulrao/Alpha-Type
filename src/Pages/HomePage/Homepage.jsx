import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where , auth } from "../../Firebase/Firebase";
import { db } from "../../Firebase/Firebase";


const getRandomText = () => {
    const words = ["Hey", "buddy", "I", "am", "doing,", "well", "how", "done.", "Please", "help", "code", "typing", "may", "it", "labour", "work", "some", "margin", "profit", "Loss", "easy", "ad", "went", "venom", "query", "not", "exercise", "umbrella", "labrotary", "wise", "sit", "kingdom", "ex", "energy", "commando", "London", "Done", "art", "inspire", "doctor", "in", "reproduction", "in", "precious", "helping", "syringe", "casette", "hair", "english", "hindi", "nostalgic", "parlour.", "damage", "speaker", "advertise", "complain", "strategic", "night", "hammer", "in", "proof", "general", "carriage", "moon", "desire", "edge", "put", "mercy", "interactive"];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words.slice(randomIndex, randomIndex + 10).join(' ');
}

const TypingSpeedTest = (props) => {

    const [startTime, setStartTime] = useState(null);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [timeLimit, setTimeLimit] = useState(null);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timerVisible, setTimerVisible] = useState(false);
    const [topSpeed, setTopSpeed] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editIndex, setEditIndex] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const [timeDuration, setTimeDuration] = useState(0)
    const inputRef = useRef(null);
    const [Disabled, setDisabled] = useState(false)
    const [topSpeedsHistory, setTopSpeedsHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [userInput, setUserInput] = useState()
    const userId = auth.currentUser?.uid;

    const [randomText, setRandomText] = useState(() => {
        const savedText = localStorage.getItem('randomText');
        return savedText !== null ? savedText : getRandomText();
    });

    // const saveToFirestore = async ( record) => {
    //     console.log("Saving to Firestore: ", record);
    //         if(record.topSpeed !== 0 && record.timeframe !== 0) {
    //             try {
    //                 const q = query(collection(db, "topSpeedsHistory"), where("topSpeed", "==" , record.topSpeed)); // Replace "topSpeed" with the field you want to check
    //                 const querySnapshot = await getDocs(q);
    //                 console.log(querySnapshot);
    //                 console.log(querySnapshot.empty);
    //                 if (querySnapshot.empty) {
    //                     const docRef = await addDoc(collection(db, "topSpeedsHistory"), record);
    //                     console.log("Document written with ID: ", docRef.id);
    //                 } else {
    //                     console.log("Document already exists. Not adding again.");
    //                 }
    //             } catch (e) {
    //                 console.error("Error adding document: ", e);
    //             }
    //         }
    //     }

    const saveToFirestore = async (record) => {
        console.log("Saving to Firestore for user: ", userId, " with data: ", record.id);

        if (record.topSpeed !== 0 && record.timeframe !== 0) {
            try {
                const userDocRef = doc(db, "New Users", userId); // Reference to the user-specific document
                const userTypingDataRef = collection(userDocRef, "topSpeedsHistory");

                const q = query(userTypingDataRef, where("topSpeed", "==", record.topSpeed));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    const docRef = await addDoc(userTypingDataRef, record);
                    console.log("Document written with ID: ", docRef.id);
                } else {
                    console.log("Document already exists. Not adding again.");
                }
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    // const deleteFromFirebase = async (id) => {
    //     try {
    //         await deleteDoc(doc(db, 'New Users', userId));
    //         setTopSpeedsHistory(prevHistory => {
    //             const index = prevHistory.findIndex(record => record.id === id);

    //             if (index === -1) return prevHistory;
    //             const updatedHistory = [...prevHistory.slice(0, index), ...prevHistory.slice(index + 1)];
    //             const updatedHistoryWithRanks = updatedHistory.map((record, i) => ({
    //                 ...record,
    //                 rank: i + 1
    //             }));

    //             return updatedHistoryWithRanks;
    //         });
    //     } catch (e) {
    //         console.error('Error deleting document:', e);
    //     }
    // };

    const deleteFromFirebase = async (id) => {
        console.log('Deleting document with ID:', id);
        try {    
            if (!userId) {
                console.error('User not authenticated.');
                return;
            }
            const docRef = doc(db, 'New Users', userId, 'topSpeedsHistory', id);
    
            // Delete the specific document
            await deleteDoc(docRef);
            console.log(`Document with ID: ${id} deleted.`);

            setTopSpeedsHistory(prevHistory => {
                // Ensure that prevHistory is defined and is an array
                if (!Array.isArray(prevHistory)) {
                    console.error('prevHistory is not an array or undefined.');
                    return prevHistory; // Return the previous state unchanged
                }
    
                // Find the record by id and filter it out
                const updatedHistory = prevHistory.filter(record => record.id !== id);
    
                // Update the rank after deletion
                const updatedHistoryWithRanks = updatedHistory.map((record, i) => ({
                    ...record,
                    rank: i + 1 // Re-rank after deletion
                }));
    
                return updatedHistoryWithRanks;
            });
        } catch (e) {
            console.error('Error deleting document:', e);
        }
    };

    useEffect(() => {
        // const fetchFromFirebase = async () => {
        //     setIsLoading(true);
        //         try {
        //             const querySnapshot = await getDocs(collection(db, "topSpeedsHistory"));
        //             if (querySnapshot.docs.length > 0) {
        //                 const speedsHistory = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        //                 setTopSpeedsHistory(speedsHistory);
        //             }
        //         } catch (error) {
        //             console.error("Error fetching data from Firebase:", error);
        //         } finally {
        //             setIsLoading(false);
        //         }
        // };
        const fetchFromFirestore = async () => {
            setIsLoading(true);
            try {
                const userDocRef = doc(db, "New Users", userId);
                const userTypingDataRef = collection(userDocRef, "topSpeedsHistory");
    
                const querySnapshot = await getDocs(userTypingDataRef);
                const historyData = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Include the document ID
                    ...doc.data(), // Spread the rest of the document data
                }));
                setTopSpeedsHistory(historyData);

                console.log("Fetched data: ", historyData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (userId) {
            fetchFromFirestore();
        }
        fetchFromFirestore();
    }, []);

    useEffect(() => {
        console.log('topSpeedsHistory state:', topSpeedsHistory);
    }, [topSpeedsHistory]);

    const generateRandomText = () => {
        setRandomText(getRandomText());
    };

    const getRowCount = () => {
        const table = document.getElementById("topSpeedsTable");
        if (table) {
            return table.getElementsByTagName("tr").length - 1;
        }
        return 0;
    };


    const handleEdit = () => {
        setEditIndex(prevIndex => {
            if (prevIndex === null) {
                const newEditIndex = [];
                for (let i = rowCount; i >= 0; i--) {
                    newEditIndex.push(i);
                }
                return newEditIndex;
            }
            else {
                return null;
            }
        })
    };

    const handleSave = () => {
        const newRecord = {
            topSpeed: topSpeed,
            rank: topSpeedsHistory.length + 1,
            timeframe: timeDuration / 60,
        };
        console.log("Calling saveToFirestore with record:", newRecord);
        setTopSpeedsHistory([...topSpeedsHistory, newRecord]);
        saveToFirestore(newRecord);
    };

    const handleCancel = () => {
        setEditIndex(null);
    };
    const handleInputChange = (e) => {
        const typedText = e.target.value;
        setUserInput(typedText);

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (timerVisible && typedText === randomText) {
            const endTime = Date.now();
            const totalTimeInSeconds = (endTime - startTime) / 1000;
            const numberOfWords = randomText.trim().split(' ').length;
            const typingSpeed = Math.round(numberOfWords / (totalTimeInSeconds / 60));
            setTypingSpeed(typingSpeed);
            setUserInput('');
            setStartTime(null);
            if (timerSeconds > 0) {
                generateRandomText();
            }
            if (typingSpeed > topSpeed) {
                setTopSpeed(typingSpeed);
            }
        }


        if (typedText === randomText.slice(0, typedText.length)) {
            setCurrentIndex(typedText.length);
        } else if (typedText.includes('\n')) {
            setCurrentIndex(randomText.length);
        } else {
        }
        if (typedText === randomText && typedText.length === randomText.length) {
            setCurrentIndex(0);
        }

    };

    const handleRestart = () => {
        generateRandomText();
        setUserInput('');
        setStartTime(null);
        setTypingSpeed(0);
        setTimerSeconds(0);
        clearInterval(timeLimit);
        setTimerVisible(false);
        setCurrentIndex(0)
        setTopSpeed(0);
        inputRef.current.focus();
    };

    const startTimer = (duration) => {
        setTimerSeconds(duration);
        setTimeDuration(duration);
        const timer = setInterval(() => {
            setTimerSeconds(prevSeconds => {
                if (prevSeconds <= 0) {
                    clearInterval(timer);
                    setTimerVisible(false);
                }
                return prevSeconds - 1;
            });
        }, 1000);

        setTimeLimit(timer);
        setTimerVisible(true);
        setDisabled(false)
    };



    const handleTimerFinish = () => {
        const duration = timeDuration;
        const totalTimeInSeconds = duration;
        const numberOfWords = randomText.trim().split(' ').length;
        const typingSpeed = numberOfWords / (totalTimeInSeconds / 60);

        if (typingSpeed > 0) {
            console.log("Typing speed:", typingSpeed);
            if (typingSpeed > topSpeed) {
                setTopSpeed(topSpeed);
                console.log("topSpeed updated to:", topSpeed);
            }
            if (topSpeed !== 0) {
                const newRecord = { topSpeed: topSpeed, rank: topSpeedsHistory.length + 1, timeframe: duration / 60 };
                setTopSpeedsHistory(prevHistory => [...prevHistory, newRecord]);
                saveToFirestore(userId , newRecord);
            } else if (topSpeed === 0) {
                const newRecord = { topSpeed: 0, rank: topSpeedsHistory.length + 1, timeframe: duration / 60 };
                setTopSpeedsHistory(prevHistory => [...prevHistory, newRecord]);
                saveToFirestore(userId , newRecord);
            }
        }

        setDisabled(true);
        handleSave()
    };


    useEffect(() => {
        inputRef.current.focus();
        generateRandomText();
    }, []);

    useEffect(() => {
        setRowCount(getRowCount());
    }, [topSpeedsHistory]);


    useEffect(() => {

        if (timerVisible == false) {
            const timer = setTimeout(() => {
                console.log("Calling handleTimerFinish..."); // Debug log
                handleTimerFinish();
            }, timerSeconds * 1000);

            return () => clearTimeout(timer);
        }
    }, [timerVisible, timerSeconds]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/top-speeds-history'); // Adjust the endpoint as needed
            setTopSpeedsHistory(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className='w-full flex flex-col items-center mx-auto h-auto min-h-screen pt-16 dark:bg-zinc-900 dark:text-white bg-white transition duration-300  font-Inter'>
            <div className='w-3/4 dark:bg-zinc-800 bg-zinc-200 p-3 '>
            <div className={`lg:text-3xl text-lg font-light mb-4 border-2 border-zinc-300 dark:border-zinc-700  p-3 rounded-lg select-none font-Text `}>
                {randomText.split('').map((letter, index) => (
                    <span
                        key={index}
                        className={index < currentIndex ? 'text-purple-600 border-b-2 border-purple-300' : ''}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <input
                ref={inputRef}
                type="text"
                className={`w-full border border-zinc-300 dark:border-zinc-700  rounded-lg px-3 py-2 outline-none  dark:bg-zinc-800  font-Text`}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                disabled={Disabled}
            />
            <div className="text-center mt-4">
                {timerVisible && (
                    <p className="font-bold">Time Remaining: {Math.floor(timerSeconds / 60)}:{timerSeconds % 60 < 10 ? `0${timerSeconds % 60}` : timerSeconds % 60}</p>
                )}
                {!timerVisible && (
                    <div>
                        <p className="font-bold">Typing Speed: {typingSpeed} words per minute</p>
                        <button className='mt-4 px-4 py-2 bg-${props.btns} dark:text-white rounded-md focus:outline-none dark:hover:text-purple-400 hover:text-purple-500' onClick={handleRestart}>Reset</button>
                    </div>
                )}
            </div>
            {!timerVisible && (
                <div className="text-center mt-4">
                    {/* <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none" onClick={() => startTimer(30)}>30 Sec</button> */}
                    <button className={`mr-4 px-4 py-2 bg-purple-500 text-white rounded-md focus:outline-none`} onClick={() => startTimer(60)}>1 Min</button>
                    <button className={`mr-4 px-4 py-2 bg-purple-500 text-white rounded-md focus:outline-none`} onClick={() => startTimer(120)}>2 Min</button>
                    <button className={`px-4 py-2 bg-purple-500 text-white rounded-md focus:outline-none`} onClick={() => startTimer(300)}>5 Min</button>
                </div>

            )}
            <div className="text-center mb-4">
                <p className="font-bold">Top Speed: {topSpeed} wpm</p>
            </div>
            <div>
                {[topSpeedsHistory].map((record, index) => {
                    return (<div key={index}>
                        {record.id}
                        {record.topSpeed}
                    </div>
                    )
                })}
            </div>

            <div className="mt-8  w-full ">

                <h2 className="text-xl font-bold mb-2">Top Speeds History</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border border-gray-300 overflow-y-scroll" id="topSpeedsTable">
                        <thead>
                            <tr>
                                <th className="border border-zinc-700 dark:border-zinc-100 md:px-4 px-2 py-4 w-1/12">Rank</th>
                                <th className="border border-zinc-700 dark:border-zinc-100 px-4 py-4 w-1/4">Top Speed (wpm)</th>
                                <th className="border border-zinc-700 dark:border-zinc-100 md:px-4 px-1 py-4 w-1/6">Time (minutes)</th>
                                <th className="border border-zinc-700 dark:border-zinc-100 px-4 py-4">
                                    <button onClick={handleEdit} className={`mr-4 px-4 py-2 bg-${props.btns} text-black dark:text-white rounded-md`}>
                                        {editIndex === null ? 'Edit' : 'Back'}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {topSpeedsHistory && topSpeedsHistory.length > 0 ? (
                                topSpeedsHistory.map((record, index) => (
                                    <tr key={record.id} >
                                        <td className="border border-zinc-700 text-center dark:border-zinc-100 dark:text-white text-black md:px-4 px-1 py-4">{index + 1}</td>
                                        <td className="border border-zinc-700 text-center dark:border-zinc-100 dark:text-white text-black px-4 py-4">{record.topSpeed}</td>
                                        <td className="border border-zinc-700 text-center dark:border-zinc-100 dark:text-white text-black md:px-4 px-1 py-4">{record.timeframe}</td>
                                        <td className='border border-zinc-700 text-center dark:border-zinc-100 dark:text-white text-black px-4 py-2'>
                                            {editIndex !== null && editIndex[index] && (
                                                < >
                                                    <button onClick={() => deleteFromFirebase(record.id)} className=" md:px-4 px-2 py-1 bg-red-500 text-white rounded-md md:ms-6">Delete</button>
                                                    <button onClick={handleCancel} className={`md:px-4 px-2 text-underline dark:text-white rounded-md`}>Cancel</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No top speeds recorded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

            </div>
            </div>
        </div>
    );
};
export default TypingSpeedTest;

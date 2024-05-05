import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Verse() {
    const [chapters, setChapters] = useState([]);
    const [chapterNumber, setChapterNumber] = useState(1);
    const [verses, setVerses] = useState([]);
    const [verseNumber, setVerseNumber] = useState(1);
    const [verseData, setVerseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get('https://bhagavad-gita3.p.rapidapi.com/v2/chapters/', {
                    headers: {
                        'X-RapidAPI-Key': '6930282ed7msh4faa8ee1c6ab1bfp192912jsn2bf8ca1ae65d',
                        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
                    }
                });
                setChapters(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchChapters();
    }, []);

    useEffect(() => {
        const fetchVerses = async () => {
            try {
                const response = await axios.get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/`, {
                    headers: {
                        'X-RapidAPI-Key': '6930282ed7msh4faa8ee1c6ab1bfp192912jsn2bf8ca1ae65d',
                        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
                    }
                });
                setVerses(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchVerses();
    }, [chapterNumber]);

    useEffect(() => {
        const fetchVerse = async () => {
            try {
                const response = await axios.get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/${verseNumber}/`, {
                    headers: {
                        'X-RapidAPI-Key': '6930282ed7msh4faa8ee1c6ab1bfp192912jsn2bf8ca1ae65d',
                        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
                    }
                });
                setVerseData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchVerse();
    }, [chapterNumber, verseNumber]);

    const handleNextVerse = () => {
        if (verseNumber < verses.length) {
            setVerseNumber(verseNumber + 1);
        } else {
            // Logic for navigating to the next chapter
            const nextChapterNumber = chapterNumber < chapters.length ? chapterNumber + 1 : 1;
            setChapterNumber(nextChapterNumber);
            setVerseNumber(1);
        }
    };

    const handlePrevVerse = () => {
        if (verseNumber > 1) {
            setVerseNumber(verseNumber - 1);
        } else {
            // Logic for navigating to the previous chapter
            const prevChapterNumber = chapterNumber > 1 ? chapterNumber - 1 : chapters.length;
            setChapterNumber(prevChapterNumber);
            setVerseNumber(verses.length);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Verse Details</h1>
            {/* <div className="form-group">
                <label htmlFor="chapterSelect">Select Chapter:</label>
                <select className="form-control" id="chapterSelect" value={chapterNumber} onChange={handleChapterChange}>
                    {chapters.map((chapter) => (
                        <option key={chapter.chapter_number} value={chapter.chapter_number}>Chapter {chapter.chapter_number + ' : ' + chapter.name_meaning}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="verseSelect">Select Verse:</label>
                <select className="form-control" id="verseSelect" value={verseNumber} onChange={handleVerseChange}>
                    {verses.map((verse) => (
                        <option key={verse.verse_number} value={verse.verse_number}>Verse {verse.verse_number}</option>
                    ))}
                </select>
            </div> */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Chapter {verseData.chapter_number}, Verse {verseData.verse_number}</h5>
                    <p className="card-text">Text (English): {verseData.text}</p>
                    <p className="card-text">Text (Hindi): {verseData.text_hindi}</p>
                </div>
            </div>
            <div className="text-center mt-3">
                <button className="btn btn-primary mr-2" onClick={handlePrevVerse}><i className="fas fa-arrow-left"></i> Previous</button>
                <button className="btn btn-primary" onClick={handleNextVerse}>Next <i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    );
}

export default Verse;

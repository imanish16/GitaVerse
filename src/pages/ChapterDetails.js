import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function ChapterDetails() {
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
                setError(error.message || 'An error occurred while fetching chapters');
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
                setVerseNumber(1); // Reset verse number to 1 when fetching verses of a new chapter
            } catch (error) {
                setError(error.message || 'An error occurred while fetching verses');
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
                setError(error.message || 'An error occurred while fetching verse details');
            } finally {
                setLoading(false);
            }
        };

        fetchVerse();
    }, [chapterNumber, verseNumber]);

    const handleChapterChange = async (e) => {
        const selectedChapterNumber = parseInt(e.target.value);
        setChapterNumber(selectedChapterNumber);
    };

    const handleVerseChange = (e) => {
        setVerseNumber(parseInt(e.target.value));
    };

    const handleNextVerse = () => {
        if (verseNumber < verses.length) {
            setVerseNumber(verseNumber + 1);
        } else {
            const nextChapterNumber = chapterNumber < chapters.length ? chapterNumber + 1 : 1;
            setChapterNumber(nextChapterNumber);
            setVerseNumber(1);
        }
    };

    const handlePrevVerse = () => {
        if (verseNumber > 1) {
            setVerseNumber(verseNumber - 1);
        } else {
            const prevChapterNumber = chapterNumber > 1 ? chapterNumber - 1 : chapters.length;
            setChapterNumber(prevChapterNumber);
        }
    };

    if (loading) return <div className="loading"></div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-link" onClick={handlePrevVerse}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button className="btn btn-link" onClick={handleNextVerse}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="chapterSelect" className="form-label">Select Chapter:</label>
                    <select className="form-select" id="chapterSelect" value={chapterNumber} onChange={handleChapterChange}>
                        {chapters.map((chapter) => (
                            <option key={chapter.chapter_number} value={chapter.chapter_number}>Chapter {chapter.chapter_number} : {chapter.name_meaning}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="verseSelect" className="form-label">Select Verse:</label>
                    <select className="form-select" id="verseSelect" value={verseNumber} onChange={handleVerseChange}>
                        {verses.map((verse) => (
                            <option key={verse.verse_number} value={verse.verse_number}>Verse {verse.verse_number}</option>
                        ))}
                    </select>
                </div>
                {verseData && (
                    <div className="col-md-12">
                        <div className="card mt-2">
                            <div className="card-body">
                                <h5 className="card-title">Chapter {verseData.chapter_number}, Verse {verseData.verse_number}</h5>
                                <p className="card-text">Text (English): {verseData.text}</p>
                                <div className="translation-section mt-2">
                                    <h6>Translations :</h6>
                                    <p className="card-text"> {verseData.translations[0].description}</p>
                                </div>
                                <div className="commentary mt-4">
                                    <h6>Commentaries :</h6>
                                    {verseData.commentaries.filter(commentary => commentary.language === 'hindi').map((commentary, index) => (
                                        <div key={index}>
                                            <p><strong>Author:</strong> {commentary.author_name}</p>
                                            <p>{commentary.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChapterDetails;

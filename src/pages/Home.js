import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [chapterData, setChapterData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/',
                headers: {
                    'X-RapidAPI-Key': '6930282ed7msh4faa8ee1c6ab1bfp192912jsn2bf8ca1ae65d',
                    'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                const chapters = response.data;
                setChapterData(chapters);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % chapterData.length);
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + chapterData.length) % chapterData.length);
    };

    if (loading) return <div className="container mt-5 text-center"></div>;
    if (error) return <div className="container mt-5 text-center">Error: {error.message}</div>;
    if (!chapterData) return null;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 libre-baskerville-regular">Chapter Summary</h2>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <button className="btn btn-link" onClick={handlePrevClick} disabled={currentIndex === 0}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                                <h5 className="card-title text-center">Chapter {chapterData[currentIndex].chapter_number}: {chapterData[currentIndex].name}</h5>
                                <button className="btn btn-link" onClick={handleNextClick} disabled={currentIndex === chapterData.length - 1}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </div>
                            <p className="card-text text-justify"><strong>Summary (English):</strong> {chapterData[currentIndex].chapter_summary}</p>
                            <p className="card-text text-justify"><strong>Summary (Hindi):</strong> {chapterData[currentIndex].chapter_summary_hindi}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

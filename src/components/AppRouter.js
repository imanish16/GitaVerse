import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import Verse from "../pages/Verses";
import ChapterDetails from "../pages/ChapterDetails";
// import ErrorNotFound404 from "../pages/ErrorNotFound404";
export default function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/summary" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/daily-verse" element={<Verse />} />
                <Route path="/chapter-verse" element={<ChapterDetails />} />
                {/* <Route path="/oops" element={<ErrorNotFound404 />} /> */}
                <Route path="*" element={<Navigate to="/oops" />} />
            </Routes>
        </>
    )
}
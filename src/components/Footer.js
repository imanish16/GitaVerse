import React from 'react';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 footer-custom">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0 text-center text-md-start">
                        <p className="mb-0 text-light">© {new Date().getFullYear()} Gitaverse. Developed by Manish Sharma. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <a className="btn btn-outline-light me-2" href="https://github.com/imanish16/GitaVerse" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a className="btn btn-outline-light" href="https://www.linkedin.com/in/manish-sharma-b7a4aa14b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

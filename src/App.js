import React, { useState, useEffect } from 'react';  
import { Contact } from './Contact';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [videos, setVideos] = useState([]);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  useEffect(() => {
    const mockVideos = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Video ${index + 1}`,
      description: `This is a description for Video ${index + 1}.`,
    }));
    setVideos(mockVideos);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute top-0 left-0 w-full h-full h-screen z-1">
      <iframe
        className="w-full h-full object-cover blur-md pointer-events-none"
        src="https://www.youtube.com/embed/WPoHr-Uk9X8?autoplay=1&mute=1&loop=1&playlist=WPoHr-Uk9X8"
        title="YouTube video background"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
      {/* Overlay Content */}
      <div className="relative z-10">
          <header className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-800 bg-opacity-80">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Brandon's Video Portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl drop-shadow-lg">
              Welcome! I'm Brandon, a professional video editor with a passion for storytelling.
              I specialize in creating compelling visuals that bring ideas to life. Explore my portfolio
              to see my work and let's create something amazing together.
            </p>
            <div className="mt-6">
              <a
                href="#portfolio"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                View My Work
              </a>
            </div>
            <div className="mt-4">
              <button
                onClick={toggleMenu}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Menu
              </button>
              {isMenuOpen && (
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <a href="#about" className="text-gray-300 hover:text-white">
                        About Me
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="text-gray-300 hover:text-white">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </header>
          </div>
          <main id="portfolio" className="py-20 px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8">My Portfolio</h2>
            <div className="flex flex-col space-y-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-400">{video.description}</p>
                </div>
              ))}
            </div>
          </main>
          <div id="contact">
            <Contact />
          </div>
    </div>
);
}

export default App;

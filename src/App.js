import React, { useState, useRef } from 'react';
import { Contact } from './Contact';
import videoData from './data/videos.json';

function App() {
  const portfolio = videoData.portfolio;
  const [selectedServices, setSelectedServices] = useState([]);
  const contactRef = useRef(null);

  const services = [
    { key: 'videoEditing', title: 'Video Editing', anchor: 'video-editing', icon: 'M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12z' },
    { key: 'contentWriting', title: 'Content Writing', anchor: 'content-writing', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' },
    { key: 'screenwriting', title: 'Screenwriting', anchor: 'screenwriting', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
    { key: 'motionGraphics', title: 'Motion Graphics', anchor: 'motion-graphics', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z' },
  ];

  const handleBookService = (serviceTitle) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceTitle)) return prev;
      return [...prev, serviceTitle];
    });
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const renderItem = (item) => {
    if (item.platform === 'video') {
      return (
        <div key={item.id}>
          <div className="bg-gray-800 p-3 pb-10 shadow-lg hover:shadow-2xl transition duration-300" style={{ border: '1px solid #5a5549' }}>
            <video
              className="w-full"
              controls
              playsInline
              loop
              muted
              autoPlay
            >
              <source src={item.url} />
            </video>
            <h4 className="mt-4 text-center font-semibold" style={{ color: '#d4cfc4' }}>{item.title}</h4>
          </div>
        </div>
      );
    }

    if (item.platform === 'pdf') {
      return (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="bg-gray-800 p-3 pb-10 shadow-lg hover:shadow-2xl transition duration-300" style={{ border: '1px solid #5a5549' }}>
            {item.thumbnail ? (
              <div className="relative">
                <img src={item.thumbnail} alt={item.title} className="w-full" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
                  <span className="opacity-0 group-hover:opacity-100 transition duration-300" style={{ color: '#d4cfc4' }}>
                    Read Screenplay &rarr;
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[200px]" style={{ backgroundColor: '#2a2a2e' }}>
                <svg
                  className="w-12 h-12 mb-4"
                  style={{ color: '#6b8ea8' }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span style={{ color: '#6b8ea8' }} className="group-hover:opacity-80 transition duration-300">
                  Read Screenplay &rarr;
                </span>
              </div>
            )}
            <h4 className="mt-4 text-center font-semibold" style={{ color: '#d4cfc4' }}>{item.title}</h4>
          </div>
        </a>
      );
    }

    if (item.platform === 'link') {
      return (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="bg-gray-800 p-3 pb-10 shadow-lg hover:shadow-2xl transition duration-300" style={{ border: '1px solid #5a5549' }}>
            <div className="flex items-center justify-center min-h-[200px]" style={{ backgroundColor: '#2a2a2e' }}>
              <div className="p-8 text-center">
                <span style={{ color: '#6b8ea8' }} className="group-hover:opacity-80 transition duration-300">
                  View on Upwork &rarr;
                </span>
              </div>
            </div>
            <h4 className="mt-4 text-center font-semibold" style={{ color: '#d4cfc4' }}>{item.title}</h4>
          </div>
        </a>
      );
    }

    const embedSrc = item.platform === 'vimeo'
      ? `https://player.vimeo.com/video/${item.videoId}?badge=0&autopause=0`
      : item.platform === 'gdrive'
        ? `https://drive.google.com/file/d/${item.videoId}/preview`
        : `https://www.youtube.com/embed/${item.videoId}`;

    return (
      <div key={item.id}>
        <div className="bg-gray-800 p-3 pb-10 shadow-lg hover:shadow-2xl transition duration-300" style={{ border: '1px solid #5a5549' }}>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedSrc}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h4 className="mt-4 text-center font-semibold" style={{ color: '#d4cfc4' }}>{item.title}</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden" style={{ color: '#d4cfc4' }}>
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

      {/* Navigation */}
      <nav className="fixed top-0 right-0 z-20 p-6 flex gap-6">
        <a href="#services" className="text-sm tracking-wide hover:opacity-80 transition duration-300" style={{ color: '#d4cfc4' }}>
          Services
        </a>
        <a href="#portfolio" className="text-sm tracking-wide hover:opacity-80 transition duration-300" style={{ color: '#d4cfc4' }}>
          Portfolio
        </a>
        <a href="#about" className="text-sm tracking-wide hover:opacity-80 transition duration-300" style={{ color: '#d4cfc4' }}>
          About
        </a>
        <a href="#contact" className="text-sm tracking-wide hover:opacity-80 transition duration-300" style={{ color: '#d4cfc4' }}>
          Contact
        </a>
      </nav>

      {/* Hero */}
      <div className="relative z-10">
        <header className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-800 bg-opacity-80">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Brandon Johnston
          </h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-lg" style={{ color: '#b8b3a7' }}>
            Welcome! I'm Brandon, a professional video editor with a passion for storytelling.
            I specialize in creating compelling visuals that bring ideas to life. Explore my portfolio
            to see my work and let's create something amazing together.
          </p>
          <div className="mt-6">
            <a
              href="#services"
              className="inline-flex flex-col items-start font-semibold text-lg tracking-wide hover:opacity-80 transition duration-300"
              style={{ color: '#d4cfc4' }}
            >
              <span>View My Work</span>
              <svg className="w-full h-2 mt-1" viewBox="0 0 120 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="0" y1="4" x2="115" y2="4" />
                <polyline points="110,1 117,4 110,7" />
              </svg>
            </a>
          </div>
        </header>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 relative z-10 bg-gray-900 bg-opacity-90">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Services</h2>
        <p className="text-center mb-16 max-w-2xl mx-auto" style={{ color: '#b8b3a7' }}>
          What I can do for you
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px max-w-5xl mx-auto" style={{ backgroundColor: '#5a5549' }}>
          {services.map((service) => (
            <a
              key={service.key}
              href={`#${service.anchor}`}
              className="bg-gray-900 flex flex-col items-center justify-center py-14 px-6 text-center group hover:bg-gray-800 transition duration-500 no-underline"
              style={{ color: '#d4cfc4' }}
            >
              <svg
                className="w-10 h-10 mb-5 transition duration-500"
                style={{ color: '#6b8ea8' }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
              </svg>
              <h3 className="text-lg font-bold tracking-wide">{service.title}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <main id="portfolio" className="py-20 px-4 relative z-10 bg-gray-900 bg-opacity-90">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Portfolio</h2>
        <p className="text-center mb-16 max-w-2xl mx-auto" style={{ color: '#b8b3a7' }}>
          A curated selection of my work across disciplines
        </p>

        {services.map((service) => {
          const items = portfolio[service.key];
          if (!items || items.length === 0) return null;

          return (
            <section key={service.key} id={service.anchor} className="mb-20 max-w-6xl mx-auto">
              <h3 className="text-2xl font-semibold mb-8 border-b pb-2" style={{ color: '#d4cfc4', borderColor: '#5a5549' }}>
                {service.title}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {items.map(renderItem)}
              </div>
              <div className="mt-10 text-center">
                <button
                  onClick={() => handleBookService(service.title)}
                  className="inline-flex items-center gap-2 font-semibold tracking-wide hover:opacity-80 transition duration-300"
                  style={{ color: '#6b8ea8' }}
                >
                  <span>Book {service.title}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </button>
              </div>
            </section>
          );
        })}
      </main>

      {/* About Me Section */}
      <section id="about" className="py-20 px-4 relative z-10 bg-gray-800 bg-opacity-90">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div
              className="w-64 h-64 rounded-full overflow-hidden"
              style={{ borderColor: '#5a5549', borderWidth: '2px' }}
            >
              <img
                src="/headshot.png"
                alt="Brandon Johnston"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%', transform: 'scale(1.5)' }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#b8b3a7' }}>
              I've been fascinated by the world of film and the power of storytelling since I was
              young. I've come a long way since crashing my family's computer trying to export a
              10 minute stop motion animation drawn entirely in Paint. After graduating from Georgia
              College with a BA in Mass Communications, I went on to work in the film industry in
              the locations department before settling into a long-term post production role at Hit
              Network, where I eventually became the Manager of Post Production. As you may have
              guessed, movies are my passion, but I also enjoy video games, mixology, and even a
              bit of karaoke if you catch me on the right night.
            </p>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4 relative z-10 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Awards & Recognition</h2>
        <p className="text-center mb-16 max-w-2xl mx-auto" style={{ color: '#b8b3a7' }}>
          Festival selections and accolades for my screenwriting work
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto items-center">
          {[
            { src: '/laurel-beyond-cary.png', alt: 'Best Short Script - BEYOND: The Cary Film Festival 2020' },
            { src: '/laurel-horrorhaus.png', alt: 'Official Selection - HorrorHaus Film Festival 2021' },
            { src: '/laurel-cordillera.png', alt: 'Semi-Finalist - Cordillera International Film Festival 2021' },
            { src: '/laurel-la-horror.png', alt: 'Finalist - LA International Horror Film Festival 2024' },
          ].map((laurel) => (
            <div key={laurel.alt} className="flex items-center justify-center p-4">
              <img
                src={laurel.src}
                alt={laurel.alt}
                className="w-full max-w-[200px]"
                style={{ filter: 'invert(1) brightness(0.83) sepia(0.1)' }}
              />
            </div>
          ))}
        </div>
      </section>

      <div id="contact" ref={contactRef}>
        <Contact selectedServices={selectedServices} onServicesChange={setSelectedServices} allServices={services.map(s => s.title)} />
      </div>
    </div>
  );
}

export default App;

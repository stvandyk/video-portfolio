function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Brandon's Video Portfolio
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
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
        </header>
        <main id="portfolio" className="py-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">My Portfolio</h2>
          <p className="text-center text-gray-400">
            Placeholder
          </p>
        </main>
    </div>
  );
}

export default App;

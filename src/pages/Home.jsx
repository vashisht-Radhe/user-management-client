import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-xl text-center space-y-8 flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <svg
            width="200"
            height="160"
            viewBox="0 0 220 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-float"
            aria-label="App logo illustration"
          >
            <rect
              x="20"
              y="30"
              width="180"
              height="120"
              rx="18"
              fill="#EEF2FF"
            />
            <rect x="40" y="55" width="140" height="14" rx="7" fill="#6366F1" />
            <rect x="40" y="82" width="110" height="12" rx="6" fill="#A5B4FC" />
            <rect
              x="40"
              y="105"
              width="125"
              height="12"
              rx="6"
              fill="#C7D2FE"
            />
            <circle cx="55" cy="130" r="5" fill="#6366F1" />
            <circle cx="75" cy="130" r="5" fill="#818CF8" />
            <circle cx="95" cy="130" r="5" fill="#A5B4FC" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
          Hey Developer 👋
        </h1>

        <p className="mt-3 text-lg text-gray-500 leading-relaxed">
          Welcome to our awesome app! Let's get started.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center justify-center mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Get Started
          <span className="ml-2 text-xl">→</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

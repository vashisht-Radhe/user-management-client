import { Link, useLocation } from "react-router-dom";

const Home = () => {

  return (
    <div className="page section">
      <div className="content-narrow center-text space-y-8 container-col-center">
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

        <h1 className="heading-1">Hey Developer 👋</h1>

        <p className="text-body">
          Welcome to our awesome app! Let's get started.
        </p>

        <Link to="/login" className="btn-cta mt-8">
          Get Started
          <span className="ml-2 text-xl">→</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

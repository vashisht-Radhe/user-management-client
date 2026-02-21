import { Link } from "react-router-dom";
import usePageTitle from "../utilis/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found | User Management");
  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center overflow-hidden">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="none"
          stroke="rgb(99 102 241)"
          strokeWidth="2"
          d="M0,160 C120,120 240,200 360,180 480,160 600,80 720,100 840,120 960,200 1080,180 1200,160 1320,100 1440,120"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,160 C120,120 240,200 360,180 480,160 600,80 720,100 840,120 960,200 1080,180 1200,160 1320,100 1440,120;
              M0,180 C120,200 240,120 360,140 480,160 600,200 720,180 840,160 960,100 1080,120 1200,140 1320,180 1440,160;
              M0,160 C120,120 240,200 360,180 480,160 600,80 720,100 840,120 960,200 1080,180 1200,160 1320,100 1440,120
            "
          />
        </path>
      </svg>

      <div className="relative z-10 text-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-indigo-500">
          404
        </h1>

        <p className="mt-4 text-xl text-slate-400">
          You just hit a void in the matrix.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <span className="w-4 h-4 bg-indigo-500 rounded-full animate-ping"></span>
          <span className="w-4 h-4 bg-indigo-500 rounded-full animate-ping [animation-delay:0.3s]"></span>
          <span className="w-4 h-4 bg-indigo-500 rounded-full animate-ping [animation-delay:0.6s]"></span>
        </div>

        <Link
          to="/"
          className="inline-block mt-10 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

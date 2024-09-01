import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [days, setDays] = useState(15);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const incrementDays = () => setDays(days + 1);
  const decrementDays = () => setDays(days > 1 ? days - 1 : 1);

  const handleShorten = async () => {
    setErrorMessage(""); 
    setShortenedUrl("");

    try {
      const response = await axios.post("/api/shorten", {
        originalUrl,
        shortUrl: customShortUrl,
        days,
      });
      setShortenedUrl(response.data.toShort);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An error occurred while shortening the URL."
      );
    }
  };

  return (
    <div className="h-screen">
      <div className="navbar bg-base-100 outline outline-1 justify-left">
        <div className="navbar-center text-primary">
          <a className="btn btn-ghost text-3xl">Shortr</a>
        </div>
      </div>

      <div className="flex flex-col h-2/3 justify-center items-center join">
        <div className="flex flex-row w-2/3 h-fit justify-center">
          <input
            type="text"
            placeholder="Enter URL to shorten"
            className="input input-lg input-bordered input-secondary w-full max-w-lg join-item"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            className="btn btn-outline btn-lg btn-secondary rounded-md join-item"
            onClick={handleShorten}
          >
            Shortr
          </button>
        </div>
        <div className="flex flex-row w-2/3 justify-center p-4">
          <div className="flex flex-row rounded-box bg-neutral p-2 items-center outline outline-secondary outline-1">
            <span className="countdown font-mono text-4xl text-secondary">
              <span style={{ "--value": days }}></span>
            </span>
            <span className="font-mono text-2xl text-secondary p-2">
              days
            </span>
            <div className="flex flex-col">
              <button
                className="btn btn-xs btn-outline btn-success btn-square m-1"
                onClick={incrementDays}
              >
                +
              </button>
              <button
                className="btn btn-xs btn-outline btn-error btn-square m-1"
                onClick={decrementDays}
              >
                -
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Custom URL (optional)"
            className="input input-lg input-bordered input-secondary w-full max-h-xl max-w-md m-2"
            value={customShortUrl}
            onChange={(e) => setCustomShortUrl(e.target.value)}
          />
        </div>

        <div className="toast toast-center toast-middle">
          {shortenedUrl && (
            <div className="alert alert-success font-mono">
              <span>Shortr URL: {shortenedUrl}</span>
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-error font-mono">
              <span>Error: {errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RedirectToApi() {
  const { slug } = useParams();
  window.location.href = `/api/${slug}`;
  return null; 
}

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path=":slug" element={<RedirectToApi />} />
      </Routes>
    </Router>
  );
}

export default App;

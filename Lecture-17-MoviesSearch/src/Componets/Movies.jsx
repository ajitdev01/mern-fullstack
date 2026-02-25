import { useState, useEffect, useCallback, useMemo } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  FaHeart,
  FaRegHeart,
  FaHistory,
  FaTrash,
  FaStar,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FiSearch, FiFilm, FiCalendar, FiClock } from "react-icons/fi";
import { BiMoviePlay } from "react-icons/bi";
import Footer from "./Footer";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("movieSearchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movieFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [videoId, setVideoId] = useState("");
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeTab, setActiveTab] = useState("search"); // 'search', 'favorites', 'history'

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("movieSearchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch YouTube trailer
  const handleTrailer = useCallback(async (movieData) => {
    if (!movieData) return;

    setLoadingTrailer(true);
    setVideoId("");
    setShowTrailer(true);

    try {
      const response = await movieTrailer(
        movieData.Title || movieData.Plot || ""
      );
      if (response) {
        const urlParams = new URLSearchParams(new URL(response).search);
        const videoId = urlParams.get("v");
        setVideoId(videoId);
      } else {
        throw new Error("Trailer not found");
      }
    } catch (error) {
      console.error("Error fetching Trailer:", error);
      setError("Could not find trailer. Try another movie.");
      setShowTrailer(false);
    } finally {
      setLoadingTrailer(false);
    }
  }, []);

  // YouTube player options
  const opts = useMemo(
    () => ({
      height: "500",
      width: "100%",
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
    }),
    []
  );

  const searchMovie = useCallback(
    async (query) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        setError("Please enter a movie title");
        return;
      }

      setLoading(true);
      setError(null);
      setShowTrailer(false);
      setVideoId("");
      setActiveTab("search");

      try {
        // Add to search history
        if (!searchHistory.includes(trimmedQuery)) {
          setSearchHistory((prev) => [trimmedQuery, ...prev.slice(0, 4)]);
        }

        const response = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(
            trimmedQuery
          )}&apikey=ea27f039`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Movie not found");
        }

        setMovieData(data);
      } catch (err) {
        setError(
          err.message || "Failed to fetch movie data. Please try again."
        );

        // Auto-clear error after 5 seconds
        const timer = setTimeout(() => {
          setError(null);
        }, 5000);

        return () => clearTimeout(timer);
      } finally {
        setLoading(false);
      }
    },
    [searchHistory]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      searchMovie(searchQuery);
    },
    [searchQuery, searchMovie]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const toggleFavorite = useCallback(
    (movie) => {
      if (!movie) return;

      const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
      if (isFavorite) {
        setFavorites((prev) =>
          prev.filter((fav) => fav.imdbID !== movie.imdbID)
        );
      } else {
        setFavorites((prev) => [
          ...prev,
          {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            imdbRating: movie.imdbRating,
            Genre: movie.Genre,
            Runtime: movie.Runtime,
            Plot: movie.Plot,
            Director: movie.Director,
            Actors: movie.Actors,
          },
        ]);
      }
    },
    [favorites]
  );

  const isMovieFavorite = useCallback(
    (movieId) => {
      return favorites.some((fav) => fav.imdbID === movieId);
    },
    [favorites]
  );

  const formatCurrency = useCallback((amount) => {
    if (!amount || amount === "N/A") return "N/A";
    return amount;
  }, []);

  const getRatingColor = useCallback((rating) => {
    if (!rating || rating === "N/A") return "text-gray-400";
    const num = parseFloat(rating);
    if (num >= 8) return "text-green-400";
    if (num >= 6) return "text-yellow-400";
    return "text-red-400";
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem("movieSearchHistory");
  }, []);

  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((fav) => fav.imdbID !== movieId));
  }, []);

  const loadFavoriteMovie = useCallback(async (favorite) => {
    setLoading(true);
    setError(null);
    setShowTrailer(false);
    setVideoId("");
    setActiveTab("search");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          favorite.Title
        )}&apikey=ea27f039`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error("Movie not found");
      }

      setMovieData(data);
      setSearchQuery(favorite.Title);
    } catch (err) {
      setError(err.message || "Failed to fetch movie data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const popularMovies = useMemo(
    () => [
      { title: "Inception", year: 2010 },
      { title: "The Dark Knight", year: 2008 },
      { title: "Parasite", year: 2019 },
      { title: "Interstellar", year: 2014 },
      { title: "Spider-Man: Across the Spider-Verse", year: 2023 },
    ],
    []
  );

  // Features data
  const features = useMemo(
    () => [
      {
        icon: <FiSearch className="text-3xl" />,
        title: "Search Movies",
        desc: "Find any movie by title from vast database",
      },
      {
        icon: <BiMoviePlay className="text-3xl" />,
        title: "Watch Trailers",
        desc: "Watch official YouTube trailers",
      },
      {
        icon: <FaStar className="text-3xl" />,
        title: "Save Favorites",
        desc: "Save your favorite movies for later",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center">
                <span className="font-bold text-white text-lg">BR</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text tracking-wide">
                  Brainzima
                </span>
                <span className="text-xs text-gray-400">Movie Explorer</span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl p-1">
              <button
                onClick={() => setActiveTab("search")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "search"
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                    : "hover:bg-gray-700/50 text-gray-300"
                }`}
              >
                <FiSearch className="w-4 h-4" />
                Search
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "favorites"
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                    : "hover:bg-gray-700/50 text-gray-300"
                }`}
              >
                <FaHeart className="w-4 h-4" />
                Favorites ({favorites.length})
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "history"
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                    : "hover:bg-gray-700/50 text-gray-300"
                }`}
              >
                <FaHistory className="w-4 h-4" />
                History
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="w-full md:w-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any movie title..."
                    className="w-full md:w-96 px-6 py-3.5 pl-14 bg-gray-900/90 border border-gray-800 rounded-2xl 
                                                   focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent
                                                   placeholder-gray-500 text-white transition-all duration-300
                                                   hover:border-gray-700 text-lg backdrop-blur-sm"
                    disabled={loading}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiSearch className="w-5 h-5" />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2
                                                   bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2.5 rounded-xl
                                                   font-semibold text-sm hover:opacity-90 transition-all duration-200
                                                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900
                                                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Searching
                      </>
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Search History - Always visible */}
          {searchHistory.length > 0 && activeTab === "search" && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <FaHistory className="w-3 h-3 text-gray-400" />
                <span className="text-sm text-gray-400">Recent:</span>
              </div>
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(term);
                    searchMovie(term);
                  }}
                  className="px-3 py-1.5 text-sm bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700 hover:border-gray-600 flex items-center gap-1"
                >
                  {term}
                </button>
              ))}
              <button
                onClick={clearHistory}
                className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1"
              >
                <FaTrash className="w-3 h-3" />
                Clear
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Error Toast */}
      {error && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-gray-900/95 border-l-4 border-red-500 rounded-xl shadow-2xl p-4 max-w-sm backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium">Search Error</p>
                <p className="text-sm text-gray-300 mt-1">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Loading State */}
        {loading && activeTab === "search" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-gray-800 rounded-full"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                🎥
              </div>
            </div>
            <p className="text-xl font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Searching for movies...
            </p>
            <p className="text-gray-400">Fetching movie data from OMDB API</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && movieData && activeTab === "search" && (
          <div className="animate-fadeIn">
            {/* Movie Hero Section */}
            <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>

              <div className="relative z-20 p-6 lg:p-10">
                {/* Video Player Section */}
                {showTrailer && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <PiYoutubeLogoFill className="text-red-500" />
                        Official Trailer
                      </h3>
                      <button
                        onClick={() => {
                          setShowTrailer(false);
                          setVideoId("");
                        }}
                        className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <IoMdArrowRoundBack />
                        Back to Details
                      </button>
                    </div>

                    {loadingTrailer ? (
                      <div className="flex items-center justify-center h-96 bg-gray-900/50 rounded-xl">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-400">Loading trailer...</p>
                        </div>
                      </div>
                    ) : videoId ? (
                      <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                        <YouTube videoId={videoId} opts={opts} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-96 bg-gray-900/50 rounded-xl">
                        <div className="text-center">
                          <PiYoutubeLogoFill className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">
                            Trailer not available for this movie
                          </p>
                          <button
                            onClick={() => setShowTrailer(false)}
                            className="cursor-pointer mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          >
                            Back to Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Movie Details Section */}
                {!showTrailer && (
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Poster */}
                    <div className="lg:w-1/3">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative">
                          <img
                            src={
                              movieData.Poster !== "N/A"
                                ? movieData.Poster
                                : "https://via.placeholder.com/400x600/1a1a2e/ffffff?text=No+Poster"
                            }
                            alt={movieData.Title}
                            className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/400x600/1a1a2e/ffffff?text=No+Poster";
                            }}
                          />
                          {/* Favorite Button */}
                          <button
                            onClick={() => toggleFavorite(movieData)}
                            className="absolute top-4 right-4 p-3 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-900 transition-all duration-200 group z-20"
                            title={
                              isMovieFavorite(movieData.imdbID)
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >
                            {isMovieFavorite(movieData.imdbID) ? (
                              <FaHeart className="w-5 h-5 text-red-400" />
                            ) : (
                              <FaRegHeart className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 mt-4">
                        <button
                          onClick={() => handleTrailer(movieData)}
                          disabled={loadingTrailer}
                          className="cursor-pointer  w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 
                                                             text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {loadingTrailer ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Loading Trailer...
                            </>
                          ) : (
                            <>
                              <PiYoutubeLogoFill size={22} />
                              Watch Trailer
                            </>
                          )}
                        </button>

                        <a
                          href={`https://www.imdb.com/title/${movieData.imdbID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 
                                                             text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <FaExternalLinkAlt />
                          View on IMDb
                        </a>
                      </div>
                    </div>

                    {/* Movie Info */}
                    <div className="lg:w-2/3">
                      <div className="flex flex-col gap-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {movieData.Title}
                            </h2>
                            <span className="text-2xl lg:text-3xl text-gray-400">
                              ({movieData.Year})
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-3 mb-6">
                            <span className="px-4 py-2 bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-full border border-red-500/30 flex items-center gap-2">
                              <FiFilm className="w-3 h-3" />
                              {movieData.Rated}
                            </span>
                            <span className="px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 flex items-center gap-2">
                              <FiClock className="w-3 h-3" />
                              {movieData.Runtime}
                            </span>
                            <span className="px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 flex items-center gap-2">
                              <FiCalendar className="w-3 h-3" />
                              {movieData.Genre}
                            </span>
                            <span
                              className={`px-4 py-2 rounded-full font-bold ${getRatingColor(
                                movieData.imdbRating
                              )} bg-gray-900/50 flex items-center gap-2`}
                            >
                              <FaStar className="w-3 h-3" />
                              {movieData.imdbRating}/10
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              label: "Director",
                              value: movieData.Director,
                              icon: "🎬",
                            },
                            {
                              label: "Writer",
                              value: movieData.Writer,
                              icon: "✍️",
                            },
                            {
                              label: "Actors",
                              value: movieData.Actors,
                              icon: "👥",
                            },
                            {
                              label: "Released",
                              value: movieData.Released,
                              icon: "📅",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="bg-gray-900/30 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm">{item.icon}</span>
                                <p className="text-sm text-gray-400">
                                  {item.label}
                                </p>
                              </div>
                              <p className="font-medium line-clamp-2">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-2">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">📖</span>
                            <p className="text-gray-400 text-lg">Plot</p>
                          </div>
                          <p className="text-lg leading-relaxed text-gray-300">
                            {movieData.Plot}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "IMDb Rating",
                  value: movieData.imdbRating,
                  sub: `${movieData.imdbVotes} votes`,
                  icon: "⭐",
                  color: "from-yellow-400 to-orange-400",
                },
                {
                  label: "Box Office",
                  value: formatCurrency(movieData.BoxOffice),
                  sub: "Gross",
                  icon: "💰",
                  color: "from-green-400 to-emerald-400",
                },
                {
                  label: "Language",
                  value: movieData.Language,
                  sub: "Primary",
                  icon: "🗣️",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  label: "Country",
                  value: movieData.Country,
                  sub: "Production",
                  icon: "🌍",
                  color: "from-purple-400 to-pink-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-900/40 backdrop-blur-sm p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <span
                      className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.icon}
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Awards */}
              <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-2xl font-bold">Awards & Recognition</h3>
                </div>
                <div className="text-lg leading-relaxed text-gray-300">
                  {movieData.Awards || "No awards information available"}
                </div>
              </div>

              {/* Ratings */}
              <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-2xl font-bold">Ratings</h3>
                </div>
                <div className="space-y-4">
                  {movieData.Ratings?.length > 0 ? (
                    movieData.Ratings.map((rating, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{rating.Source}</p>
                          <p className="text-sm text-gray-400">Rating</p>
                        </div>
                        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {rating.Value}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">
                      No ratings available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                My Favorite Movies
              </h2>
              <div className="text-sm text-gray-400">
                {favorites.length} movie{favorites.length !== 1 ? "s" : ""}{" "}
                saved
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FaRegHeart className="w-24 h-24 text-gray-600 mb-6" />
                <h3 className="text-2xl font-bold mb-3">No favorites yet</h3>
                <p className="text-gray-400 max-w-md mb-6">
                  Add movies to your favorites by clicking the heart icon on any
                  movie.
                </p>
                <button
                  onClick={() => setActiveTab("search")}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Browse Movies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((fav) => (
                  <div
                    key={fav.imdbID}
                    className="bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="relative">
                      <img
                        src={
                          fav.Poster !== "N/A"
                            ? fav.Poster
                            : "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster"
                        }
                        alt={fav.Title}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <button
                        onClick={() => removeFavorite(fav.imdbID)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-red-600/80 transition-all duration-200"
                        title="Remove from favorites"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => loadFavoriteMovie(fav)}
                        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Details
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">
                        {fav.Title}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400">
                          {fav.Year}
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="w-3 h-3 text-yellow-400" />
                          <span className="text-sm font-semibold">
                            {fav.imdbRating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                        {fav.Plot || "No description available"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs bg-gray-800/50 rounded">
                          {fav.Genre.split(",")[0]}
                        </span>
                        <span className="px-2 py-1 text-xs bg-gray-800/50 rounded">
                          {fav.Runtime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Search History
              </h2>
              {searchHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FaTrash className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>

            {searchHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FaHistory className="w-24 h-24 text-gray-600 mb-6" />
                <h3 className="text-2xl font-bold mb-3">No search history</h3>
                <p className="text-gray-400 max-w-md mb-6">
                  Your search history will appear here after you search for
                  movies.
                </p>
                <button
                  onClick={() => setActiveTab("search")}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Start Searching
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/30 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center">
                        <span className="text-xl">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{term}</h3>
                        <p className="text-sm text-gray-400">
                          Searched recently
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSearchQuery(term);
                          setActiveTab("search");
                          searchMovie(term);
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-lg hover:from-red-600/30 hover:to-orange-500/30 transition-colors"
                      >
                        Search Again
                      </button>
                      <button
                        onClick={() => {
                          setSearchHistory((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State for Search Tab */}
        {!movieData && !loading && activeTab === "search" && !error && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
              <div className="text-8xl mb-4 animate-float">🎬</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Discover Movies
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-lg mb-8">
              Search for any movie to get detailed information, ratings, cast,
              and watch trailers.
            </p>

            {/* Quick Search Suggestions */}
            <div className="mb-12">
              <p className="text-gray-400 mb-4">Try these popular movies:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularMovies.map((movie, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(movie.title);
                      searchMovie(movie.title);
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl hover:from-gray-700 hover:to-gray-800 
                                                   transition-all duration-300 border border-gray-800 hover:border-gray-700 hover:scale-105
                                                   flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      🎬
                    </span>
                    {movie.title} ({movie.year})
                  </button>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-900/30 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors hover:scale-105 group"
                >
                  <div className="text-gray-400 group-hover:text-red-400 transition-colors mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer st */}
      <Footer/>
      {/* Footer end */}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Movies;

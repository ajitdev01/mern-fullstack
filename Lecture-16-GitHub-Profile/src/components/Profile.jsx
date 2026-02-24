import { useState } from "react";
import {
  FaGithub,
  FaMapMarkerAlt,
  FaLink,
  FaTwitter,
  FaBuilding,
  FaUsers,
  FaCodeBranch,
  FaEnvelope,
  FaSearch,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";

const Profile = ({ userData, onSearch }) => {
  const [username, setUsername] = useState("");

  const {
    avatar_url = "",
    name = "No name",
    login = "",
    bio = "",
    followers = 0,
    following = 0,
    public_repos = 0,
    location = null,
    company = null,
    blog = "",
    twitter_username = null,
    created_at = "",
  } = userData || {};

  const joinDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setUsername("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <FaGithub className="text-5xl text-white mr-3" />
          <h1 className="text-4xl font-bold text-white">GitHub Profile Viewer</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-10 flex gap-3">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FaSearch />
            Search
          </button>
        </form>

        {/* Profile Card */}
        {userData ? (
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Profile Header */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Avatar */}
                <img
                  src={avatar_url}
                  alt={`${name}'s avatar`}
                  className="w-40 h-40 rounded-2xl border-4 border-blue-500 shadow-lg object-cover"
                />

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white">{name}</h2>
                      <p className="text-xl text-gray-300">@{login}</p>
                    </div>

                    <a
                      href={`https://github.com/${login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      Follow
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  </div>

                  {/* Bio */}
                  {bio && <p className="text-gray-300 mb-6 leading-relaxed">{bio}</p>}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-900 rounded-xl p-5 text-center hover:bg-gray-750 transition">
                      <FaUsers className="mx-auto text-blue-400 text-2xl mb-2" />
                      <div className="text-2xl font-bold text-white">{followers}</div>
                      <div className="text-gray-400 text-sm">Followers</div>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-5 text-center hover:bg-gray-750 transition">
                      <FaUsers className="mx-auto text-green-400 text-2xl mb-2" />
                      <div className="text-2xl font-bold text-white">{following}</div>
                      <div className="text-gray-400 text-sm">Following</div>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-5 text-center hover:bg-gray-750 transition">
                      <FaCodeBranch className="mx-auto text-purple-400 text-2xl mb-2" />
                      <div className="text-2xl font-bold text-white">{public_repos}</div>
                      <div className="text-gray-400 text-sm">Repositories</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-gray-900 p-8 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
                {/* Left column */}
                <div className="space-y-5">
                  {location && (
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-3 text-gray-400" />
                      <span>{location}</span>
                    </div>
                  )}

                  {blog && (
                    <div className="flex items-center">
                      <FaLink className="mr-3 text-gray-400" />
                      <a
                        href={blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 underline"
                      >
                        {blog}
                      </a>
                    </div>
                  )}

                  {twitter_username && (
                    <div className="flex items-center">
                      <FaTwitter className="mr-3 text-gray-400" />
                      <a
                        href={`https://twitter.com/${twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 underline"
                      >
                        @{twitter_username}
                      </a>
                    </div>
                  )}
                </div>

                {/* Right column */}
                <div className="space-y-5">
                  {company && (
                    <div className="flex items-center">
                      <FaBuilding className="mr-3 text-gray-400" />
                      <span>{company}</span>
                    </div>
                  )}

                  <div className="flex items-center">
                    <MdCalendarToday className="mr-3 text-gray-400" />
                    <span>Joined {joinDate}</span>
                  </div>

                  <div className="flex items-center">
                    <FaEnvelope className="mr-3 text-gray-400" />
                    <span>No public email</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-6 bg-gray-950 border-t border-gray-800 text-center">
              <a
                href={`https://github.com/${login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 group"
              >
                <FaGithub className="mr-3 text-xl group-hover:scale-110 transition-transform" />
                View Full Profile on GitHub
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-20">
            <FaGithub className="mx-auto text-6xl mb-4 opacity-20" />
            <p className="text-xl">Search for a GitHub user to see their profile</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            GitHub Profile Viewer – powered by the GitHub API
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import { useEffect, useState } from "react"

function Joke() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getJoke() {
      try {
        const response = await fetch(
          "https://v2.jokeapi.dev/joke/Any"
        )
        const data = await response.json()
        setJoke(data)
        setLoading(false)
      } catch (error) {
        alert("Failed to load joke")
        setLoading(false)
      }
    }

    getJoke()
  }, [])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="joke-card text-center">
            <h2 className="fw-bold mb-3">😂 Joke App</h2>

            {loading ? (
              <p className="text-muted">Loading joke...</p>
            ) : (
              <>
                <span className="badge bg-primary mb-2">
                  {joke.category}
                </span>

                {joke.type === "single" ? (
                  <p className="joke-text mt-3">
                    {joke.joke}
                  </p>
                ) : (
                  <>
                    <p className="joke-setup mt-3">
                      {joke.setup}
                    </p>
                    <p className="joke-delivery">
                      {joke.delivery}
                    </p>
                  </>
                )}
              </>
            )}

            <button
              className="btn btn-outline-success mt-4"
              onClick={() => window.location.reload()}
            >
              Get New Joke
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Joke

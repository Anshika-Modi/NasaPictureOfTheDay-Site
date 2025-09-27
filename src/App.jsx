import React, { useEffect, useState } from "react";

export default function App() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState("");
  const apiKey = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";

  const scrollToImageInfo = () => {
    document.getElementById("imageContainer")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchApod(date);
      scrollToImageInfo();
    }
  };

  const fetchApod = async (forDate) => {
    try {
      const url = new URL("https://api.nasa.gov/planetary/apod");
      url.searchParams.set("api_key", apiKey);
      if (forDate) url.searchParams.set("date", forDate);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("NASA API error");
      const data = await res.json();
      setApod(data);

      if (data.media_type === "image") {
        document.body.style.background = `url(${data.hdurl}) center/cover no-repeat fixed`;
      } else {
        document.body.style.background = `url("https://apod.nasa.gov/apod/image/2210/M31Clouds_Fryhover_3054.jpg") center/cover no-repeat fixed`;
      }
    } catch (err) {
      console.error(err);
      alert("Could not fetch APOD — check your API key, network, or date format.");
    }
  };

  useEffect(() => {
    fetchApod(); // load today's APOD
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <header className="text-center text-white mb-6">
          <h1 className="text-2xl font-semibold">NASA Astronomy Picture of the Day</h1>
        </header>

        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden p-6"
          id="imageContainer"
        >
          {apod && (
            <>
              <div className="w-full h-72 md:h-96 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                {apod.media_type === "image" ? (
                  <img
                    src={apod.hdurl || apod.url}
                    alt={apod.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <iframe
                    title="apod-video"
                    src={apod.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Download button only for images */}
              {apod.media_type === "image" && (
                <div className="mt-4 flex justify-center">
                  <a
                    href={apod.hdurl || apod.url}
                    download={`NASA_APOD_${apod.date}.jpg`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Download Image
                  </a>
                </div>
              )}

              <div className="mt-6 text-center">
                <h2 className="text-lg font-bold">{apod.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{apod.date}</p>
                <p className="text-gray-700 text-sm mt-4 max-h-48 overflow-auto text-left">
                  {apod.explanation}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border px-3 py-2 rounded w-full sm:w-auto"
                  />
                  <button
                    onClick={() => {
                      fetchApod(date);
                      scrollToImageInfo();
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Get
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

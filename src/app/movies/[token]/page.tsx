"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Movies() {
  const { token } = useParams();

  interface Movie {
    Poster: string;
    Title: string;
    Images: string[];
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`http://localhost:5001/qr-code/${token}`)
      .then(({ data }) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Random Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-lg bg-white">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="text-black text-center font-semibold mt-2">
              {movie.Title}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {movie.Images.slice(0, 2).map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img}
                  alt={movie.Title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

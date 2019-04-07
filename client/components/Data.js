import { useContext } from "react";
import { ScrapeContext } from "./ScrapeContext";
import { distanceInWords } from "date-fns";

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Your Data:</h2>
      <ul>
        {scrapes.instagram.map(scrape => (
          <li key={scrape.date}>
            Total followers -{scrape.count}- Fetch{" "}
            {distanceInWords(new Date(scrape.date), new Date())} ago
          </li>
        ))}
      </ul>
      <h1>{scrapes.twitter.length}</h1>
    </div>
  );
}

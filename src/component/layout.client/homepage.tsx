import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="content">
          <h1>Enjoy Wonderful Day With Your Family</h1>
          <div className="buttons">
            <Link href="/about" className="btn-read-more">
              Read More
            </Link>
            <button className="btn-video">
              <FaPlay />
              <span>Watch Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// component/home/About.tsx
import Link from "next/link";
import { FaCar, FaTree, FaShieldAlt, FaPaw } from "react-icons/fa";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="heading">
          <span>Welcome To Zoofari</span>
          <h2>
            Why You Should Visit <span>Zoofari</span> Park!
          </h2>
          <p>
            Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet
            est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy
            clita sit at, sed sit sanctus dolor eos.
          </p>
        </div>

        <div className="features">
          <div className="feature">
            <FaCar />
            <h3>Free Car Parking</h3>
          </div>
          <div className="feature">
            <FaTree />
            <h3>Natural Environment</h3>
          </div>
          <div className="feature">
            <FaShieldAlt />
            <h3>Professional Guide & Security</h3>
          </div>
          <div className="feature">
            <FaPaw />
            <h3>World Best Animals</h3>
          </div>
        </div>

        <Link href="/about" className="btn-read-more">
          Read More
        </Link>

        <div className="stats">
          <div className="stat">
            <p>Total Animal</p>
          </div>
          <div className="stat">
            <p>Daily Visitors</p>
          </div>
          <div className="stat">
            <p>Total Membership</p>
          </div>
          <div className="stat">
            <p>Save Wild Life</p>
          </div>
        </div>
      </div>
    </section>
  );
}

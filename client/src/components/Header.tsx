import { Link } from "wouter";

export default function Header() {
  return (
    <header className="px-6 py-6 md:py-8 lg:px-8 flex justify-between items-center">
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-orange-500">COGNIFORGE AI</div>
      <nav>
        <ul className="flex space-x-6 text-xl md:text-2xl lg:text-3xl">
          <li>
            <a href="#projects" className="text-gray-600 hover:text-orange-500 transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-600 hover:text-orange-500 transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

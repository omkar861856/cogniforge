import { Link } from "wouter";

export default function Header() {
  return (
    <header className="px-6 py-6 md:py-8 lg:px-8 flex justify-between items-center">
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-indigo-600">BIG.</div>
      <nav>
        <ul className="flex space-x-6 text-xl md:text-2xl lg:text-3xl">
          <li>
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

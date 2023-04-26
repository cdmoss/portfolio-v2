import Link from "next/link";

const Nav = () => {
  return (
    <nav  className="py-4 sticy top-0 z-10">
      <div className="container">
        <ul className="flex flex-row justify-center items-center">
          <li className="mr-8">
            <Link
              href="/#projects"
              className={
                "text-white font-semibold text-sm tracking-wider hover:text-green-400 transition-colors duration-200"
              }
            >
              Projects
            </Link>
          </li>
          <li className="mx-8">
            <Link
              href="/"
              className="text-lg text-white font-semibold tracking-wider hover:text-green-400 transition-colors duration-200"
            >
              Chase Mossing
            </Link>
          </li>
          <li className="ml-8">
            <Link
              href="/#contact"
              className="text-white font-semibold text-sm tracking-wider hover:text-green-400 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

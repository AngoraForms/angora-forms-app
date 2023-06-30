/* eslint-disable react/react-in-jsx-scope */

import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import linkedinLogo from './linkedin.png';
import githubLogo from './github.png';
import mediumLogo from './medium.png';
import { NavBar } from './(components)/Nav';
import { Providers } from './GlobalRedux/provider'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Angora Forms',
  description: 'Generate and save your custom Angular forms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" 
      style={{ height: '100%' }}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </head>
      <body className={inter.className}>
        <nav className="fixed top-0 w-screen bg-white p-6 shadow-xl z-50">
          <Providers>
            <NavBar/>
          </Providers>
        </nav>
        <div>
          <Providers>
            {children}
          </Providers>
        </div>

        <footer className="bg-white rounded-t-lg shadow p-4 absolute bottom-0 left-0 right-0 z-40 border border-t-gray-400 max-sm:relative">
          <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center">
              <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li className="flex items-center mr-4">
                  <a href="https://github.com/oslabs-beta/angora-forms" className="hover:underline flex items-center">
                    <Image
                      className="mr-2"
                      src={githubLogo}
                      width={22}
                      height={22}
                      alt="Github logo"
                    />
                    Angora Forms
                  </a>
                </li>
                <li className="flex items-center mr-4">
                  <a href="https://medium.com/@wayneleung_2900/making-angular-custom-form-components-easier-to-work-with-e2f7ace48cb2" className="hover:underline flex items-center">
                    <Image
                      className="mr-2"
                      src={mediumLogo}
                      width={22}
                      height={22}
                      alt="Medium logo"
                    />
                    Medium Article
                  </a>
                </li>
              </ul>
            </div>
            <menu className="flex flex-col md:flex-row">
              <span className="mr-4 md:mr-4">Connect With Our Team</span>
              <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li className="flex items-center mr-4">
                  <a href="https://www.linkedin.com/in/aaron-c-335b48127/" className="hover:underline flex items-center">
                    <Image
                      className="mr-1"
                      src={linkedinLogo}
                      width={14}
                      height={14}
                      alt="Linkedin logo"
                    />
                    Aaron Chen
                  </a>
                </li>
                <li className="flex items-center mr-4">
                  <a href="https://www.linkedin.com/in/CurtisLovrak/" className="hover:underline flex items-center">
                    <Image
                      className="mr-1"
                      src={linkedinLogo}
                      width={14}
                      height={14}
                      alt="Linkedin logo"
                    />
                    Curtis Lovrak
                  </a>
                </li>
                <li className="flex items-center mr-4">
                  <a href="https://www.linkedin.com/in/hadarweinstein/" className="hover:underline flex items-center">
                    <Image
                      className="mr-1"
                      src={linkedinLogo}
                      width={14}
                      height={14}
                      alt="Linkedin logo"
                    />
                    Hadar Weinstein
                  </a>
                </li>
                <li className="flex items-center mr-4">
                  <a href="https://www.linkedin.com/in/ryan-hastings-50b70457/" className="hover:underline flex items-center">
                    <Image
                      className="mr-1"
                      src={linkedinLogo}
                      width={14}
                      height={14}
                      alt="Linkedin logo"
                    />
                    Ryan Hastings
                  </a>
                </li>
                <li className="flex items-center">
                  <a href="https://www.linkedin.com/in/wayne-leung-1242422a/" className="hover:underline flex items-center">
                    <Image
                      className="mr-1"
                      src={linkedinLogo}
                      width={14}
                      height={14}
                      alt="Linkedin logo"
                    />
                    Wayne Leung
                  </a>
                </li>
              </ul>
            </menu>
          </div>
        </footer>
      </body>
    </html>
  );
}
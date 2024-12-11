import React from 'react';
import { LogoText } from '../index';
import { Icon } from '@iconify/react/dist/iconify.js';

const Footer = () => {
  return (
    <footer className="bg-[#021526] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Logo Section */}
          <div className="col-span-1">
            <LogoText />
          </div>

          {/* Quick Starts */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Quick Starts</h3>
            <ul className="space-y-2 text-sm">
              {['Web', 'Next.js', 'React', 'Vue.js', 'Angular', 'React Native', 'Flutter', 'Apple', 'Android'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Learn</h3>
            <ul className="space-y-2 text-sm">
              {['Docs', 'Integrations', 'Community', 'Init', 'Threads', 'Blog', 'Changelog', 'Roadmap', 'Source code'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Programs</h3>
            <ul className="space-y-2 text-sm">
              {['Heroes', 'Startups', 'Education'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form Section (Right End) */}
          <div className="col-span-1 md:col-span-1 flex justify-end mt-8 md:mt-0">
            <div className="w-full max-w-md">
              <h3 className="text-sm font-semibold mb-4 uppercase">Contact Us</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    placeholder="Enter your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex space-x-4 text-gray-400">
            <button
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              aria-label="Discord"
            >
              <Icon icon="mdi:discord" className="text-white text-xl" />
            </button>

            {/* GitHub */}
            <button
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              aria-label="GitHub"
            >
              <Icon icon="mdi:github" className="text-white text-xl" />
            </button>

            {/* X (formerly Twitter) */}
            <button
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              aria-label="X (Twitter)"
            >
              <Icon icon="mdi:twitter" className="text-white text-xl" />
            </button>

            {/* LinkedIn */}
            <button
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              aria-label="LinkedIn"
            >
              <Icon icon="mdi:linkedin" className="text-white text-xl" />
            </button>

            {/* YouTube */}
            <button
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              aria-label="YouTube"
            >
              <Icon icon="mdi:youtube" className="text-white text-xl" />
            </button>

            {/* Custom Icon (Code link or something) */}
            <button
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              aria-label="Custom Link"
            >
              <Icon icon="mdi:code-tags" className="text-white text-xl" />
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

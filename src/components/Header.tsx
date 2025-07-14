import React, { useState } from 'react';
import { Menu, X, MapPin, Users, Camera, Phone } from 'lucide-react';
import logoC from '../assets/Logo 1.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'A Corrida', href: '#about', icon: MapPin },
    { name: 'Fotos Mixurucas', href: '#gallery', icon: Camera },
    { name: 'Inscrições', href: '#registration', icon: Users },
    { name: 'Contato', href: '#contact', icon: Phone }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/">
              <img src={logoC} alt="Logo" className="logo" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#registration"
              className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-500 transition-all duration-200"
            >
              Inscreva-se Agora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800/50">
            <nav className="flex flex-col space-y-4 mt-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-3 py-2 px-2 rounded-lg hover:bg-gray-800/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
              <div className="pt-4 border-t border-gray-800/50">
                <a
                  href="#registration"
                  className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold text-center block hover:from-purple-700 hover:to-cyan-500 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscreva-se Agora
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
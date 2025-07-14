import React from 'react';
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube, Heart, Leaf } from 'lucide-react';
import logoC from '../assets/Logo.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'A Corrida', href: '#about' },
    { name: 'Inscrições', href: '#registration' },
    { name: 'Percursos', href: '#routes' },
    { name: 'Fotos', href: '#gallery' }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/corridinhamixuruca.oficial/#', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.instagram.com/corridinhamixuruca.oficial/#', label: 'Facebook' },
    { icon: Youtube, href: 'https://www.instagram.com/corridinhamixuruca.oficial/#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black border-t border-gray-800/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Slogan */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <img src={logoC} alt="Logo" className="logo" />
              </div>

            </div>

            <p className="text-gray-300 mb-4 italic">
              "A vida é uma trilha... e a gente corre ela rindo!"
            </p>

            <div className="flex items-center space-x-2 text-gray-400">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-sm">Conectando pessoas à natureza</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
              Atalhos da Trilha
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-cyan-400 transition-colors"></div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-cyan-400" />
              Onde nos Encontrar
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href="mailto:Eudesbolinhadefogo@gmail.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
                >
                  Eudesbolinhadefogo@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a
                  href="https://wa.me/558388601815"
                  className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
                >
                  (83) 98860-1815
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  João Pessoa - PB
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-fuchsia-400" />
              Siga a Lama!
            </h4>
            <div className="space-y-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                  aria-label={social.label}
                  target='_blank'
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-400 transition-all duration-300">
                    <social.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm">@corridinhamixurucaoficial</span>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-xl p-4 border border-purple-500/30">
              <p className="text-gray-300 text-sm">
                📸 Compartilhe suas fotos com a hashtag{' '}
                <span className="text-cyan-400 font-semibold">#MixurucaVibe</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-gray-800/50"></div>

        {/* Newsletter */}
        {/* <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Fique Por Dentro das Próximas Aventuras! 🌿
            </h3>
            <p className="text-gray-300 mb-6">
              Receba novidades sobre novas datas, percursos especiais e dicas de trilha direto no seu e-mail!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              <button className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200">
                Quero Receber!
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              Corridinha Mixuruca © {currentYear} - Corra, Ria, Repita!
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Feito com muito ❤️ para os amantes de trilhas e diversão
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              Termos de Uso
            </a>
          </div>
        </div>

        {/* Fun Animation */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <span className="animate-bounce">🏃‍♂️</span>
            <span className="animate-pulse">💨</span>
            <span className="animate-bounce">🌿</span>
            <span className="animate-pulse">💧</span>
            <span className="animate-bounce">😄</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
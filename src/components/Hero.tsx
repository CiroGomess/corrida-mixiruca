import React from 'react';
import { PlayCircle, ArrowRight, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-purple-900 to-cyan-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-fuchsia-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-purple-600/20 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block mb-2">CORRIDINHA</span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              MIXURUCA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            A trilha onde o importante é a <span className="text-cyan-400 font-semibold">VIBE</span> 
            <br className="hidden md:block" />
            (e não o tempo!)
          </p>

          {/* Description */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-purple-500/30">
            <p className="text-lg text-gray-200 mb-6">
              Uma aventura sobre trilhas para quem ama correr, rilar e, principalmente, 
              <span className="text-fuchsia-400 font-semibold"> não se levar tão a sério</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-200">Sem cronômetro</span>
              </div>
              <div className="flex items-center space-x-2 bg-cyan-600/20 px-4 py-2 rounded-full">
                <PlayCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-200">Muita diversão</span>
              </div>
              <div className="flex items-center space-x-2 bg-fuchsia-600/20 px-4 py-2 rounded-full">
                <span className="text-gray-200">🌿 Contato com a natureza</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#registration"
              className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-200 flex items-center space-x-2 group"
            >
              <span>Garanta Sua Vaga na Corridinha!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#about"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-200 flex items-center space-x-2"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Saiba Mais</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
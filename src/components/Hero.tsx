import React from 'react';
import { PlayCircle, ArrowRight, Zap, Leaf } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        // *** AQUI É ONDE VOCÊ DEVE MUDAR! ***
        // O caminho '/images/corrida-mixuruca-bg.jpg' assume que a imagem está em public/images/
        style={{ backgroundImage: "url('https://img.freepik.com/fotos-gratis/diferentes-pessoas-participando-de-um-cross-country_23-2149157132.jpg?uid=R14650917&ga=GA1.1.362152280.1746682393&semt=ais_hybrid&w=740')" }} 
      >
        {/* Overlay para escurecer a imagem e melhorar a leitura do texto */}
        <div className="absolute inset-0 bg-black opacity-60"></div> 
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            <span className="block mb-2">CORRIDA</span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              MIXURUCA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light drop-shadow">
            A trilha onde o importante é a <strong className="text-cyan-400">VIBE</strong> 
            <br className="hidden md:block" />
            (e não o tempo!)
          </p>

          {/* Description */}
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 mb-12 border border-purple-500/40 shadow-xl">
            <p className="text-lg text-gray-100 mb-6">
              Uma aventura sobre trilhas para quem ama correr, rir e, principalmente, 
              <strong className="text-fuchsia-400"> não se levar tão a sério!</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-purple-600/30 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-gray-100">Sem cronômetro</span>
              </div>
              <div className="flex items-center space-x-2 bg-cyan-600/30 px-4 py-2 rounded-full">
                <PlayCircle className="w-4 h-4 text-green-300" />
                <span className="text-gray-100">Muita diversão</span>
              </div>
              <div className="flex items-center space-x-2 bg-fuchsia-600/30 px-4 py-2 rounded-full">
                <Leaf className="w-4 h-4 text-lime-300" />
                <span className="text-gray-100">Contato com a natureza</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#registration"
              className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 flex items-center space-x-2 group shadow-lg"
            >
              <span>Garanta Sua Vaga na Corridinha!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href="#about"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Saiba Mais</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-7 h-11 border-2 border-white/60 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
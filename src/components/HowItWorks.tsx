import React from 'react';
import { MapPin, UserPlus, Package, Play, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: MapPin,
      title: 'Escolha Seu Perrengue',
      subtitle: '(Ops, Percurso!)',
      description: 'Temos opções para todos os gostos: do "Passeio no Parque" até "A Lama Chega no Joelho"!',
      link: '#routes',
      color: 'from-purple-400 to-purple-600'
    },
    {
      number: '02',
      icon: UserPlus,
      title: 'Faça Sua Inscrição',
      subtitle: '(Antes que Acabe a Lama!)',
      description: 'Processo super simples e rápido. Poucos cliques e você já está dentro da aventura!',
      link: '#registration',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      number: '03',
      icon: Package,
      title: 'Pegue Seu Kit',
      subtitle: '(Cheio de Surpresas Mixurucas!)',
      description: 'Camiseta exclusiva, medalha "honra ao mérito" e outras surpresas que só descobrirá no dia!',
      link: '#kit',
      color: 'from-green-400 to-green-600'
    },
    {
      number: '04',
      icon: Play,
      title: 'Sinta a VIBE na Trilha!',
      subtitle: '(A Parte Mais Divertida!)',
      description: 'Corra, ria, faça amigos, tire fotos e viva uma experiência inesquecível!',
      link: '#gallery',
      color: 'from-fuchsia-400 to-fuchsia-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O Caminho até a Sua
            <span className="block text-cyan-400 text-3xl md:text-4xl mt-2">
              Aventura Mixuruca! 🌿
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Apenas 4 passos simples para viver a experiência mais divertida das trilhas!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-sm text-cyan-400 mb-3 font-medium">
                {step.subtitle}
              </p>
              
              <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">
                {step.description}
              </p>

              {/* Link */}
              <a
                href={step.link}
                className="inline-flex items-center space-x-2 text-purple-400 hover:text-cyan-400 transition-colors duration-200 group/link"
              >
                <span className="text-sm font-medium">Saiba mais</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>

              {/* Connecting Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transform -translate-y-1/2 z-10">
                  <div className="absolute right-0 top-1/2 w-0 h-0 border-l-4 border-l-cyan-400 border-t-2 border-t-transparent border-b-2 border-b-transparent transform -translate-y-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para Começar a Aventura?
            </h3>
            <p className="text-gray-300 mb-6">
              Cada passo te leva mais perto da experiência mais divertida que você já teve em uma trilha!
            </p>
            <a
              href="#registration"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transform transition-all duration-200 group"
            >
              <span>Começar Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
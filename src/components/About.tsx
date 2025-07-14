import React from 'react';
import { Clock, Users, Heart, Leaf, Smile, Mountain } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Sem Cronômetro',
      description: 'Aqui o tempo não importa. Corra no seu ritmo e aproveite cada momento!',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Smile,
      title: 'Muita Risada',
      description: 'Garantimos que você vai terminar com um sorriso no rosto (e talvez lama também)!',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Leaf,
      title: 'Contato com a Natureza',
      description: 'Trilhas lindas, ar puro e a melhor companhia: a natureza!',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Heart,
      title: 'Vibe Família',
      description: 'Uma comunidade acolhedora onde todos são bem-vindos!',
      color: 'from-fuchsia-400 to-fuchsia-600'
    },
    {
      icon: Users,
      title: 'Novos Amigos',
      description: 'Faça conexões verdadeiras enquanto desbrava as trilhas!',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Mountain,
      title: 'Aventura Garantida',
      description: 'Cada percurso é uma nova aventura esperando por você!',
      color: 'from-teal-400 to-teal-600'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Corridinha Mixuruca
            <span className="block text-cyan-400 text-2xl md:text-3xl mt-2">
              Sem Pressão, Só Diversão!
            </span>
          </h2>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
            <p className="text-lg text-gray-200 leading-relaxed">
              Cansado de tempos, pódios e superação forçada? A Corridinha Mixuruca é para você! 
              Um evento descontraído sobre trilhas, feito para quem quer curtir a natureza, 
              sentir o vento no rosto e, quem sabe, um pouco de lama nos tênis.
            </p>
            <p className="text-lg text-gray-200 leading-relaxed mt-4">
              Aqui, o objetivo é se divertir, fazer novos amigos e terminar com um sorriso no rosto, 
              <span className="text-cyan-400 font-semibold"> não importa o tempo (ou a ordem de chegada!)</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 px-6 py-3 rounded-full border border-purple-500/30">
            <span className="text-2xl">🌿</span>
            <span className="text-white font-semibold">
              A vida é uma trilha... e a gente corre ela rindo!
            </span>
            <span className="text-2xl">😄</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
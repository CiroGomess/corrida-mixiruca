import React from 'react';
import { Shirt, Award, Gift, Zap, Package, Star } from 'lucide-react';

const Kit: React.FC = () => {
  const kitItems = [
    {
      icon: Shirt,
      name: 'Camiseta Mixuruca',
      description: 'Camiseta exclusiva com estampa divertida que só quem participou tem!',
      color: 'from-purple-400 to-purple-600',
      special: false
    },
    {
      icon: Award,
      name: 'Medalha "Honra ao Mérito"',
      description: 'Medalha especial para todos que completaram o desafio (não importa o tempo!).',
      color: 'from-yellow-400 to-yellow-600',
      special: false
    },
    {
      icon: Package,
      name: 'Número de Peito Mixuruco',
      description: 'Número personalizado com design exclusivo da Corridinha Mixuruca.',
      color: 'from-cyan-400 to-cyan-600',
      special: false
    },
    {
      icon: Gift,
      name: 'Brindes dos Patrocinadores',
      description: 'Produtos e amostras dos nossos parceiros que apoiam a aventura!',
      color: 'from-green-400 to-green-600',
      special: false
    },
    {
      icon: Zap,
      name: 'Vale-Lama',
      description: 'Cupom especial para desconto na próxima edição (só para os corajosos!).',
      color: 'from-orange-400 to-orange-600',
      special: false
    },
    {
      icon: Star,
      name: 'Surpresa Mixuruca',
      description: 'Um item especial que só será revelado no dia da corrida. Mistério total!',
      color: 'from-fuchsia-400 to-fuchsia-600',
      special: true
    }
  ];

  return (
    <section id="kit" className="py-20 bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kit do Corredor
            <span className="block text-cyan-400 text-3xl md:text-4xl mt-2">
              Mixuruca! 🎁
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tudo o que você precisa para viver a melhor aventura da sua vida. 
            E ainda tem surpresas que só descobrirá no dia!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {kitItems.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                item.special ? 'ring-2 ring-fuchsia-500/50' : ''
              }`}
            >
              {item.special && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  MISTÉRIO!
                </div>
              )}

              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {item.name}
              </h3>

              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {item.description}
              </p>

              {item.special && (
                <div className="mt-4 flex items-center space-x-2 text-fuchsia-400">
                  <Star className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-medium">Só no dia da corrida!</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Kit Pickup Info */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              📦 Retirada do Kit
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Quando Retirar?</h4>
                <p className="text-gray-300">
                  Véspera do evento: 14h às 18h<br />
                  Dia da corrida: 6h às 7h30
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Onde Retirar?</h4>
                <p className="text-gray-300">
                  Arena da Largada<br />
                  (Localização será informada via e-mail)
                </p>
              </div>
            </div>

            <div className="mt-8 bg-black/40 rounded-xl p-6 border border-gray-700/50">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Importante!
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Leve documento com foto para retirada</li>
                <li>• Não é possível retirar kit de terceiros</li>
                <li>• Tamanhos de camiseta limitados (escolha na inscrição)</li>
                <li>• Kit não retirado não será enviado pelos correios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para Receber Seu Kit Mixuruca?
            </h3>
            <p className="text-gray-300 mb-6">
              Cada item foi escolhido com carinho para tornar sua aventura ainda mais especial. 
              E a surpresa... ah, a surpresa vai ser épica! 🎉
            </p>
            <a
              href="#registration"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transform transition-all duration-200"
            >
              <span>Garantir Meu Kit</span>
              <Gift className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kit;
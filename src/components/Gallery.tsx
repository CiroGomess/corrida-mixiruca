import React, { useState } from 'react';
import { Camera, Heart, Share2, ExternalLink } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Começando a Aventura',
      description: 'Grupo animado no início da trilha, todos com um sorriso no rosto!',
      category: 'Largada'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Banho de Lama Garantido',
      description: 'Quem disse que precisa ficar limpo para ser feliz?',
      category: 'Diversão'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/2402922/pexels-photo-2402922.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Paisagem Incrível',
      description: 'Os visuais da trilha que fazem tudo valer a pena!',
      category: 'Natureza'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1571940/pexels-photo-1571940.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Amigos para Sempre',
      description: 'As melhores amizades nascem na lama!',
      category: 'Amizade'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/2402923/pexels-photo-2402923.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Superação Divertida',
      description: 'Cada obstáculo é uma nova oportunidade de rir!',
      category: 'Desafio'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1571938/pexels-photo-1571938.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Chegada Épica',
      description: 'O sorriso de quem completou a Mixuruca é impagável!',
      category: 'Chegada'
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/2402928/pexels-photo-2402928.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Selfie Enlameada',
      description: 'A foto mais autêntica que você já tirou!',
      category: 'Momentos'
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/1571937/pexels-photo-1571937.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Família Mixuruca',
      description: 'Todos unidos pela paixão de não se levar tão a sério!',
      category: 'Comunidade'
    }
  ];

  const categories = ['Todas', 'Largada', 'Diversão', 'Natureza', 'Amizade', 'Desafio', 'Chegada', 'Momentos', 'Comunidade'];
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredImages = activeCategory === 'Todas' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossa Galeria de
            <span className="block text-cyan-400 text-3xl md:text-4xl mt-2">
              Memórias (e Tombos!) 📸
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Reviva os melhores momentos das edições passadas e se inspire 
            para viver sua própria aventura mixuruca!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-400 text-white'
                  : 'bg-black/40 text-gray-300 hover:bg-black/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Selected Image */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
              <div className="relative">
                <img
                  src={filteredImages[selectedImage].url}
                  alt={filteredImages[selectedImage].title}
                  className="w-full h-auto max-h-96 object-cover"
                />
                
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {filteredImages[selectedImage].title}
                </h3>
                <p className="text-gray-300 text-lg mb-4">
                  {filteredImages[selectedImage].description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {filteredImages[selectedImage].category}
                  </span>
                  
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>Curtir</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quer Aparecer na Próxima Galeria?
            </h3>
            <p className="text-gray-300 mb-6">
              Venha viver sua própria aventura mixuruca e criar memórias inesquecíveis! 
              Garante que vamos capturar todos os seus melhores momentos na lama! 📷
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#registration"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transform transition-all duration-200"
              >
                <Camera className="w-5 h-5" />
                <span>Participar da Próxima</span>
              </a>
              
              <a
                href="#"
                className="inline-flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver Mais no Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'E-mail',
      value: ' Eudesbolinhadefogo@gmail.com',
      description: 'Resposta em até 24h',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '(83) 98860-1815',
      description: 'Seg à Sex, 8h às 18h',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'João Pessoa - PB',
      description: 'Trilhas da Paraíba',
      color: 'from-cyan-400 to-cyan-600'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: '@corridinhamixuruca',
      url: '#',
      color: 'from-pink-400 to-purple-600'
    },
    {
      icon: Facebook,
      name: 'Corridinha Mixuruca',
      url: '#',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Youtube,
      name: 'Canal Mixuruca',
      url: '#',
      color: 'from-red-400 to-red-600'
    }
  ];

  const faqItems = [
    {
      question: 'Posso participar mesmo sendo iniciante?',
      answer: 'Claro! A Corridinha Mixuruca é feita especialmente para quem quer se divertir, independente do nível. Temos percursos para todos os gostos!'
    },
    {
      question: 'E se chover no dia da corrida?',
      answer: 'Chuva é sinônimo de mais lama e diversão! A corrida acontece com chuva ou sol. Só em casos extremos de tempestade que reagendamos.'
    },
    {
      question: 'Posso levar meu pet?',
      answer: 'Amamos pets, mas por questões de segurança na trilha, não permitimos animais. Mas eles podem esperar na linha de chegada!'
    },
    {
      question: 'Tem limite de idade?',
      answer: 'Menores de 16 anos precisam de autorização dos pais. Maiores de 60 anos precisam de atestado médico. Diversão não tem idade!'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fale Conosco
            <span className="block text-cyan-400 text-3xl md:text-4xl mt-2">
              Equipe Mixuruca! 📞
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Dúvidas? Sugestões? Só quer bater um papo sobre trilhas? 
            Estamos aqui para ajudar (se não for sobre o tempo da corrida!)
          </p>
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center">
              <MessageCircle className="w-6 h-6 mr-2 text-cyan-400" />
              Entre em Contato
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">{info.title}</h4>
                  <p className="text-gray-300 font-medium mb-1">{info.value}</p>
                  <p className="text-gray-400 text-sm">{info.description}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700/50 pt-8">
              {/* <h4 className="text-lg font-semibold text-white mb-6 text-center">Siga a Lama! 🌿</h4> */}
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="flex flex-col items-center space-y-2 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Perguntas Frequentes 🤔
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ainda Tem Dúvidas?
            </h3>
            <p className="text-gray-300 mb-6">
              Nossa equipe está sempre pronta para ajudar! Entre em contato e vamos 
              esclarecer tudo para você viver a melhor experiência mixuruca possível! 💪
            </p>
            <a
              href="https://wa.me/558388601815?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20a%20corrida%20mixuruca."
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transform transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
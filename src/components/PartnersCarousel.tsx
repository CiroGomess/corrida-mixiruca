import React from 'react';
import Slider from 'react-slick';

import Img1 from '../assets/parceiros/1.jpg';
import Img2 from '../assets/parceiros/2.jpg';
import Img3 from '../assets/parceiros/3.jpg';
import Img4 from '../assets/parceiros/4.jpg';
import Img5 from '../assets/parceiros/5.jpg';
import Img6 from '../assets/parceiros/6.jpg';
import Img7 from '../assets/parceiros/7.jpg';
import Img8 from '../assets/parceiros/8.jpg';
import Img9 from '../assets/parceiros/9.jpg';
import Img10 from '../assets/parceiros/10.jpg';

interface Partner {
  logo: string;
  url: string;
}

const partners: Partner[] = [
  { logo: Img1, url: 'http://instagram.com/powermixdetox/#' },
  { logo: Img2, url: 'https://www.instagram.com/modernacessorios/#' },
  { logo: Img3, url: 'https://www.instagram.com/idealizecorrespondentes/#' },
  { logo: Img4, url: 'https://www.instagram.com/profitsul_academia/#' },
  { logo: Img5, url: 'https://www.instagram.com/franciscogasjp/#' },
  { logo: Img6, url: 'https://www.instagram.com/scorpionsuplementos_oficial/#' },
  { logo: Img7, url: 'https://www.instagram.com/oticalanordestina/#' },
  { logo: Img8, url: 'https://www.instagram.com/corretoraangelinecunha/#' },
  { logo: Img9, url: 'https://www.instagram.com/bayeuxburguer/#' },
  { logo: Img10, url: 'https://www.instagram.com/unibe_joaopessoa/#' },
];

const PartnersCarousel: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    cssEase: 'ease-in-out',
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 3, slidesToScroll: 1 } }, 
    ]
  };

  return (
    <section id="partners" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Nossos Parceiros
            <span className="block text-cyan-400 text-2xl md:text-3xl mt-2 font-medium">
              Quem nos impulsiona a ir mais longe
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
            Grandes marcas confiam na nossa missão de promover esporte, natureza e bem-estar.
          </p>
        </div>

        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center items-center">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <img
                  src={partner.logo}
                  alt={`Parceiro ${index + 1}`}
                  // Tamanho padrão para mobile (até 767px)
                  // Para telas maiores, volta para max-w-[200px] max-h-[200px]
                  className="w-[100px] h-[100px] md:max-w-[200px] md:max-h-[200px] rounded-2xl border border-white/20 shadow-md transition-all duration-300 object-contain grayscale group-hover:grayscale-0"
                />
              </a>
            </div>
          ))}
        </Slider>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600/30 to-purple-500/30 px-6 py-3 rounded-full border border-cyan-500/40 shadow-inner">
            <span className="text-2xl">🤝</span>
            <span className="text-white font-semibold text-lg">
              Juntos vamos mais longe!
            </span>
            <span className="text-2xl">🚀</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
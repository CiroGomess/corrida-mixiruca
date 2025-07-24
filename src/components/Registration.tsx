import React, { useState, useEffect } from 'react';
import { User, CreditCard, Clock, Users, CheckCircle, AlertCircle, Percent } from 'lucide-react'; // Adicionado Percent icon

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    route: [] as string[],
    shirtSize: '',
    emergencyContact: '',
    emergencyPhone: '',
    experience: '',
    dietary: '',
    agreement: false,
    coupon: '' // Novo campo para o cupom
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [currentBatch] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [couponError, setCouponError] = useState(''); // Estado para mensagens de erro do cupom

  const routes = [
    { id: '5km', name: 'Passeio no Parque - 5km', price: 45.00 },
    { id: '10km', name: 'Subida do Perrengue Leve - 10km', price: 55.00 },
    { id: '15km', name: 'A Lama Chega no Joelho - 15km', price: 65.00 }
  ];

  const shirtSizes = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];

  const batches = [
    { number: 1, name: 'Super Desconto', period: 'Até 15/12', discount: '30%', available: true }
  ];

  // Cupons de exemplo (em um cenário real, viriam de um backend)
  const availableCoupons: { [key: string]: number } = {
    CORRE10: 0.10, // 10% de desconto
    TRILHA20: 0.20, // 20% de desconto
    MIXURUCA50: 0.50 // 50% de desconto
  };

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date('2025-02-15T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Limpa o erro do cupom ao digitar
      if (name === 'coupon') {
        setCouponError('');
      }
    }
  };

  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newRoutes = checked
        ? [...prev.route, value]
        : prev.route.filter(routeId => routeId !== value);
      return { ...prev, route: newRoutes };
    });
  };

  const calculateTotalPrice = () => {
    let subtotal = formData.route.reduce((total, routeId) => {
      const selectedRoute = routes.find(r => r.id === routeId);
      return total + (selectedRoute ? selectedRoute.price : 0);
    }, 0);

    const couponCode = formData.coupon.toUpperCase();
    if (availableCoupons[couponCode]) {
      const discount = subtotal * availableCoupons[couponCode];
      subtotal -= discount;
    }

    return subtotal;
  };

  const validateCoupon = () => {
    const couponCode = formData.coupon.toUpperCase();
    if (formData.coupon === '') {
      setCouponError(''); // Limpa erro se o campo estiver vazio
      return;
    }
    if (availableCoupons[couponCode]) {
      setCouponError('Cupom válido!');
    } else {
      setCouponError('Cupom inválido.');
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Você pode querer validar o cupom novamente no submit aqui,
    // ou apenas usar o valor do totalPrice que já considera o cupom.
    console.log('Form submitted:', { ...formData, totalPrice: calculateTotalPrice() });
    setSubmitted(true);
  };

  const isFormValid = () => {
    return formData.name &&
           formData.email &&
           formData.phone &&
           formData.route.length > 0 &&
           formData.shirtSize &&
           formData.emergencyContact &&
           formData.emergencyPhone &&
           formData.agreement;
  };

  if (submitted) {
    return (
      <section id="registration" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-12 border border-green-500/50">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Inscrição Realizada com Sucesso! 🎉
              </h2>
              <p className="text-gray-300 mb-6">
                Parabéns! Você está oficialmente inscrito na Corridinha Mixuruca!
                Em breve você receberá um e-mail com todas as informações.
              </p>
              <div className="bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-2">Próximos Passos:</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Confirme o pagamento (PIX ou cartão)</li>
                  <li>• Aguarde o e-mail com dados para retirada do kit</li>
                  <li>• Prepare-se para a melhor aventura da sua vida!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const selectedRoutesDetails = formData.route.map(routeId =>
    routes.find(r => r.id === routeId)
  ).filter(Boolean);

  const totalPrice = calculateTotalPrice();

  return (
    <section id="registration" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inscrições
            <span className="block text-cyan-400 text-3xl md:text-4xl mt-2">
              Vagas Limitadas para Tanta Diversão! 🎟️
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Não perca a chance de viver essa experiência única!
            As vagas são limitadas para manter nossa vibe familiar e divertida.
          </p>

          {/* Countdown Timer */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
              <Clock className="w-6 h-6 mr-2 text-red-400" />
              Tempo Restante para Inscrições
            </h3>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{timeLeft.days}</div>
                <div className="text-gray-400 text-sm">Dias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{timeLeft.hours}</div>
                <div className="text-gray-400 text-sm">Horas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{timeLeft.minutes}</div>
                <div className="text-gray-400 text-sm">Min</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{timeLeft.seconds}</div>
                <div className="text-gray-400 text-sm">Seg</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pricing Info */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-cyan-400" />
                Lotes e Preços
              </h3>

              <div className="space-y-4 mb-6">
                {batches.map((batch) => (
                  <div
                    key={batch.number}
                    className={`p-4 rounded-xl border ${
                      batch.number === currentBatch
                        ? 'bg-gradient-to-r from-purple-600/20 to-cyan-400/20 border-purple-500/50'
                        : 'bg-black/30 border-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{batch.name}</span>
                      {batch.number === currentBatch && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                          ATUAL
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-300">
                      <p>{batch.period}</p>
                      <p className="text-cyan-400 font-medium">{batch.discount} OFF</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Percursos Selecionados e Total */}
              <div className="border-t border-gray-700/50 pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">Seus Percursos:</h4>
                {selectedRoutesDetails.length > 0 ? (
                  <div className="space-y-2">
                    {selectedRoutesDetails.map((route) => (
                      <div key={route!.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{route!.name}</span>
                        <span className="text-cyan-400 font-medium">R$ {route!.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-base font-bold text-white mt-4 pt-2 border-t border-gray-700/50">
                      <span>Total:</span>
                      <span className="text-green-400">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Nenhum percurso selecionado.</p>
                )}
              </div>

              <div className="mt-6 bg-gradient-to-r from-green-600/20 to-teal-400/20 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">Vagas Restantes</span>
                </div>
                <p className="text-green-400 text-sm">Apenas 47 vagas disponíveis!</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                Dados Pessoais
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Telefone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Tamanho da Camiseta *</label>
                  <select
                    name="shirtSize"
                    value={formData.shirtSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Selecione o tamanho</option>
                    {shirtSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-300 font-medium mb-2">Percurso(s) Escolhido(s) *</label>
                <div className="grid md:grid-cols-3 gap-4">
                  {routes.map((route) => (
                    <label
                      key={route.id}
                      className={`cursor-pointer p-4 rounded-xl border transition-all ${
                        formData.route.includes(route.id)
                          ? 'bg-gradient-to-r from-purple-600/20 to-cyan-400/20 border-purple-500/50'
                          : 'bg-black/30 border-gray-700/50 hover:border-gray-600/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="route"
                        value={route.id}
                        checked={formData.route.includes(route.id)}
                        onChange={handleRouteChange}
                        className="mr-2 mt-1 w-4 h-4 text-cyan-400 bg-black/30 border border-gray-700/50 rounded focus:ring-cyan-400 focus:ring-2"
                      />
                      <div className="text-white font-semibold mb-1">{route.name}</div>
                      <div className="text-cyan-400 font-medium">R$ {route.price.toFixed(2).replace('.', ',')}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Campo do Cupom */}
              <div className="mb-8">
                <label className="block text-gray-300 font-medium mb-2 flex items-center">
                  <Percent className="w-5 h-5 mr-2 text-purple-400" />
                  Cupom de Desconto (opcional)
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleInputChange}
                    onBlur={validateCoupon} // Valida quando o campo perde o foco
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Insira seu cupom aqui"
                  />
                  {couponError && (
                    <span className={`ml-3 text-sm font-medium ${couponError === 'Cupom válido!' ? 'text-green-400' : 'text-red-400'}`}>
                      {couponError}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
                Contato de Emergência
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Nome do Contato *</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Telefone do Contato *</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-300 font-medium mb-2">Experiência com Trilhas</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors"
                >
                  <option value="">Selecione sua experiência</option>
                  <option value="iniciante">Iniciante (primeira vez)</option>
                  <option value="intermediario">Intermediário (algumas vezes)</option>
                  <option value="experiente">Experiente (muitas trilhas)</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-gray-300 font-medium mb-2">Restrições Alimentares</label>
                <textarea
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Descreva suas restrições alimentares, se houver"
                />
              </div>

              <div className="mb-8">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-cyan-400 bg-black/30 border border-gray-700/50 rounded focus:ring-cyan-400 focus:ring-2"
                    required
                  />
                  <span className="text-gray-300 text-sm">
                    Eu concordo com os{' '}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300">Termos e Condições</a>
                    {' '}e{' '}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300">Política de Privacidade</a>
                    {' '}da Corridinha Mixuruca. Entendo que participarei por minha conta e risco,
                    priorizando sempre a diversão e segurança.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-400 text-white hover:scale-105 transform'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isFormValid() ? `Me Inscrever Agora! (Total: R$ ${totalPrice.toFixed(2).replace('.', ',')})` : 'Preencha todos os campos obrigatórios'}
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                * Campos obrigatórios | Processamento seguro garantido
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
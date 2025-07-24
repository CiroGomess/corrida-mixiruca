import React, { useState, useEffect } from 'react';
import { User, CreditCard, Clock, Users, CheckCircle, AlertCircle, Percent } from 'lucide-react';
import services from '../services/services'; // Importe o seu serviço
import Swal from 'sweetalert2';

import ModalTermo from './modalTermo';

// Definindo a interface para o tipo de dado de Corrida que vem da API
interface Corrida {
  id: number;
  nome: string;
  descricao: string;
  percuso: string; // O percurso que você quer usar para a label
  valor: string; // Vem como string, precisaremos converter para number
  total_vagas: number;
  total_inscricoes: number;
  data_corrida: string;
  data_limite_inscricao: string;
  termos_aceite: string; // Novo campo para os termos
  // Outros campos se houver
}

interface Cupom {
  id: number;
  codigo: string;
  valor_desconto: string;
  tipo_desconto: 'percentual' | 'fixo'; // ajuste se tiver mais tipos
}


const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dataNascimento: '', // <--- NOVO: Campo para Data de Nascimento
    route: [] as number[], // Alterado para number[] para corresponder ao ID da corrida
    shirtSize: '',
    emergencyContact: '',
    emergencyPhone: '',
    experience: '',
    dietary: '', // Será mapeado para 'observacoes' no backend
    agreement: false,
    coupon: ''
  });



  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [submitted, setSubmitted] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [availableCorridas, setAvailableCorridas] = useState<Corrida[]>([]); // Estado para armazenar as corridas da API
  const [loadingCorridas, setLoadingCorridas] = useState(true); // Estado de carregamento
  const [totalVagasRestantes, setTotalVagasRestantes] = useState(0); // Para exibir vagas restantes global
  // const [termsAndConditions, setTermsAndConditions] = useState(''); // Estado para os termos
  const [showModalTermo, setShowModalTermo] = useState(false);


  const [availableCoupons, setAvailableCoupons] = useState<{ [key: string]: { discount: number, id: number } }>({});


  const shirtSizes = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];



  // Carregar corridas do backend
  useEffect(() => {
    const fetchCorridas = async () => {
      setLoadingCorridas(true);
      const result = await services('/corridas', { method: 'GET' });
      if (result.success && result.data && Array.isArray(result.data.corridas)) {
        const now = new Date();
        const futureCorridas = result.data.corridas.filter((corrida: Corrida) => {
          const limiteInscricao = new Date(corrida.data_limite_inscricao + 'T23:59:59');
          return limiteInscricao >= now;
        });

        // Ordena as corridas futuras pela data limite de inscrição (mais próxima primeiro)
        futureCorridas.sort((a: Corrida, b: Corrida) => {
          const dateA = new Date(a.data_limite_inscricao).getTime();
          const dateB = new Date(b.data_limite_inscricao).getTime();
          return dateA - dateB;
        });

        setAvailableCorridas(futureCorridas);

        // Calcula total de vagas restantes APENAS para a corrida mais próxima
        if (futureCorridas.length > 0) {
          const closestCorrida = futureCorridas[0];
          setTotalVagasRestantes(closestCorrida.total_vagas - closestCorrida.total_inscricoes);

          // Define a data limite da primeira corrida para o contador
          const targetDateString = `${closestCorrida.data_limite_inscricao}T23:59:59`;
          const targetDate = new Date(targetDateString).getTime();
          updateCountdown(targetDate);

          // Pega os termos de aceite da primeira corrida válida
          // setTermsAndConditions(closestCorrida.termos_aceite || 'Eu concordo com os Termos e Condições do evento.');
        } else {
          // Se não houver corridas futuras, define uma data padrão para o contador zerar
          setTotalVagasRestantes(0);
          updateCountdown(new Date().getTime());
          // setTermsAndConditions('Eu concordo com os Termos e Condições do evento.');
        }

      } else {
        Swal.fire('Erro', 'Não foi possível carregar as corridas.', 'error');
        setAvailableCorridas([]);
        setTotalVagasRestantes(0);
      }
      setLoadingCorridas(false);
    };

    const fetchCupons = async () => {
      try {
        const result = await services('/cupons', { method: 'GET' });
        if (result.success && Array.isArray(result.data.cupons)) {
          const mappedCoupons: { [key: string]: { discount: number, id: number } } = {};

          (result.data.cupons as Cupom[])
            .filter(c =>
              typeof c.codigo === 'string' &&
              typeof c.valor_desconto === 'string' &&
              typeof c.tipo_desconto === 'string' &&
              typeof c.id === 'number'
            )
            .forEach(cupom => {
              const codigoUpper = cupom.codigo.toUpperCase();

              mappedCoupons[codigoUpper] = {
                discount: cupom.tipo_desconto === 'percentual'
                  ? parseFloat(cupom.valor_desconto) / 100
                  : parseFloat(cupom.valor_desconto),
                id: cupom.id
              };
            });



          setAvailableCoupons(mappedCoupons);
        } else {
          console.warn('Não foi possível carregar cupons.');
        }
      } catch (error) {
        console.error('Erro ao buscar cupons:', error);
      }
    };

    fetchCupons();
    fetchCorridas();

    // Configura o timer de contagem regressiva
    const intervalId = setInterval(() => {
      if (availableCorridas.length > 0) {
        const closestCorrida = availableCorridas[0]; // Sempre pega a corrida mais próxima (já ordenada)
        const targetDateString = `${closestCorrida.data_limite_inscricao}T23:59:59`;
        const targetDate = new Date(targetDateString).getTime();
        updateCountdown(targetDate);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId); // Limpa o intervalo no unmount
  }, [availableCorridas.length]); // Dependência adicionada para reavaliar o timer

  // Função auxiliar para atualizar o estado do timeLeft
  const updateCountdown = (targetTime: number) => {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance > 0) {
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'coupon') {
        setCouponError('');
      }
    }
  };

  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const routeId = parseInt(e.target.value); // Converte para número
    const checked = e.target.checked;

    setFormData(prev => {
      const newRoutes = checked
        ? [...prev.route, routeId]
        : prev.route.filter(id => id !== routeId);
      return { ...prev, route: newRoutes };
    });
  };

  const calculateTotalPrice = () => {
    let subtotal = formData.route.reduce((total, routeId) => {
      const selectedCorrida = availableCorridas.find(c => c.id === routeId);
      return total + (selectedCorrida ? parseFloat(selectedCorrida.valor) : 0);
    }, 0);

    const couponCode = formData.coupon.toUpperCase();


    if (availableCoupons[couponCode]) {
      const { discount } = availableCoupons[couponCode];

      console.log(`Aplicando desconto de ${discount} no subtotal de R$ ${subtotal.toFixed(2)}`);

      if (discount < 1) {
        // Desconto percentual
        subtotal -= subtotal * discount;
      } else {
        // Desconto fixo (valor absoluto)
        subtotal -= discount;
      }

      if (subtotal < 0) subtotal = 0;
    }


    return subtotal;
  };


  const validateCoupon = () => {
    const couponCode = formData.coupon.toUpperCase();
    if (formData.coupon === '') {
      setCouponError('');
      return;
    }

    if (availableCoupons[couponCode]) {
      setCouponError('Cupom válido!');
    } else {
      setCouponError('Cupom inválido.');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      Swal.fire('Atenção', 'Por favor, preencha todos os campos obrigatórios.', 'warning');
      return;
    }

    // Pega o ID do cupom, se houver
    const couponCode = formData.coupon.toUpperCase();
    const couponId = availableCoupons[couponCode] ? availableCoupons[couponCode].id : null;

    // <--- MODIFICADO: Preparar os dados para envio no formato exato do backend
    const dataToSend = {
      nome_completo: formData.name,
      telefone: formData.phone,
      nome_contato_emergencia: formData.emergencyContact,
      telefone_contato_emergencia: formData.emergencyPhone,
      data_nascimento: formData.dataNascimento, // Mapeado diretamente
      id_corrida: formData.route, // Array de IDs numéricos das corridas
      tamanho_camisa: formData.shirtSize,
      experiencia_trilha: formData.experience,
      observacoes: formData.dietary, // Mapeado de 'dietary' para 'observacoes'
      termos_aceitos: formData.agreement,
      id_cupom_utilizado: couponId, // ID numérico do cupom, ou null
      preco_final: parseFloat(calculateTotalPrice().toFixed(2)) // Preço final formatado como número
    };

    console.log('Dados enviados para o backend:', dataToSend); // Para depuração

    // Aqui você enviaria os dados para o seu backend usando o serviço
    // Exemplo:

    try {
      const response = await services('/inscricoes', { method: 'POST', data: dataToSend });
      if (response.success) {
        setSubmitted(true);
        Swal.fire('Sucesso!', 'Sua inscrição foi realizada com sucesso!', 'success');
      } else {
        Swal.fire('Erro na Inscrição', response.data.message || 'Ocorreu um erro ao processar sua inscrição.', 'error');
      }
    } catch (error) {
      Swal.fire('Erro', 'Ocorreu um erro inesperado ao tentar se inscrever.', 'error');
      console.error('Erro ao enviar inscrição:', error);
    }

    setSubmitted(true); // Temporário para simular sucesso
  };

  const isFormValid = () => {
    return formData.name &&
      formData.email &&
      formData.phone &&
      formData.dataNascimento && // <--- NOVO: Data de Nascimento é obrigatória
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
                  <li>• Aguarde o e-mail com dados</li>
                  <li>• Prepare-se para a melhor aventura da sua vida!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Filtrar as corridas selecionadas do formData.route com base nas availableCorridas
  const selectedRoutesDetails = formData.route
    .map(routeId => availableCorridas.find(corrida => corrida.id === routeId))
    .filter(Boolean) as Corrida[]; // Assegura que o tipo é Corrida[]

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
                Resumo da compra
              </h3>

              {/* Percursos Selecionados e Total */}
              <div className="border-t border-gray-700/50 pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">Seus Percursos:</h4>
                {selectedRoutesDetails.length > 0 ? (
                  <div className="space-y-2">
                    {selectedRoutesDetails.map((corrida) => (
                      <div key={corrida.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{corrida.percuso}</span>
                        <span className="text-cyan-400 font-medium">R$ {parseFloat(corrida.valor).toFixed(2).replace('.', ',')}</span>
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
                {loadingCorridas ? (
                  <p className="text-green-400 text-sm">Carregando vagas...</p>
                ) : (
                  <p className="text-green-400 text-sm">Apenas {totalVagasRestantes} vagas disponíveis!</p>
                )}
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

                {/* --- NOVO CAMPO: Data de Nascimento --- */}
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Data de Nascimento *</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors [color-scheme:dark]" // [color-scheme:dark] para estilizar o calendário
                    required
                  />
                </div>
                {/* ------------------------------------ */}

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
                {loadingCorridas ? (
                  <p className="text-gray-400">Carregando percursos...</p>
                ) : availableCorridas.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    {availableCorridas.map((corrida) => (
                      <label
                        key={corrida.id}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${formData.route.includes(corrida.id)
                          ? 'bg-gradient-to-r from-purple-600/20 to-cyan-400/20 border-purple-500/50'
                          : 'bg-black/30 border-gray-700/50 hover:border-gray-600/50'
                          }`}
                      >
                        <input
                          type="checkbox"
                          name="route"
                          value={corrida.id}
                          checked={formData.route.includes(corrida.id)}
                          onChange={handleRouteChange}
                          className="mr-2 mt-1 w-4 h-4 text-cyan-400 bg-black/30 border border-gray-700/50 rounded focus:ring-cyan-400 focus:ring-2"
                        />
                        <div className="text-white font-semibold mb-1">{corrida.percuso}</div>
                        <div className="text-cyan-400 font-medium">R$ {parseFloat(corrida.valor).toFixed(2).replace('.', ',')}</div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-400 text-sm">Nenhuma corrida disponível no momento ou com inscrições abertas.</p>
                )}
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
                    onBlur={validateCoupon}
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
                <label className="block text-gray-300 font-medium mb-2">Restrições Alimentares / Observações</label>
                <textarea
                  name="dietary" // O nome do estado é 'dietary', mas será mapeado para 'observacoes' no envio
                  value={formData.dietary}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Descreva suas restrições alimentares ou outras observações"
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
                    <a href="#" className="text-cyan-400 hover:text-cyan-300" onClick={(e) => { e.preventDefault(); setShowModalTermo(true); }}>Termos e Condições</a>
                    {' '}da Corridinha Mixuruca. Entendo que participarei por minha conta e risco,
                    priorizando sempre a diversão e segurança.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${isFormValid()
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

            <ModalTermo isOpen={showModalTermo} onClose={() => setShowModalTermo(false)} />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
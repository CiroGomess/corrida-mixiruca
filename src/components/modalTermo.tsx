import React from 'react';
import { X } from 'lucide-react';

interface ModalTermoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTermo: React.FC<ModalTermoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-gray-900 border border-cyan-500/30 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Termo de Responsabilidade e Autorização de Uso de Imagem
          </h2>
          <h3 className="text-lg text-cyan-400 font-semibold mb-6 text-center">
            Corridinha Mixuruca
          </h3>

          <div className="text-gray-300 space-y-5 text-justify text-sm md:text-base leading-relaxed">
            <p>
              Declaro, para os devidos fins, que estou em plenas condições físicas e mentais para participar das atividades promovidas pela <strong className="text-white">Corridinha Mixuruca</strong>, incluindo trilhas, caminhadas, corridas e demais ações esportivas, culturais e recreativas.
            </p>

            <p>
              Tenho ciência de que tais atividades podem envolver esforço físico e exposição a condições naturais variadas, e que participo de forma espontânea, por minha livre e expressa vontade, assumindo total responsabilidade sobre meus limites, cuidados pessoais e eventuais riscos.
            </p>

            <p>
              Estou ciente de que a organização disponibiliza estrutura básica de primeiros socorros e equipe de apoio durante os eventos, comprometendo-me a seguir todas as orientações fornecidas para minha segurança e a dos demais participantes.
            </p>

            <p>
              Isento a organização da Corridinha Mixuruca, seus organizadores, voluntários, parceiros e apoiadores, de qualquer responsabilidade por eventuais acidentes, lesões ou imprevistos decorrentes da minha participação nas atividades.
            </p>

            <p>
              Autorizo, de forma gratuita, irrevogável e por prazo indeterminado, o uso da minha imagem (fotos e vídeos) captada durante os eventos, em qualquer mídia, incluindo redes sociais, sites, materiais promocionais e institucionais, sem que isso gere qualquer direito a remuneração.
            </p>

            <p>
              Este termo é válido para todas as atividades da Corridinha Mixuruca das quais eu venha a participar, podendo ser revogado mediante solicitação formal enviada antes da próxima participação.
            </p>

            <p className="text-center text-sm text-gray-400 mt-8">
              Ao prosseguir com minha inscrição, declaro que li, compreendi e concordo com todos os termos acima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTermo;

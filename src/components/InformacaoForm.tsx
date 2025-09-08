import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Upload, X, Send } from 'lucide-react';
import { InformacaoAdicional } from '../types';

interface InformacaoFormProps {
  pessoaId: string;
  onSubmit: (data: InformacaoAdicional) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const InformacaoForm: React.FC<InformacaoFormProps> = ({
  pessoaId,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InformacaoAdicional>({
    defaultValues: {
      pessoaId,
      observacoes: '',
      localizacao: '',
      dataAvistamento: '',
      contato: '',
      telefone: '',
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = [...selectedFiles, ...files];
    
    if (newFiles.length <= 5) {
      setSelectedFiles(newFiles);
      
      // Criar URLs de preview
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
  };

  const handleFormSubmit = (data: InformacaoAdicional) => {
    const formData = {
      ...data,
      fotos: selectedFiles,
    };
    onSubmit(formData);
  };

  const handleCancel = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    reset();
    onCancel();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Enviar Informação Adicional
      </h3>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Observações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações *
          </label>
          <textarea
            {...register('observacoes', { required: 'Observações são obrigatórias' })}
            rows={3}
            className="input-field"
            placeholder="Descreva o que você observou..."
          />
          {errors.observacoes && (
            <p className="text-red-600 text-sm mt-1">{errors.observacoes.message}</p>
          )}
        </div>

        {/* Localização */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Localização Avistada *
          </label>
          <input
            {...register('localizacao', { required: 'Localização é obrigatória' })}
            type="text"
            className="input-field"
            placeholder="Endereço ou local onde você viu a pessoa"
          />
          {errors.localizacao && (
            <p className="text-red-600 text-sm mt-1">{errors.localizacao.message}</p>
          )}
        </div>

        {/* Data do Avistamento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data do Avistamento *
          </label>
          <input
            {...register('dataAvistamento', { required: 'Data é obrigatória' })}
            type="date"
            className="input-field"
          />
          {errors.dataAvistamento && (
            <p className="text-red-600 text-sm mt-1">{errors.dataAvistamento.message}</p>
          )}
        </div>

        {/* Contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Contato
            </label>
            <input
              {...register('contato')}
              type="text"
              className="input-field"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              {...register('telefone')}
              className="input-field"
              placeholder="(00) 00000-0000"
              pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
            />
          </div>
        </div>

        {/* Upload de Fotos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fotos (máximo 5)
          </label>
          
          {/* Área de upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={selectedFiles.length >= 5}
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer flex flex-col items-center space-y-2 ${
                selectedFiles.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Camera className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                Clique para selecionar fotos ou arraste aqui
              </span>
              <span className="text-xs text-gray-500">
                {selectedFiles.length}/5 fotos selecionadas
              </span>
            </label>
          </div>

          {/* Preview das fotos */}
          {previewUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isLoading ? 'Enviando...' : 'Enviar Informação'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InformacaoForm;

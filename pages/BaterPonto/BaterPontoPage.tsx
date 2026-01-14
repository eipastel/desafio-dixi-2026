
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/ui/Button/Button';
import Switch from '../../components/ui/Switch/Switch';
import Modal from '../../components/ui/Modal/Modal';
import Card from '../../components/ui/Card/Card';

const BaterPontoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [capturedTime, setCapturedTime] = useState(new Date());
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [takePhoto, setTakePhoto] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Clock Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Camera Logic
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        setCameraError("Não foi possível acessar a câmera. Verifique as permissões.");
      }
    }

    if (takePhoto) {
      startCamera();
    } else {
      if (videoRef.current) videoRef.current.srcObject = null;
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [takePhoto]);

  const handleRegister = () => {
    if (takePhoto && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        setCapturedImage(canvas.toDataURL('image/jpeg'));
        setCapturedTime(new Date());
        setIsModalOpen(true);
      }
    } else {
      // Logic for when photo is disabled
      setCapturedImage(null);
      setCapturedTime(new Date());
      setIsModalOpen(true);
    }
  };

  const formatDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
      .format(date)
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const formatHoursMinutes = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours} : ${minutes}`;
  };

  const formatSeconds = (date: Date) => {
    return date.getSeconds().toString().padStart(2, '0');
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6 animate-in fade-in duration-500">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Header Section */}
      <section>
        <h1 className="text-page-title text-dixi-base mb-1">Bater Ponto</h1>
        <p className="text-subtitle text-dixi-body">Registre o ponto no sistema.</p>
      </section>

      {/* Unified Card Layout */}
      <Card className="flex flex-col md:flex-row overflow-hidden border-dixi-outline shadow-xl min-h-[500px] max-h-[85vh]">
        
        {/* Left Side: Real Camera View or Placeholder */}
        <div className="relative flex-1 bg-black overflow-hidden group min-h-[300px] md:min-h-0">
          {!takePhoto ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-800 text-white gap-4">
              <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <p className="text-lg font-semibold">Câmera desativada</p>
            </div>
          ) : cameraError ? (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-gray-900">
              <p className="text-white text-sm font-medium">{cameraError}</p>
            </div>
          ) : (
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover scale-x-[-1]" 
            />
          )}
          
          {takePhoto && (
            <>
              {/* Instruction Text Overlay */}
              <div className="absolute top-8 w-full text-center px-4 z-10">
                <span className="text-white text-[14px] font-bold drop-shadow-lg bg-black/40 py-1.5 px-6 rounded-full backdrop-blur-[4px]">
                  Centralize o rosto na moldura para tirar a foto.
                </span>
              </div>

              {/* Camera Frame Guidelines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-[70%] h-[75%] max-w-[280px] max-h-[360px] border-[6px] border-white/80 rounded-[60px] opacity-90 box-content shadow-[0_0_0_2000px_rgba(0,0,0,0.4)]">
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Information and Actions */}
        <div className="w-full md:w-[400px] p-8 lg:p-12 flex flex-col justify-between bg-white border-l border-dixi-outline z-20">
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-dixi-base text-subtitle font-bold uppercase tracking-wide">
                {formatDay(currentTime)}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[60px] lg:text-[72px] font-bold text-dixi-base leading-none">
                  {formatHoursMinutes(currentTime)}
                </span>
                <span className="text-[24px] text-dixi-placeholder font-semibold mt-4">
                  {formatSeconds(currentTime)}
                </span>
              </div>
              <span className="text-dixi-base text-subtitle font-bold mt-1">
                {formatDate(currentTime)}
              </span>
            </div>

            <p className="text-field-text text-dixi-body leading-relaxed max-w-[280px]">
              A data e hora serão registrados no sistema ao realizar a marcação.
            </p>

            <div className="py-2 mt-2">
              <Switch 
                label="Tirar Foto para Bater Ponto" 
                checked={takePhoto} 
                onChange={() => setTakePhoto(!takePhoto)}
              />
            </div>
          </div>

          <div className="mt-8">
            <Button 
              className="w-full py-4 rounded-lg flex items-center justify-center gap-3 shadow-lg shadow-dixi-base/20" 
              size="md"
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                   <circle cx="12" cy="12" r="9" strokeWidth="2" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v1m0 8v1m4.5-4.5h1M7.5 12h-1" />
                </svg>
              }
              onClick={handleRegister}
            >
              Registrar Ponto
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal Marking Preview */}
      <Modal 
        isOpen={isModalOpen} 
        title="Prévia da Marcação" 
        onClose={() => setIsModalOpen(false)}
        maxWidth="max-w-[850px]"
        footer={
          <>
            <Button variant="outlined" className="flex-1 py-4" onClick={() => setIsModalOpen(false)} 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>}>
              Tirar Outra Foto
            </Button>
            <Button className="flex-1 py-4" onClick={() => setIsModalOpen(false)}
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}>
              Registrar Ponto
            </Button>
          </>
        }
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo Preview */}
            <div className="w-full md:w-[380px] aspect-[4/5] rounded-[30px] overflow-hidden shadow-lg border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                {capturedImage ? (
                  <img src={capturedImage} className="w-full h-full object-cover" alt="Captured Preview" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                    </svg>
                    <span className="font-semibold">Sem foto</span>
                  </div>
                )}
            </div>

            {/* Content Details */}
            <div className="flex-1 flex flex-col items-center text-center">
                <span className="text-[24px] font-bold text-gray-600 uppercase tracking-tight mb-2">
                  {formatDay(capturedTime)}
                </span>
                
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[82px] font-bold text-gray-700 leading-none">
                    {formatHoursMinutes(capturedTime)}
                  </span>
                  <span className="text-[36px] font-bold text-gray-500 mt-6">
                    {formatSeconds(capturedTime)}
                  </span>
                </div>

                <span className="text-[26px] font-bold text-gray-600 mb-8">
                  {formatDate(capturedTime)}
                </span>

                <p className="text-[20px] text-gray-400 font-medium">
                  Você deseja registrar esse ponto?
                </p>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default BaterPontoPage;

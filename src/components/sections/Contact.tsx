'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { Card } from '../ui/Card';
import { MailIcon, PhoneIcon, LocationIcon, SendIcon, WhatsAppIcon } from '../ui/Icons';
import { SectionHeader } from '../ui/SectionHeader';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const WHATSAPP_PHONE = '573133003370';

export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const whatsappMessage = `Hola Oscar, te contacto desde tu portfolio:%0A%0A*Nombre:* ${formData.name}%0A*Email:* ${formData.email}%0A*Asunto:* ${formData.subject}%0A%0A*Mensaje:*%0A${formData.message}`;

    const whatsappUrl = `https://wa.me/573133003370?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setFormData(initialFormData);
    setIsSubmitting(false);
    setSubmitStatus('success');

    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Hablemos
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Cuéntame y vemos cómo ayudarte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info de contacto */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Hablemos</h3>
            <p className="text-neutral-400 leading-relaxed mb-8">
              Estoy siempre abierto a nuevas oportunidades y colaboraciones interesantes.
              Ya sea que tengas un proyecto específico en mente o solo quieras charlar sobre tecnología,
              no dudes en contactarme. Respondo generalmente en menos de 24 horas.
            </p>

            <div className="space-y-5">
              {[
                { icon: '📧', label: 'Email', value: 'oscarfabianangucho@gmail.com', href: 'mailto:oscarfabianangucho@gmail.com' },
                { icon: '📱', label: 'Teléfono', value: '+57 313 300 3370', href: 'tel:+573133003370' },
                { icon: '📍', label: 'Ubicación', value: 'Villavicencio, Colombia', href: '#' },
              ].map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 group"
                >
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="text-xl">{item.icon}</span>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-neutral-500 block">{item.label}</span>
                    <span className="font-medium text-white truncate block">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-6 text-neutral-500 text-sm">
              Respondo generalmente en menos de 24 horas.
            </p>
          </div>

          {/* Formulario compacto y responsive */}
          <div className="bg-neutral-950/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347-.253-.124-.548-.163-.835-.163-.253 0-.574.013-.87.037-.3.023-.572.098-.895.272-.323.173-.602.298-.924.298-.304 0-.662-.05-.976-.224-.372-.224-.786-.662-1.144-1.183-.386-.559-.634-1.045-.793-1.397-.173-.372-.198-.471-.149-.599.05-.124.2-.198.45-.348.204-.124.45-.148.804-.148.347 0 .644.049.976.124.223.074.54.198.916.348.573.223 1.52.618 1.772 1.016.173.273.173.547.1 1.279-.074.47-.224.88-.52 1.33-.332.423-.916.924-1.52 1.494-.555.525-1.255 1.143-1.504 1.413-.174.198-.372.297-.67.223-.254-.074-.602-.26-.895-.497-.248-.224-.57-.472-.98-.916-.1-.1-.199-.174-.373-.248z"/>
              </svg>
              <span className="ml-2 font-medium">Enviar por WhatsApp</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Tu nombre"
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <Input
                label="Asunto"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="¿De qué se trata?"
                required
              />

              <Textarea
                label="Mensaje"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Cuéntame sobre tu proyecto, ideas o cómo puedo ayudarte..."
                rows={4}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-lg font-bold text-[#07010F] bg-neon-cyan shadow-[0_0_24px_rgba(25,227,255,0.45)] hover:bg-white hover:shadow-[0_0_36px_rgba(25,227,255,0.8)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar por WhatsApp'}
              </button>

              <p className="text-xs text-neutral-400 text-center">
                Se abrirá WhatsApp con tu mensaje listo para enviar.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
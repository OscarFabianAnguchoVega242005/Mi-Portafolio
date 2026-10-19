'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { Card } from '../ui/Card';
import { MailIcon, PhoneIcon, LocationIcon } from '../ui/Icons';
import { SectionHeader } from '../ui/SectionHeader';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const WHATSAPP_PHONE = '573133003370';

const contactInfo = [
  { icon: <MailIcon />, label: 'Email', value: personalInfo.email, href: personalInfo.socialLinks.email },
  { icon: <PhoneIcon />, label: 'Teléfono', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
  { icon: <LocationIcon />, label: 'Ubicación', value: personalInfo.location, href: '#' },
];

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
    else if (formData.message.trim().length < 10) newErrors.message = 'El mensaje debe tener al menos 10 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const whatsappMessage = `Hola Oscar, te contacto desde tu portfolio:\n\n*Nombre:* ${formData.name}\n*Email:* ${formData.email}\n*Asunto:* ${formData.subject}\n\n*Mensaje:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    alert('Se abrirá WhatsApp con tu mensaje listo para enviar.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h2 className="nx-title [--t:#FFD166] [--g:#FFC83D] text-5xl md:text-7xl font-extrabold leading-none tracking-[-0.03em] mb-5">
            Hablemos
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Cuéntame y vemos cómo ayudarte.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ul className="space-y-4" role="list">
              {[
                { icon: <MailIcon />, label: 'Email', value: personalInfo.email, href: personalInfo.socialLinks.email },
                { icon: <PhoneIcon />, label: 'Teléfono', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
                { icon: <LocationIcon />, label: 'Ubicación', value: personalInfo.location, href: '#' },
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                >
                  <a
                    href={item.href}
                    className="group nx-glass flex items-center gap-4 p-4 !rounded-2xl hover:border-neon-cyan/50 hover:shadow-[0_0_24px_rgba(0,240,255,0.2)] transition-all"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center flex-shrink-0 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-[#07010F] transition-colors">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <span className="text-sm text-neutral-400 block">{item.label}</span>
                      <span className="font-semibold text-white break-words">{item.value}</span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 pl-4 border-l-2 border-neon-pink/60 text-neutral-300 text-sm">
              Respondo generalmente en menos de 24 horas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="nx-card [--c:#FF2BD6] p-5 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-white">Enviar por WhatsApp</h3>
              </div>

              <p className="text-neutral-300 text-sm mb-6">
                Te redirigiré a WhatsApp con el mensaje prellenado. Solo tienes que dar a "Enviar".
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Tu nombre" required />
                  <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="tu@email.com" required />
                </div>

                <Input label="Asunto" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} placeholder="¿De qué se trata?" required />

                <Textarea label="Mensaje" name="message" value={formData.message} onChange={handleChange} error={errors.message} placeholder="Cuéntame sobre tu proyecto, ideas o cómo puedo ayudarte..." rows={4} required />

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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
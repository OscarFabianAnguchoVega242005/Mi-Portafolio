'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  {
    icon: <MailIcon />,
    label: 'Email',
    value: personalInfo.email,
    href: personalInfo.socialLinks.email,
  },
  {
    icon: <PhoneIcon />,
    label: 'Teléfono',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <LocationIcon />,
    label: 'Ubicación',
    value: personalInfo.location,
    href: '#',
  },
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
    if (errors[name]) setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-neutral-950">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Hablemos
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Cuéntame y vemos cómo ayudarte.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ul className="space-y-6" role="list">
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
                  <a href={item.href} className="flex items-center gap-4" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-sm text-neutral-500 block">{item.label}</span>
                      <span className="font-medium text-white">{item.value}</span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 text-neutral-500">
              Respondo generalmente en menos de 24 horas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
                  <WhatsAppIcon className="w-5 h-5 text-green" />
                </span>
                <h3 className="text-xl font-semibold text-white">Enviar por WhatsApp</h3>
              </div>

              <p className="text-neutral-500 mb-6">
                Te redirigiré a WhatsApp con el mensaje prellenado. Solo tienes que dar a "Enviar".
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Tu nombre" required />
                  <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="tu@email.com" required />
                </div>

                <Input label="Asunto" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} placeholder="¿De qué se trata?" required />

                <Textarea label="Mensaje" name="message" value={formData.message} onChange={handleChange} error={errors.message} placeholder="Cuéntame sobre tu proyecto, ideas o cómo puedo ayudarte..." rows={5} required />

                <Button type="submit" className="w-full gap-2" isLoading={isSubmitting} size="lg">
                  {isSubmitting ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}
                  <SendIcon className="w-5 h-5" />
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.779-.717c-.601-.56-1.088-1.388-1.326-2.394-.187-.85-.12-1.852.204-2.737.23-.619.62-1.175 1.053-1.586.44-.416.983-.744 1.52-1.054 1.049-.601 2.232-1.054 2.795-1.262.477-.173.976-.26 1.493-.274.398-.01.72.025 1.042.15.257.099.598.187.857.325.358.173.547.241.905.198.324-.042.644-.133.95-.304.47-.26 1.227-.925 1.532-1.69.264-.662.297-1.06.198-1.235-.074-.124-.272-.198-.57-.347-.253-.124-.548-.163-.835-.163-.253 0-.574.013-.87.037-.3.023-.572.098-.895.272-.323.173-.602.298-.924.298-.304 0-.662-.05-.976-.224-.372-.224-.786-.662-1.144-1.183-.386-.559-.634-1.045-.793-1.397-.173-.372-.198-.471-.149-.599.05-.124.2-.198.45-.348.204-.124.45-.148.804-.148.347 0 .644.049.976.124.223.074.54.198.916.348.573.223 1.52.618 1.772 1.016.173.273.173.547.1 1.279-.074.47-.224.88-.52 1.33-.332.423-.916.924-1.52 1.494-.555.525-1.255 1.143-1.504 1.413-.174.198-.372.297-.67.223-.254-.074-.602-.26-.895-.497-.248-.224-.57-.472-.98-.916-.1-.1-.199-.174-.373-.248zm2.225-7.256h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.779-.717c-.601-.56-1.088-1.388-1.326-2.394-.187-.85-.12-1.852.204-2.737.23-.619.62-1.175 1.053-1.586.44-.416.983-.744 1.52-1.054 1.049-.601 2.232-1.054 2.795-1.262.477-.173.976-.26 1.493-.274.398-.01.72.025 1.042.15.257.099.598.187.857.325.358.173.547.241.905.198.324-.042.644-.133.95-.304.47-.26 1.227-.925 1.532-1.69.264-.662.297-1.06.198-1.235-.074-.124-.272-.198-.57-.347-.253-.124-.548-.163-.835-.163-.253 0-.574.013-.87.037-.3.023-.572.098-.895.272-.323.173-.602.298-.924.298-.304 0-.662-.05-.976-.224-.372-.224-.786-.662-1.144-1.183-.386-.559-.634-1.045-.793-1.397-.173-.372-.198-.471-.149-.599.05-.124.2-.198.45-.348.204-.124.45-.148.804-.148.347 0 .644.049.976.124.223.074.54.198.916.348.573.223 1.52.618 1.772 1.016.173.273.173.547.1 1.279-.074.47-.224.88-.52 1.33-.332.423-.916.924-1.52 1.494-.555.525-1.255 1.143-1.504 1.413-.174.198-.372.297-.67.223-.254-.074-.602-.26-.895-.497-.248-.224-.57-.472-.98-.916-.1-.1-.199-.174-.373-.248z"/>
                  </svg>
                </Button>

                <p className="text-xs text-neutral-500 text-center">
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
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

const WHATSAPP_PHONE = '573133003370'; // 57 = Colombia, sin + ni espacios

const contactInfo = [
  {
    icon: <MailIcon />,
    label: 'Email',
    value: personalInfo.email,
    href: personalInfo.socialLinks.email,
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  },
  {
    icon: <PhoneIcon />,
    label: 'Teléfono',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  },
  {
    icon: <LocationIcon />,
    label: 'Ubicación',
    value: personalInfo.location,
    href: '#',
    color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
  },
];

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    // Construir mensaje para WhatsApp con saltos de línea reales
    const whatsappMessage = `Hola Oscar, te contacto desde tu portfolio:\n\n` +
      `*Nombre:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Asunto:* ${formData.subject}\n\n` +
      `*Mensaje:*\n${formData.message}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Reset form y feedback visual
    setFormData(initialFormData);
    setIsSubmitting(false);

    // Opcional: mostrar toast de confirmación
    alert('Se abrirá WhatsApp con tu mensaje listo para enviar.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white dark:bg-slate-950">
      <div className="container px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <SectionHeader
            title="Hablemos"
            subtitle="¿Tienes un proyecto en mente? Cuéntame y vemos cómo ayudarte."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ul className="space-y-6" role="list">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-4"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 block">{item.label}</span>
                      <span className="font-medium text-slate-900 dark:text-white">{item.value}</span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 text-slate-600 dark:text-slate-400">
              Respondo generalmente en menos de 24 horas.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <Card className="p-6 md:p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <WhatsAppIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Enviar por WhatsApp</h3>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Te redirigiré a WhatsApp con el mensaje prellenado. Solo tienes que dar a "Enviar".
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
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
                  rows={5}
                  required
                />

                <Button type="submit" className="w-full gap-2" isLoading={isSubmitting} size="lg">
                  {isSubmitting ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}
                  <SendIcon className="w-5 h-5" />
                  <WhatsAppIcon className="w-5 h-5" />
                </Button>

                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Se abrirá wa.me con tu mensaje listo para enviar.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { Card } from '../ui/Card';
import { MailIcon, PhoneIcon, LocationIcon, SendIcon } from '../ui/Icons';
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error enviando el mensaje');
      }

      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData(initialFormData);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      console.error('Error:', error);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
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
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Enviar mensaje</h3>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300">¡Mensaje enviado!</p>
                      <p className="text-sm text-green-600 dark:text-green-400">Te responderé lo antes posible.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-300">Error al enviar</p>
                      <p className="text-sm text-red-600 dark:text-red-400">Inténtalo de nuevo más tarde.</p>
                    </div>
                  </div>
                </motion.div>
              )}

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
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  <SendIcon className="w-5 h-5" />
                </Button>

                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Tus datos solo se usan para responderte.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from 'react';
import Button from './Button';
import { useReveal } from '../hooks/useReveal';

const inputClass =
  'w-full px-4 py-3 text-sm rounded-lg transition-all duration-200 outline-none bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] text-ink dark:text-ink-dark placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary font-sans focus:border-[rgba(124,106,247,0.50)] dark:focus:border-[rgba(124,106,247,0.50)] focus:bg-[rgba(0,0,0,0.06)] dark:focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_3px_rgba(124,106,247,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]';

const Contact = () => {
  const [formState, setFormState] = useState({ status: 'idle', message: '' });
  const revealRef = useReveal(0.12);

  const onSubmit = async (event) => {
    event.preventDefault();

    const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      setFormState({ status: 'error', message: 'Invalid API key. Configure your .env file.' });
      return;
    }

    setFormState({ status: 'sending', message: 'Sending...' });
    const formData = new FormData(event.target);
    formData.append('access_key', accessKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormState({ status: 'success', message: 'Message sent.' });
        event.target.reset();
        setTimeout(() => setFormState({ status: 'idle', message: '' }), 5000);
      } else {
        setFormState({ status: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setFormState({ status: 'error', message: 'Failed to send. Please try again.' });
    }
  };

  return (
    <section
      id="contact"
      ref={revealRef}
      className="reveal w-full px-6 py-20 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-stroke dark:via-stroke-dark to-transparent mb-20" />
      </div>
      <div className="max-w-lg mx-auto">
        <h2 className="text-xs font-medium tracking-[0.25em] uppercase text-accent mb-2 border-l-2 border-accent pl-3">
          Contact
        </h2>
        <p className="font-display text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-b dark:from-ink-dark dark:to-ink-dark-secondary from-ink to-ink-secondary bg-clip-text text-transparent mb-4">
          Get in touch
        </p>
        <p className="text-sm text-ink-secondary dark:text-ink-dark-secondary mb-10 leading-relaxed">
          Questions, feedback, or just want to say hello. Fill out the form below.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              className={inputClass}
            />
          </div>

          <textarea
            rows={5}
            placeholder="Message"
            required
            name="message"
            className={`${inputClass} resize-none`}
          />

          <div className="flex items-center gap-4">
            <Button type="submit" variant="primary" disabled={formState.status === 'sending'}>
              {formState.status === 'sending' ? 'Sending...' : 'Send message'}
            </Button>
            {formState.status === 'success' && (
              <span className="flex items-center gap-1.5 text-sm text-[#86efac]">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Message sent.
              </span>
            )}
            {formState.status === 'error' && formState.message && (
              <span className="flex items-center gap-1.5 text-sm text-red-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {formState.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState } from 'react';
import Button from './Button';

const Contact = () => {
  const [formState, setFormState] = useState({ status: 'idle', message: '' });

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
      className="w-full px-6 py-20 md:py-32 bg-surface dark:bg-surface-dark"
    >
      <div className="max-w-lg mx-auto">
        <h2 className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
          Contact
        </h2>
        <p className="text-3xl md:text-4xl font-bold tracking-tight text-ink dark:text-ink-dark mb-4">
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
              className="w-full px-3.5 py-2.5 text-sm bg-surface-raised dark:bg-surface-dark-raised border border-stroke dark:border-stroke-dark rounded-md focus:ring-1 focus:ring-ink dark:focus:ring-ink-dark text-ink dark:text-ink-dark placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary transition-colors duration-200"
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              className="w-full px-3.5 py-2.5 text-sm bg-surface-raised dark:bg-surface-dark-raised border border-stroke dark:border-stroke-dark rounded-md focus:ring-1 focus:ring-ink dark:focus:ring-ink-dark text-ink dark:text-ink-dark placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary transition-colors duration-200"
            />
          </div>

          <textarea
            rows={5}
            placeholder="Message"
            required
            name="message"
            className="w-full px-3.5 py-2.5 text-sm bg-surface-raised dark:bg-surface-dark-raised border border-stroke dark:border-stroke-dark rounded-md focus:ring-1 focus:ring-ink dark:focus:ring-ink-dark text-ink dark:text-ink-dark placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary resize-none transition-colors duration-200"
          />

          <div className="flex items-center gap-4">
            <Button type="submit" variant="primary" disabled={formState.status === 'sending'}>
              {formState.status === 'sending' ? 'Sending...' : 'Send message'}
            </Button>
            {formState.message && (
              <span
                className={`text-sm ${
                  formState.status === 'error'
                    ? 'text-accent'
                    : 'text-ink-secondary dark:text-ink-dark-secondary'
                }`}
              >
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

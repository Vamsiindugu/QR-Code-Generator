// src/Contact.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "a98c25de-1969-496e-ae61-580fe57dca93");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Message sent successfully!");
        event.target.reset();
        setTimeout(() => setResult(""), 5000);
      } else {
        console.log("Error", data);
        setResult("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <motion.section
      id='contact'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className='w-full px-6 md:px-12 lg:px-24 py-20 bg-white dark:bg-[#010409] transition-colors duration-500'
    >
      <div className="max-w-4xl mx-auto">
        
        <motion.h4
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className='text-center mb-2 text-lg font-medium text-indigo-600 dark:text-indigo-400'
        >
          Connect with me
        </motion.h4>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className='text-center text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6'
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className='text-center text-gray-600 dark:text-gray-300 mb-12 text-lg max-w-2xl mx-auto'
        >
          I'd love to hear from you! I am always open to new opportunities. If you have any questions or feedback, please use the form below. Feel free to contact me.
        </motion.p>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className='space-y-6'
        >
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <motion.input
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              type='text'
              placeholder='Enter your name'
              required
              name='name'
              className='p-4 outline-none border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-[#030712] dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300'
            />

            <motion.input
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              type='email'
              placeholder='Enter your email'
              required
              name='email'
              className='p-4 outline-none border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-[#030712] dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300'
            />
          </div>

          <motion.textarea
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            rows='6'
            placeholder='Enter your message'
            required
            name='message'
            className='w-full p-4 outline-none border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-[#030712] dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300'
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            type='submit'
            className='py-4 px-10 mx-auto flex items-center justify-center gap-2 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-indigo-700 transition-all duration-300'
          >
            Submit now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>

          {result && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-center mt-4 text-lg font-medium text-gray-700 dark:text-gray-300'
            >
              {result}
            </motion.p>
          )}
        </motion.form>
      </div>

    <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-8 mx-auto flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300"
>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        Back to Top
        </motion.button>

    </motion.section>
);
};

export default Contact;
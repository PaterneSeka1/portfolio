/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'

export default function About () {
  const { theme } = useThemeStore()

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 transition-colors duration-700 
        ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 to-black text-white'
            : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'
        }`}
    >
      <motion.div
        className='absolute inset-0 -z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2 
          ${theme === 'dark' ? 'bg-indigo-600' : 'bg-blue-300'}`}
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mt-16'
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg w-52 h-52 md:w-64 md:h-64 bg-gray-200 dark:bg-gray-700'
        >
          <img
            src='/me.jpeg'
            alt='Profile photo'
            className='object-cover w-full h-full'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className='max-w-xl text-center md:text-left'
        >
          <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>About Me</h1>
          <p
            className={`text-lg leading-relaxed mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Hello, my name is{' '}
            <span className='font-semibold text-blue-500 dark:text-blue-400'>
              Paterne SEKA
            </span>
            . I am a developer passionate about creating modern, performant, and
            elegant web experiences.
            <br />
            <br />I love working with technologies like{' '}
            <span className='font-semibold'>Next.js, TailwindCSS</span> and{' '}
            <span className='font-semibold'>Framer Motion</span>. My goal is to
            design smooth and intuitive interfaces that combine aesthetics and
            performance.
            <br />
            <br />
            Outside of coding, I enjoy music, photography, and exploring new
            creative ideas.
          </p>

          <div className='mb-4'>
            <strong>Contacts:</strong>{' '}
            <a
              href='tel:+2250702418667'
              className='text-blue-500 hover:underline'
            >
              +225 07 02 41 86 67
            </a>{' '}
            /{' '}
            <a
              href='tel:+2250546670693'
              className='text-blue-500 hover:underline'
            >
              +225 05 46 67 06 93
            </a>
          </div>

          <div className='mb-4'>
            <strong>E-mail:</strong>{' '}
            <a
              href='mailto:sekapaterne25@gmail.com'
              className='text-blue-500 hover:underline'
            >
              sekapaterne25@gmail.com
            </a>{' '}
            /{' '}
            <a
              href='mailto:paterne.seka@epitech.eu'
              className='text-blue-500 hover:underline'
            >
              paterne.seka@epitech.eu
            </a>
          </div>

          <div className='mb-6'>
            <a
              href='https://wa.me/2250702418667'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-colors mr-2 mb-2'
            >
              Chat on WhatsApp
            </a>

            <motion.a
              href='/CV.pdf'
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-colors'
            >
              Download My CV
            </motion.a>
          </div>
        </motion.div>
      </motion.section>
    </main>
  )
}

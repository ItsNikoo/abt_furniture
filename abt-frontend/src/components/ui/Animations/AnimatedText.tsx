// components/AnimatedText.jsx
'use client';

import {motion, Variants} from 'framer-motion'

// Варианты анимации для каждого слова
const wordVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.2, // Задержка для i-го слова (i * 0.2 секунды)
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  // Разбиваем текст на массив слов
  const words = text.split(" ");

  return (
    <h1 className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          custom={index} // Передаем индекс в variants для расчета задержки
          style={{ display: 'inline-block', marginRight: '0.25em' }} // Чтобы пробелы не съедались
          className="inline-block mr-1" // Если используете Tailwind CSS
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
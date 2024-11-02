'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// ~~~~~~ Component

export default function AboutSection() {
  // ~~~~~~ Render

  return (
    <section id="about" className="bg-[#285238]">
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#18ff6def]"
        >
          About Bicycle shop
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 mb-4">
              At Bicycle shop, we&apos;re passionate about creating the perfect
              riding experience. Our team of expert engineers and designers work
              tirelessly to bring you cutting-edge bicycle technology that
              pushes the boundaries of performance and style.
            </p>
            <p className="text-lg text-gray-300">
              The Bicycle shop is the culmination of years of research and
              development, resulting in a bicycle that&apos;s not just a mode of
              transportation, but an extension of your lifestyle.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-64 relative"
          >
            <Image
              src="/images/about/pexels-gioele-fazzeri-.jpg"
              alt="Bicycle shop team"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg absolute"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

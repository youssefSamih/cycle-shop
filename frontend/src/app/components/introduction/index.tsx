'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {
  Tag,
  Bike,
  DollarSign,
  ChevronLeft,
  ShoppingBag,
  ChevronRight,
} from 'lucide-react';

// Images array
const images = [
  {
    src: '/images/image-gallery/bicycle1.jpg',
    alt: 'Mountain bike on rocky trail',
    caption:
      'Conquer the toughest trails with the Thunderbolt XT Mountain Bike',
  },
  {
    src: '/images/image-gallery/bicycle3.jpg',
    alt: 'City bike on a street',
    caption: 'Cruise through urban landscapes with the UrbanGlide City Cruiser',
  },
  {
    src: '/images/image-gallery/bicycle3.jpg',
    alt: 'Racing bike on open road',
    caption: 'Push the limits of speed with the VelocityPro Road Racer',
  },
  {
    src: '/images/image-gallery/bicycle5.jpg',
    alt: 'Electric bike in park',
    caption: 'Effortless commutes with the EcoDrive Electric Commuter',
  },
  {
    src: '/images/image-gallery/bicycle6.jpg',
    alt: 'Hybrid bike on a country road',
    caption: 'Versatility at its finest with the AllRoad Hybrid Bicycle',
  },
  {
    src: '/images/image-gallery/bicycle6.jpg',
    alt: 'Folding bike by the river',
    caption: 'Compact and portable, meet the FoldX Travel Bicycle',
  },
  {
    src: '/images/image-gallery/bicycle7.jpg',
    alt: 'Fat tire bike on snowy terrain',
    caption: 'Tackle any surface with the Avalanche Fat Tire Bike',
  },
  {
    src: '/images/image-gallery/bicycle8.jpg',
    alt: 'Kid riding a colorful bicycle',
    caption: 'Adventure for the young ones with the Kiddo Cruiser',
  },
  {
    src: '/images/image-gallery/bicycle9.jpg',
    alt: 'Touring bike on coastal highway',
    caption: 'Embark on long-distance journeys with the Horizon Touring Bike',
  },
];

// Key features array
const features = [
  {
    icon: Bike,
    title: 'Eco-Friendly',
    description: 'Zero emissions, 100% sustainable',
  },
  {
    icon: ShoppingBag,
    title: 'Convenient',
    description: 'Easy to use and maintain',
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective',
    description: 'Save money on transportation',
  },
  {
    icon: Tag,
    title: 'Stylish',
    description: 'Modern design that turns heads',
  },
];

// ~~~~~~ Component

export default function IntroductionSection() {
  // ~~~~~~ States

  const [currentSlide, setCurrentSlide] = useState(0);

  // ~~~~~~ Handlers

  function nextSlide() {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  }

  function prevSlide() {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  }

  // ~~~~~~ Effects

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // ~~~~~~ Render

  return (
    <section id="product" className="py-16 bg-[#285238]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#18ff6def]"
        >
          Introducing the Bicycle shop
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] overflow-hidden bg-gray-900 rounded-lg">
              <h2 className="absolute top-4 left-4 text-2xl font-bold z-10 tracking-wider text-white">
                OUR RECENT PHOTO GALLERY
              </h2>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity bg-black duration-500 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Image with Overlay */}
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      priority={index === 0}
                    />
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-8 left-4 right-4 mr-[100px] p-2 rounded">
                    <p className="text-base font-semibold text-white">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-[#2db53f] text-white hover:bg-[#138A36] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-[#2db53f] text-white hover:bg-[#138A36] transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl text-center font-semibold mb-4 text-[#18ff6def]">
              Key Features
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon
                    size={48}
                    className="mx-auto mb-4 text-[#18FF6D]"
                  />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

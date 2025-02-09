"use client";

import { useEffect, useRef, useState } from "react";
import style from "./corousel3D.module.css";
import img1 from "./../../public/img/landscape/landscape (1).jpg";
import img2 from "./../../public/img/landscape/landscape (2).jpg";
import img3 from "./../../public/img/landscape/landscape (3).jpg";
import img4 from "./../../public/img/landscape/landscape (4).jpg";
import img5 from "./../../public/img/landscape/landscape (5).jpg";

export default function Corousel3D() {
  const [selectedOption, setOption] = useState(2);
  const [isVisible, setIsVisible] = useState(true); // Track visibility
  const carouselRef = useRef<HTMLDivElement>(null); // Ref for the carousel

  // Restrict the selection within bounds
  function restrictFunction(value: number) {
    if (value === -1) value = 4;
    setOption((e) => value % 5);
  }

  function handleSelectionfunction(number: number) {
    return restrictFunction(number - 1);
  }

  function handleNext() {
    restrictFunction(selectedOption + 1);
  }

  function handlePrev() {
    setOption(selectedOption - 1);
  }

  // Set up the auto-slide animation
  useEffect(() => {
    if (!isVisible) return; // Pause animation if not visible
    const interval = setInterval(() => {
      restrictFunction(selectedOption + 1);
    }, 2000);
    return () => clearInterval(interval); // Cleanup interval
  }, [selectedOption, isVisible]);

  // Observe visibility using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Update visibility
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  return (
    <div ref={carouselRef} className="w-full flex">
      <button
        className="text-white text-4xl bg-gray-500 px-2 rounded-md"
        onClick={handlePrev}
      >
        &larr;
      </button>
      <section id={style.slider} className="w-full items-center justify-center">
        <input
          type="radio"
          name="slider"
          value={0}
          id={style.s1}
          checked={selectedOption === 0}
          onClick={() => handleSelectionfunction(1)}
          onChange={() => {}}
          className="hidden"
        />
        <input
          type="radio"
          name="slider"
          value={1}
          id={style.s2}
          checked={selectedOption === 1}
          onClick={() => handleSelectionfunction(2)}
          onChange={() => {}}
          className="hidden"
        />
        <input
          type="radio"
          name="slider"
          value={2}
          id={style.s3}
          checked={selectedOption === 2}
          onClick={() => handleSelectionfunction(3)}
          onChange={() => {}}
          className="hidden"
        />
        <input
          type="radio"
          name="slider"
          value={3}
          id={style.s4}
          checked={selectedOption === 3}
          onClick={() => handleSelectionfunction(4)}
          onChange={() => {}}
          className="hidden"
        />
        <input
          type="radio"
          name="slider"
          value={4}
          id={style.s5}
          checked={selectedOption === 4}
          onClick={() => handleSelectionfunction(5)}
          onChange={() => {}}
          className="hidden"
        />
        <label htmlFor="s1" id={style.slide1} className="rounded-sm">
          <img
            src={`${img1.src}`}
            alt="img1"
            className="w-full h-full object-cover"
          />
        </label>
        <label htmlFor="s2" id={style.slide2} className="rounded-sm">
          <img
            src={`${img2.src}`}
            alt="img2"
            className="w-full h-full object-cover"
          />
        </label>
        <label htmlFor="s4" id={style.slide4} className="rounded-sm">
          <img
            src={`${img3.src}`}
            alt="img3"
            className="w-full h-full object-cover"
          />
        </label>
        <label htmlFor="s3" id={style.slide3} className="rounded-sm">
          <img
            src={`${img4.src}`}
            alt="img4"
            className="w-full h-full object-cover"
          />
        </label>
        <label htmlFor="s5" id={style.slide5} className="rounded-sm">
          <img
            src={`${img5.src}`}
            alt="img5"
            className="w-full h-full object-cover"
          />
        </label>
      </section>
      <button
        className="text-white text-4xl bg-gray-500 px-2 rounded-md"
        onClick={handleNext}
      >
        &rarr;
      </button>
    </div>
  );
}

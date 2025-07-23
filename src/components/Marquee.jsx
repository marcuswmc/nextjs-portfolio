'use client'

import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(Observer);

const ImageMarquee = ({
  images,
  className = "bg-black",
  reverse = false,
  speed = 1,
  imageWidth = 200,
  imageHeight = 100,
  imageClassName = "object-contain grayscale hover:grayscale-0 transition duration-300",
  gap = 60, // Espaçamento entre imagens
}) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;

    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });
    
    gsap.set(items, { x: 0 });
    
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
        
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    const tl = horizontalLoop(itemsRef.current, {
      repeat: -1,
      speed: speed,
      paddingRight: gap,
      reversed: reverse,
    });

    // Observer para interação com scroll
    const observer = Observer.create({
      onChangeY(self) {
        let factor = 2.5;
        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
          factor *= -1;
        }
        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
          })
          .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
      },
    });

    return () => {
      tl.kill();
      observer.kill();
    };
  }, [images, reverse, speed, gap]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-32 md:h-40 flex items-center ${className}`}
    >
      <div className="flex items-center h-full" style={{ gap: `${gap}px` }}>
        {images.map((imageSrc, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
          >
            <Image
              src={imageSrc}
              alt={`Brand ${index + 1}`}
              width={imageWidth}
              height={imageHeight}
              className={imageClassName}
              quality={100}
              priority={index < 5} // Prioridade para as primeiras imagens
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageMarquee;
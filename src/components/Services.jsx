import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Services.css';

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

  const services = [
    {
      title: 'Web Development',
      description:
        'Building modern, responsive websites and web applications with clean code and attention to detail.',
    },
    {
      title: 'UI/UX Design',
      description:
        'Creating intuitive user interfaces that combine aesthetics with functionality for seamless experiences.',
    },
    {
      title: 'Animation & Interactions',
      description:
        'Implementing smooth animations and micro-interactions that bring digital products to life.',
    },
    {
      title: 'API Development',
      description:
        'Designing and building RESTful APIs with robust architecture and efficient data handling.',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    const serviceItems = listRef.current.querySelectorAll('.service-item');
    gsap.fromTo(
      serviceItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services-container">
        <h2 ref={titleRef} className="section-title">
          What I'm Good At
        </h2>

        <div className="services-list" ref={listRef}>
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

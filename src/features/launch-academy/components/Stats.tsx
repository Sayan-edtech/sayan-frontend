import { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: number;
  suffix: string;
  duration?: number;
}

function Counter({ target, suffix, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, target, duration]);

  return (
    <div
      ref={counterRef}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-card-foreground"
    >
      {count}
      <span className="text-card-foreground">
        {suffix.includes("+") ? (
          <>
            {suffix.replace("+", "")}
            <span className="text-primary">+</span>
          </>
        ) : (
          <span className="text-primary">{suffix}</span>
        )}
      </span>
    </div>
  );
}

function Stats() {
  const stats = [
    {
      target: 100,
      suffix: "+",
      title: "أكاديميات متنوعة تتوزع",
      subtitle: "في مختلف المجالات",
    },
    {
      target: 2,
      suffix: "K+",
      title: "ساعات تعليمية مكثفة",
      subtitle: "",
    },
    {
      target: 1,
      suffix: "+",
      title: "دورة إلكترونية مباعة",
      subtitle: "",
    },
    {
      target: 5,
      suffix: "k+",
      title: "طالب مسجل في منصتنا",
      subtitle: "",
    },
  ];

  return (
    <section className="pb-14 sm:pb-20 bg-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="grid grid-cols-2 gap-8 order-1 lg:order-none">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <Counter
                target={stat.target}
                suffix={stat.suffix}
                duration={2000 + index * 200}
              />
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
                {stat.title}
              </h3>
              {stat.subtitle && (
                <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-right">
          <div className="bg-[#F9F9FF] rounded-[20px] w-20 h-20 element-center mb-5">
            <img
              src="/assets/images/launch-academy/medal.png"
              alt="Medal Icon"
              className="w-12 h-12"
              loading="lazy"
            />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-card-foreground mb-5 leading-tight">
            إنجازاتنا في أرقام
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            في منصة سيان، نفخر بإنجازاتنا المتميزة
          </p>
        </div>
      </div>
    </section>
  );
}

export default Stats;

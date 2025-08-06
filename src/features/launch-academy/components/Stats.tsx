import { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: number;
  suffix: string;
}

function Counter({ target, suffix }: CounterProps) {
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

    const duration = 2000;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * target);

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
  }, [isVisible, target]);

  return (
    <div
      ref={counterRef}
      className="text-4xl md:text-5xl font-bold text-foreground"
    >
      {count}<span className="text-primary">{suffix}</span>
    </div>
  );
}

function Stats() {
  const stats = [
    {
      target: 1000,
      suffix: "+",
      title: "أكاديمية نشطة",
    },
    {
      target: 50,
      suffix: "K+",
      title: "ريال تم تحقيقها شهرياً",
    },
    {
      target: 15,
      suffix: "K+",
      title: "دورة تم إنشاؤها",
    },
    {
      target: 100,
      suffix: "K+",
      title: "طالب يتعلم",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="bg-primary/10 rounded-2xl w-20 h-20 flex items-center justify-center mb-6">
              <img
                src="/assets/images/launch-academy/medal.png"
                alt="Medal Icon"
                className="w-12 h-12"
                loading="lazy"
              />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary">نجاحات</span> منشئي الأكاديميات
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              انضم إلى آلاف منشئي المحتوى الذين حولوا خبراتهم إلى دخل شهري مستدام عبر منصة سيان.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-border">
                <Counter target={stat.target} suffix={stat.suffix} />
                <h3 className="text-lg font-semibold text-foreground mt-4">
                  {stat.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;

import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      style={{
        background: "linear-gradient(to bottom, #1e5fff, #87ceeb, #f0f8ff)",
      }}
      className="pt-40"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <div className="flex flex-col gap-6 py-10 lg:py-24">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              تعليم يفتح افاق المستقبل
            </h1>
            <p className="text-lg text-muted-foreground">
              سيان تقدم لكم تجربة تعليمية متطورة معززة بالذكاء الاصطناعي أنشئ
              منصتك التعليمية لبيع محتواك التعليمي بسهولة.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/auth/signup"
                className={`${buttonVariants({ size: "lg" })}`}
              >
                انضم الان
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/assets/images/home/hero.png"
              alt="Hero"
              loading="eager"
              className="w-full min-h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

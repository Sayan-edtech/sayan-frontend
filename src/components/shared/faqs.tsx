import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

function FAQs({
  faqItems,
}: {
  faqItems: { id: string; question: string; answer: string }[];
}) {
  return (
    <section className="py-14 sm:py-20 relative">
      <div
        style={{
          background:
            "linear-gradient(136.72deg, rgba(0, 255, 206, 0.1) -16.9%, rgba(255, 255, 255, 0.173594) 34.08%, rgba(255, 255, 255, 0) 135.36%)",
        }}
        className="absolute inset-0 z-[-1] rotate-180"
      ></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between mb-10">
          <div className="md:w-2/5 mb-10 md:mb-0 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground flex items-end gap-2">
              <span className="leading-tight">
                الأسئلة <br />
                الشائعة
              </span>
              <span className="text-primary text-7xl ml-4">؟</span>
            </h2>
            <div
              style={{ background: "rgba(0, 98, 255, 0.15)" }}
              className="flex justify-center rounded-[16px] w-fit px-4 sm:px-8 py-4 gap-4"
            >
              <img
                src="/assets/icons/sound.svg"
                alt="Icon"
                className="w-6 h-6"
                loading="lazy"
              />
              <span className="text-lg font-medium text-foreground">
                إذا لديك سؤال اطلب دعم فني
              </span>
            </div>
          </div>
          <div className="md:w-3/5">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  style={{ boxShadow: "0px 0px 25px rgba(0, 60, 86, 0.03)" }}
                  className="mb-4 bg-white rounded-[32px] overflow-hidden border-none [&>div>svg]:hidden !shadow-sm"
                >
                  <AccordionTrigger className="text-base sm:text-lg text-foreground md:text-xl font-medium py-6 px-6 text-right group">
                    <div className="flex flex-row-reverse justify-between items-center w-full">
                      <div className="h-10 w-10 bg-[#F7F7FF] rounded-full element-center group-data-[state=open]:bg-primary group-data-[state=open]:text-white group-data-[state=open]:rotate-180 transition-all duration-200">
                        <ChevronDown />
                      </div>
                      <span className="flex-1">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 pb-6 pt-0 text-right leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQs;

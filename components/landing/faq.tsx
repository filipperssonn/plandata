import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/constants"

export function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Vanliga frågor
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Svar på de frågor vi får oftast
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 dark:text-white hover:text-primary dark:hover:text-accent py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-300 text-base leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

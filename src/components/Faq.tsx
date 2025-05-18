import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Faq() {
  return (
    <div className="w-full container mx-auto px-4 py-8 md:py-12">
      <h2 className="text-xl md:text-[32px] font-bold mb-6">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full space-y-4 ">
        <AccordionItem value="item-1" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4  text-[18px]  text-left font-medium">Are your rooms fully private?</AccordionTrigger>
          <AccordionContent className="pb-4 pt-1   text-lg">
            Yes, all our rooms are fully private and secure. Each room has its own lock and key for your privacy and
            safety.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4  text-[18px] text-left font-medium">
            I do not have my own Netflix account.
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1  text-lg">
            No worries! We provide complimentary access to streaming services including Netflix in all our rooms for
            your entertainment.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4  text-[18px] text-left font-medium">
            What is your check in process? How does it work?
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1  text-lg">
            Our check-in process is simple. Arrive at the designated time, present your ID and booking confirmation, and
            our staff will guide you to your room and provide all necessary information.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4  text-[18px] text-left font-medium">Where are you guys located?</AccordionTrigger>
          <AccordionContent className="pb-4 pt-1  text-lg">
            We are located at [Your Address]. We&ldquo;re conveniently situated near public transportation and major
            attractions in the area.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4  text-[18px] text-left font-medium">
            Do you allow walk in? or cash payment?
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1  text-lg">
            Yes, we accept walk-ins based on availability. We accept both cash and card payments for your convenience.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4  text-[18px] text-left font-medium">
            What happens if we mess/spoil items?
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1  text-lg">
            We understand accidents happen. Minor damages are covered, but significant damage may incur additional
            charges. We encourage guests to report any incidents promptly.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

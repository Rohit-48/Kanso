import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Is this a package I install?</AccordionTrigger>
        <AccordionContent>
          No. You copy the source into your project and own it from then on.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Interactive parts are built on Radix, which follows the WAI-ARIA
          patterns.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I change the styles?</AccordionTrigger>
        <AccordionContent>
          Yes. Edit the Tailwind classes, or change the CSS variables to retheme
          everything.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

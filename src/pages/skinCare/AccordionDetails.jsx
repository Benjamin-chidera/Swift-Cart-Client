/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AccordionDetails = ({ details }) => {
  return (
    <main>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
           {details?.details}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent>
            {details?.shipping}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Returns</AccordionTrigger>
          <AccordionContent>
           {details?.returns}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

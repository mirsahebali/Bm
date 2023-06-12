"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
export default function Page() {
  return (
    <Accordion allowToggle>
      <AccordionItem border={"none"}>
        <h2>
          <AccordionButton
            rounded={"xl"}
            _expanded={{ bg: "#04293A", color: "white" }}
          >
            <div className="flex justify-center items-center">Boards</div>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <div>hello</div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

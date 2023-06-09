"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

"use client";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  Input,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import { Key, KeyboardEvent } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
export default function SlideEx() {
  const { isOpen, onToggle } = useDisclosure();

  const handler = (event: KeyboardEvent<HTMLButtonElement>) => {
    console.log("pressed", event.key);

    if (event.key === "s" || event.key === "S") {
      onToggle();
    }
  };
  return (
    <>
      <button
        onClick={onToggle}
        onKeyDown={(event) => handler(event)}
        className="relative right-0"
      >
        <BsFillSearchHeartFill />
      </button>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="cyan.700"
          rounded="md"
          shadow="md"
          className="dark:text-white"
        >
          <Input
            p={2}
            placeholder="search..."
            rounded={"full"}
            size="l"
            color={`white`}
          />
        </Box>
      </Slide>
    </>
  );
}

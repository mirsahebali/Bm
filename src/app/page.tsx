"use client";
import { Tab } from "@headlessui/react";

export default function Page() {
  return (
    <div>
      <Tab.Group>
        <Tab.List>
          <Tab></Tab>
          <Tab></Tab>
          <Tab></Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  );
}

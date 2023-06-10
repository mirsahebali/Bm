"use client";
import { FormEventHandler, useState } from "react";
import { Combobox } from "@headlessui/react";
const workspace: Array<{ name: string; id: number }> = [
  {
    id: 1,
    name: "workspace1",
  },
  {
    id: 2,
    name: "workspace2",
  },
  {
    id: 3,
    name: "workspace3",
  },
  {
    id: 4,
    name: "workspace4",
  },
  {
    id: 5,
    name: "workspace5",
  },
];
export default function WorkspaceSelect() {
  let defaultWs = workspace[0];
  const [selected, setSelected] = useState(defaultWs);
  const [query, setQuery] = useState("");
  return (
    <Combobox value={selected} onChange={setSelected}>
      <Combobox.Input onChange={(e) => setQuery(e.target.value)} />
      <Combobox.Options></Combobox.Options>
    </Combobox>
  );
}

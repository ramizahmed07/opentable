"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?location=${location}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-left text-lg py-3 m-auto flex justify-center"
    >
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="rounded mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
      />
      <button className="rounded bg-red-600 px-9 py-2 text-white">
        Let's go
      </button>
    </form>
  );
}

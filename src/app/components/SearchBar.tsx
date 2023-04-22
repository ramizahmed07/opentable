"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?city=${city}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-left text-lg py-3 m-auto flex justify-center"
    >
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
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

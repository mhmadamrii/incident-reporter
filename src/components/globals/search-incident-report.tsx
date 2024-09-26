"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { debounce } from "~/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export function SearchIncidentReport() {
  // const router = useRouter();
  // const [_, setSearchTerm] = useState("");

  // const debouncedSearch = useCallback(
  //   debounce((value: string) => {
  //     router.push(`/?search=${encodeURIComponent(value)}`);
  //   }, 300),
  //   [router],
  // );

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   debouncedSearch(value);
  // };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [_, setSearchTerm] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      router.push(`${pathname}?${createQueryString("search", value)}`, {
        scroll: false,
      });
    }, 300),
    [router, pathname, createQueryString],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex w-full items-center gap-2 sm:w-1/2">
      <Input
        type="text"
        placeholder="Search incidents"
        className="rounded-md bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        onChange={handleSearchChange}
      />
      <Button className="h-full w-1/4">Search</Button>
    </div>
  );
}

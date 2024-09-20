"use client";

import Groq from "groq-sdk";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import { env } from "~/env";

export function GroqUi() {
  const [prompt, setPrompt] = useState("");
  const [resultCompletion, setResultCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const client = new Groq({
  //   apiKey: env.GROQ_API_KEY, // This is the default and can be omitted
  //   dangerouslyAllowBrowser: true,
  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // setIsLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // const response = await client.chat.completions.create({
    //   messages: [{ role: "user", content: prompt }],
    //   model: "llama3-8b-8192",
    // });
    // if (response?.choices?.[0]?.message?.content) {
    //   setIsLoading(false);
    //   setResultCompletion(response.choices[0].message.content);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">Groq AI</h1>
      <p className="text-lg">
        This is a simple UI for Groq, a clever ai in your browser.
      </p>
      <form
        className="flex w-full flex-col items-center justify-center gap-3"
        onSubmit={handleSubmit}
      >
        <Textarea
          className="w-full sm:w-1/2"
          disabled={isLoading}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
        <Button disabled={isLoading} className="w-full sm:w-1/2" type="submit">
          {isLoading ? "Loading..." : "Generate"}
        </Button>
      </form>
      <Button onClick={() => console.log("env", process.env.TESTING_KEY)}>
        Reveal your key
      </Button>
      {isLoading ? (
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <Skeleton className="h-8 w-[500px] border" />
          <Skeleton className="h-5 w-[500px] border" />
        </div>
      ) : (
        <div className="w-full rounded-sm border p-2 sm:w-1/2">
          <p className="text-base">{resultCompletion}</p>
        </div>
      )}
    </div>
  );
}

import { userAgent } from "next/server";
import Boids from "./Boids";
import Tape from "./Tape";
import B8 from "@/components/b8/B8";
import FirefoxPerformanceWarning from "./FirefoxPerformanceWarning";

export default function Home() {
  return (
    <main>
      <section className="h-lvh flex flex-col justify-center snap-center items-center overflow-hidden relative">
        <span className="w-96 h-96">
          <B8 variant="auto" animated />
        </span>
      </section>
      <section className="h-lvh w-full snap-center relative md:p-16 p-8 flex flex-col">
        <h1 className="self-center absolute top-4 text-lg">
          <strong className="font-semibold">Boids</strong> - moving objects with swarm behaviour
        </h1>
        <div className="relative border rounded-3xl h-full overflow-hidden ">
          <Boids />
        </div>
        <p className="absolute bottom-8 left-18 text-zinc-700 dark:text-zinc-300">
          ⓘ add points by clicking on the canvas <FirefoxPerformanceWarning />
        </p>
      </section>
      <section className="h-lvh flex flex-col justify-center snap-center items-center overflow-hidden relative">
        <Tape angleInDeg={12} />
        <Tape angleInDeg={-35} reversed />
        <Tape className="translate-x-36" angleInDeg={-12} reversed />
        <p className="absolute bottom-24 text-lg">check back soon™ for new projects!</p>
      </section>
    </main>
  );
}

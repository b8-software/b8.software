import Tape from "./Tape";
import B8 from "@/components/b8/B8";

export default function Home() {
  return (
    <main>
      <section className="h-dvh flex flex-col justify-center snap-center items-center">
        <span className="w-96 h-96">
          <B8 variant="auto" animated />
        </span>
      </section>
      <section className="h-dvh flex flex-col justify-center snap-center items-center overflow-hidden relative">
        <Tape className="rotate-12" />
        <Tape className="-rotate-35" reversed />
        <Tape className="-rotate-12 translate-x-36" reversed />
        <p className="absolute bottom-4 text-lg">check back soon™ for new projects!</p>
      </section>
    </main>
  );
}

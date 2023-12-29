import Tape from "./Tape";
import B8 from "@/components/b8/B8";

export default function Home() {
  return (
    <main>
      <section className="h-lvh flex flex-col justify-center snap-center items-center overflow-hidden">
        <span className="w-96 h-96">
          <B8 variant="auto" animated />
        </span>
      </section>
      <section className="h-lvh flex flex-col justify-center snap-center items-center overflow-hidden relative">
        <Tape angleInDeg={12} />
        <Tape angleInDeg={-35} reversed />
        <Tape className="translate-x-36" angleInDeg={-12} reversed />
        <p className="absolute bottom-12 text-lg">check back soon™ for new projects!</p>
      </section>
    </main>
  );
}

import Boids from "./Boids";
import Tape from "./Tape";
import B8 from "@/components/b8/B8";

export default function Home() {
  return (
    <main>
      <section className="h-lvh flex flex-col justify-center snap-center items-center overflow-hidden relative">
        <span className="w-96 h-96">
          <B8 variant="auto" animated />
        </span>
      </section>
      <section className="h-lvh w-full snap-center relative md:p-16 p-8">
        <div className="relative border rounded-3xl h-full overflow-hidden ">
          <Boids />
        </div>
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

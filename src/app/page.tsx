import Image from "next/image";
import Tape from "./Tape";

export default function Home() {
  return (
    <main>
      <section className="h-dvh flex flex-col justify-center snap-center items-center">
        <Image
          src="/media/b8-light.svg"
          width={256}
          height={256}
          alt="b8 light logo"
          className="hidden dark:block"
        />
        <Image
          src="/media/b8-dark.svg"
          width={256}
          height={256}
          alt="b8 dark logo"
          className="dark:hidden"
        />
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

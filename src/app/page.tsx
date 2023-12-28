import Image from "next/image";

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
      <section className="h-dvh flex flex-col justify-center snap-center items-start overflow-hidden">
        <div className="-rotate-12 bg-striped-black bg-yellow-400 py-4 animate-tape origin-left dark:text-zinc-950">
          <div className="bg-yellow-400 flex gap-24 p-1 overflow-visible px-12">
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
            <p className="p-1 rounded-sm whitespace-nowrap w-24">under construction</p>
          </div>
        </div>
      </section>
    </main>
  );
}

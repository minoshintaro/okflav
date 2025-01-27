import { PencilIcon } from "@heroicons/react/24/solid";

export function Detail() {
  return (
    <div className="relative flex flex-col gap-y-4">
      <header className="z-10 absolute right-0 flex flex-col-reverse gap-2 font-mincho [writing-mode:vertical-rl]">
        <h1 className="text-6xl">八海山</h1>
        <h2 className="mt-1 text-2xl">純米大吟醸 雪室貯蔵三年</h2>
      </header>

      <div className="mt-2 bg-gradient-to-t border-15 border-white from-[#fbc2eb] to-[#a6c1ee] aspect-square w-full rounded-full"></div>

      <p className="text-xl/8 font-mincho">落ち着いた辛口の中に甘み。スッキリではなくしっかり（でもどっしりではない）、硬質だか角は丸い印象雑味はなく、全体を通じて味わいあり。何かに喩える対象はなく、素直に日本酒。後味にカラメル感。上の方にアルコール感がある。</p>

      <footer className="flex gap-2 items-center justify-end">
        <p>minos</p>
        <PencilIcon className="size-6" />
      </footer>

    </div>
  );
}



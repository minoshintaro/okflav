import { PencilIcon } from "@heroicons/react/24/solid";

export function Detail() {
  return (
    <div className="relative flex flex-col gap-y-4">
      <header className="absolute right-0 z-10 aspect-square w-full font-mincho [writing-mode:vertical-rl]">
        <div className="flex flex-col-reverse gap-2">
          <h1 className="text-6xl">亀齢</h1>
          <h2 className="mt-1 text-2xl">辛口純米</h2>
        </div>
        <p className="absolute left-0 bottom-0 text-2xl">広島</p>
      </header>

      <div className="mt-2 bg-gradient-to-t border-15 border-white from-[#fbc2eb] to-[#a6c1ee] aspect-square w-full rounded-full"></div>

      <p className="text-xl/8 font-mincho">落ち着いた辛口の中に甘み。スッキリではなくしっかり（でもどっしりではない）、硬質だか角は丸い印象雑味はなく、全体を通じて味わいあり。何かに喩える対象はなく、素直に日本酒。後味にカラメル感。上の方にアルコール感がある。</p>

      <footer className="flex gap-4 items-center justify-end">
        <p>minos</p>
        <PencilIcon className="size-6" />
      </footer>

    </div>
  );
}



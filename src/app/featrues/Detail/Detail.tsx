import { Color } from "../../components/Color";
import { IconLink } from "../../components/IconLink";

type DetailProps = {
  brandName: string;
  productName: string;
  area: string;
  starColor: string;
  endColor: string;
  content: string;
  userName: string;
};

export function Detail({ brandName, productName, area, starColor, endColor, content, userName }: DetailProps) {
  return (
    <div className="relative flex flex-col gap-y-4">
      <header className="absolute right-0 z-10 aspect-square w-full font-mincho [writing-mode:vertical-rl]">
        <div className="flex flex-col-reverse gap-2">
          <h1 className="text-6xl">{brandName}</h1>
          <h2 className="mt-1 text-2xl">{productName}</h2>
        </div>
        <p className="absolute left-0 bottom-0 text-2xl">{area}</p>
      </header>

      <Color startColor={starColor} endColor={endColor} />
      <p className="text-xl/8 font-serif">{content}</p>

      <footer className="flex gap-4 items-center justify-end">
        <p>{userName}</p>
        <IconLink to="/edit" icon="edit" />
      </footer>
    </div>
  );
}



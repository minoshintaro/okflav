
const products = [
  { id: 1, name: '八海山', description: '純米大吟醸 雪室貯蔵三年', area: '新潟' },
  { id: 2, name: '獺祭', description: '純米大吟醸 磨き二割三分 遠心分離', area: '山口' },
  { id: 3, name: '雪男', description: '純米酒', area: '新潟' },
  { id: 4, name: '酔鯨', description: '特別純米酒', area: '高知' },
  { id: 5, name: 'あさ開', description: '純米酒 黄ラベル', area: '岩手' },
  { id: 6, name: '亀齢', description: '辛口純米', area: '広島' },
];

export function Collection() {
  return (
    <div className="relative flex flex-row-reverse gap-4">
      {products.map((product) => (
        <a href="#" key={product.id} className="flex flex-row gap-４ font-mincho items-center [writing-mode:vertical-rl]">
          <p className="text-4xl">{product.name}</p>
          <p className="mt-1 text-xl">{product.description}</p>
          <p className="mt-1 text-xl">（{product.area}）</p>
        </a>
      ))}
    </div>
  );
}

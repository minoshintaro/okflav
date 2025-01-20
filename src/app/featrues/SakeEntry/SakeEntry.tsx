import * as React from 'react';
import { fetchData } from '../../../utils/fetchData';
import { SuggestionList, SuggestionListProps } from '../../components/SuggestionList';
import { TextField, TextFieldProps } from '../../components/TextField';
import type { Sakenowa } from '../../../types';

// type SakeEntryProps = {
//   data: string[];
// }

export function SakeEntry() {
  const [brandName, setBrandName] = React.useState('');
  const [subName, setSubName] = React.useState('');
  const [brandList, setBrandList] = React.useState<string[]>([]);

  // 初回レンダリング時
  React.useEffect(() => {
    async function setFetchedData() {
      const data = await fetchData<Sakenowa.BrandData>('/api/sakenowa/brands');
      if (!data) return;
      const brandNames = data.brands.map((brand) => brand.name);
      setBrandList(brandNames);
    }
    setFetchedData();
  }, []);

  const handleBrandName: TextFieldProps['onValueChange'] = (value, event) => {
    if (typeof value === 'string') {
      setBrandName(value);
    }
    console.log('Event:', event.target);    // イベントオブジェクト
  };

  const handleSubName: TextFieldProps['onValueChange'] = (value, event) => {
    if (typeof value === 'string') {
      setSubName(value);
    }
    console.log('Event:', event.target);    // イベントオブジェクト
  };

  const handleBrandList: SuggestionListProps['onValueChange'] = (value) => {
    setBrandName(value);
  }

  return (
    <div className="space-y-4">
      <div>
        <TextField
          label="銘柄"
          value={brandName}
          placeholder="例：八海山"
          onValueChange={handleBrandName}
        />

        <SuggestionList
          list={brandList}
          target={brandName}
          placeholder="銘柄"
          onValueChange={handleBrandList}
        />
      </div>

      <div>
        <TextField
          label="造り"
          value={subName}
          placeholder="例：純米大吟醸 雪室貯蔵三年"
          onValueChange={handleSubName}
        />
      </div>
    </div>
  );
}

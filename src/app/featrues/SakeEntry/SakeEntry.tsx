import * as React from 'react';
import { useAtom } from 'jotai';
import { brandListAtom } from '../../store/atom';
import { InputField } from "../../components/InputField";
import { SuggestionList, SuggestionListProps } from '../../components/SuggestionList';
import { TextField, TextFieldProps } from '../../components/TextField';
import { BrandSelector } from './components/BrandSelector';
import { ProductFields } from './components/ProductFields';
import type { Database, Sakenowa } from '../../../types';

// type SakeEntryProps = {
//   data: string[];
// }

export function SakeEntry() {
  const [brandName, setBrandName] = React.useState('');
  const [subName, setSubName] = React.useState('');
  const [brandList, setBrandList] = useAtom(brandListAtom);

  // 初回レンダリング時
  // React.useEffect(() => {
  //   async function setFetchedData() {
  //     const data = await fetchData<{rows: Database.Brand[]}>('/api/brands');
  //     // const data = await fetchData<Sakenowa.BrandData>('/api/sakenowa/brands');
  //
  //     if (!data) return;
  //
  //     const brandNames = data.rows.map((brand) => brand.name);
  //     setBrandList(brandNames);
  //   }
  //   setFetchedData();
  // }, []);

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

      <div>
        <ul>
          {brandList.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <BrandSelector />
        <InputField label="造り" placeholder="例：純米大吟醸 雪室貯蔵三年"></InputField>

      </div>
    </div>
  );
}

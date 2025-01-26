import { Sakenowa } from '../../../types';
import { useState, useEffect } from 'react'
import { SAKENOWA_ENDPOINT } from '../../../constants';
import { getData } from '../../../utils/fetchData';
import { TextField, TextFieldProps } from '../../components/TextField'

const cache: Sakenowa.Brand[] = [];

export function BrandField() {
  const [text, setText] = useState<string>('');
  const [brands, setBrands] = useState<Sakenowa.Brand[]>(cache);

  useEffect(() => {
    const fetchBrandData = async () => {
      if (cache.length === 0) {
        try {
          const brandData = await getData<Sakenowa.BrandData>(`${SAKENOWA_ENDPOINT}/brands`);
          if (brandData) {
            cache.push(...brandData.brands);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchBrandData();
  }, []);


  const handleValueChange: TextFieldProps['onValueChange'] = (value, event) => {
    if (typeof value === 'string') {
      setText(value);
    }
    console.log('Event:', event.target);    // イベントオブジェクト
  };

  return (
    <>
      <p>Test</p>
      <TextField
        label="銘柄"
        value={text}
        placeholder="例：八海山"
        onValueChange={handleValueChange}
      />
    </>
  );
}

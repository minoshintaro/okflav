import * as React from 'react';
import { Select } from '@base-ui-components/react/select';
import { findMatchingItems } from '../../../utils/findMatchingItems';
import { ArrowSvg, ChevronUpDownIcon, CheckIcon } from './Icons';
import styles from './SuggestionList.module.css';

export type SuggestionListProps = {
  list: string[];
  target: string;
  placeholder: string;
  onValueChange: Select.Root.Props<string>['onValueChange'];
}

export function SuggestionList({ list, target, placeholder, onValueChange }: SuggestionListProps) {
  const filteredList = React.useMemo(() => {
    if (list.length === 0) return ['データがありません'];
    if (!target) return list.slice(0, 100);

    const matchedItems = findMatchingItems(list, target);
    return matchedItems.length > 0 ? matchedItems : ['入力してください'];
  }, [target, list]);

  console.log('filteredList:', list.length, filteredList.length);

  return (
    <Select.Root modal={false} onValueChange={onValueChange}>
      <Select.Trigger className={styles.Select}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={styles.SelectIcon}>
          <ChevronUpDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner className={styles.Positioner} sideOffset={8}>
          <Select.Popup className={styles.Popup}>
            <Select.Arrow className={styles.Arrow}>
              <ArrowSvg />
            </Select.Arrow>

            {filteredList.map((item, index) => (
              <Select.Item className={styles.Item} value={item} key={index}>
                <Select.ItemIndicator className={styles.ItemIndicator}>
                  <CheckIcon className={styles.ItemIndicatorIcon} />
                </Select.ItemIndicator>
                <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
              </Select.Item>
            ))}

          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

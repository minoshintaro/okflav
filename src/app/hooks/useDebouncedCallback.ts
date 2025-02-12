import * as React from 'react';

type TimeoutId = ReturnType<typeof setTimeout> | null;

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  immediate = false
) {
  // タイマーの参照を保持
  const timerRef = React.useRef<TimeoutId>(null);

  // デバウンスコールバック
  const debouncedCallback = React.useCallback(
    (...args: Parameters<T>) => {
      // 既存のタイマーをクリア
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (immediate && !timerRef.current) {
        callback(...args);
      }

      // 新しいタイマーをセット
      timerRef.current = setTimeout(() => {
        callback(...args);
        timerRef.current = null; // 実行後にリセット
      }, delay);
    },
    [callback, delay, immediate]
  );

  // コンポーネントのアンマウント時にクリーンアップ
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // キャンセル機能の提供
  const cancel = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return { debouncedCallback, cancel };
}

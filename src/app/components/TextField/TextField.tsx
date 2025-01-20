import { Field } from '@base-ui-components/react/field';
import styles from './TextField.module.css';

export type TextFieldProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  description?: string;
  onValueChange?: Field.Control.Props['onValueChange'];
};

export function TextField({
  label,
  value,
  placeholder,
  error,
  description,
  onValueChange,
}: TextFieldProps) {
  return (
    <Field.Root className={styles.Field}>
      <Field.Label className={styles.Label}>{label}</Field.Label>

      <Field.Control
        value={value}
        placeholder={placeholder}
        className={styles.Input}
        onValueChange={onValueChange}
      />

      <Field.Error className={styles.Error} match="valueMissing">
        {error}
      </Field.Error>

      <Field.Description className={styles.Description}>
        {description}
      </Field.Description>
    </Field.Root>
  );
}

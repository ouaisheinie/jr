import { Select } from "antd";
import { Raw } from "type";

const Option = Select.Option;
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
/**
 * value 可以传入多种类型的值
 * onChange只会回调number 或者 undefined
 * 当 isNaN(number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Option value={undefined}>{defaultOptionName}</Option>
      ) : null}
      {options?.map((option) => (
        <Option value={option.id} key={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

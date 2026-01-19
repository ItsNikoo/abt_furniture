import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


interface GenericSelectorProps<T extends { id: number; value: string }> {
  items: T[],
  currentValue: string,
  onChange: (value: string) => void,
  label: string,
  allLabel: string,
  placeholder?: string,
  className?: string
}

export function GenericSelector<T extends { id: number; value: string }>(
  {
    items,
    currentValue,
    onChange,
    label,
    placeholder,
    allLabel,
  }: GenericSelectorProps<T>) {
  function handleValueChange(value: string) {
    onChange(value === "all" ? "" : value)
  }

  return (
    <div className="flex flex-col">
      <Label className="text-xs text-gray-500">{label}</Label>
      <Select value={currentValue || "all"} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full sm:w-[200px] h-10">
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allLabel}</SelectItem>
          {items && items.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Label} from "@/components/ui/label";

type SortSelectorProps = {
  currentSort: "default" | "asc" | "desc"
  setCurrentSort: (value: "default" | "asc" | "desc") => void
}

export default function SortSelector({currentSort, setCurrentSort}: SortSelectorProps) {
  return (
    <div className="flex flex-col">
      <Label className="text-xs text-gray-500">Сортировка по цене</Label>
      <Select value={currentSort} onValueChange={setCurrentSort}>
        <SelectTrigger className="w-full sm:w-[200px] h-10">
          <SelectValue placeholder="Сортировка"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">По умолчанию</SelectItem>
          <SelectItem value="asc">По возрастанию</SelectItem>
          <SelectItem value="desc">По убыванию</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
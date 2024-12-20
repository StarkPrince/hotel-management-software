import
  {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/apps/web/components/ui/select";

interface FloorSelectorProps
{
  value: number;
  onChange: (floor: number) => void;
  floors: number[];
}

export function FloorSelector({ value, onChange, floors }: FloorSelectorProps)
{
  return (
    <Select
      value={value.toString()}
      onValueChange={(value) => onChange(parseInt(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select floor" />
      </SelectTrigger>
      <SelectContent>
        {floors.map((floor) => (
          <SelectItem key={floor} value={floor.toString()}>
            Floor {floor}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
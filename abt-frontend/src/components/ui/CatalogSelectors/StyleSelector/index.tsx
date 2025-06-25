'use client'

import {Style} from "@/types";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";

interface StyleSelectorProps {
  styles: Style[]
  currentStyle: string
  setCurrentStyle: (style: string) => void
}

export default function StyleSelector({ styles, currentStyle, setCurrentStyle }: StyleSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return(
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="mt-1 "
        >
          {currentStyle || 'Выберите стиль...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Поиск стиля..."/>
          <CommandList>
            <CommandEmpty>Стили не найдены.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value=""
                onSelect={() => {
                  setCurrentStyle('')
                  setIsOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    currentStyle === '' ? 'opacity-100' : 'opacity-0',
                  )}
                />
                Любой
              </CommandItem>
              {styles && styles.map((style: Style) => (
                <CommandItem
                  key={style.id}
                  value={style.style}
                  onSelect={() => {
                    setCurrentStyle(style.style)
                    setIsOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentStyle === style.style ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {style.style}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
'use client'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { Material } from '@/types'
import { cn } from '@/lib/utils'

interface MaterialSelectorProps {
  materials: Material[],
  currentMaterial: string,
  setCurrentMaterial: (material: string) => void,
}

export default function MaterialSelector({ materials, currentMaterial, setCurrentMaterial }: MaterialSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="mt-1"
        >
          {currentMaterial || 'Выберите материал...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Поиск материала..."/>
          <CommandList>
            <CommandEmpty>Материалы не найдены.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value=""
                onSelect={() => {
                  setCurrentMaterial('')
                  setIsOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    currentMaterial === '' ? 'opacity-100' : 'opacity-0',
                  )}
                />
                Любой
              </CommandItem>
              {materials && materials.map((material: Material) => (
                <CommandItem
                  key={material.id}
                  value={material.material}
                  onSelect={() => {
                    setCurrentMaterial(material.material)
                    setIsOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentMaterial === material.material ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {material.material}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

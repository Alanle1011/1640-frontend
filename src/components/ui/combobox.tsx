import * as React from "react";

import { useMedia } from "react-use";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
type Faculty = {
  value: string;
  label: string;
};

const faculties = [
  { value: "CS", label: "Computer Science" },
  { value: "BA", label: "Business Administration" },
  { value: "GD", label: "Graphic Design" },
];

export function Cbb() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMedia("(min-width: 480px)");
  const [selectedFaculty, setSelectedFaculty] = React.useState<Faculty | null>(
    null
  );

  const handleFacultySelect = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setOpen(false); // Close the popover after selection
  };

  if (isDesktop) {
    return (
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-black w-[150px] justify-start">
              {selectedFaculty ? <>{selectedFaculty.label}</> : <>+ Set Faculty</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <FacultiesList
              faculties={faculties}
              selectedFaculty={selectedFaculty}
              onFacultySelect={handleFacultySelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div>
      {/* MOBILE */}
      <div>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="bg-black w-[150px] justify-start"
            >
              {selectedFaculty ? (
                <>{selectedFaculty.label}</>
              ) : (
                <>+ Set Faculty</>
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <FacultiesList
                faculties={faculties}
                selectedFaculty={selectedFaculty}
                onFacultySelect={handleFacultySelect}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

function FacultiesList({
  faculties,
  onFacultySelect,
}: {
  faculties: Faculty[];
  selectedFaculty: Faculty | null;
  onFacultySelect: (faculty: Faculty) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter faculties..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {faculties.map((faculty) => (
            <CommandItem
              key={faculty.value}
              value={faculty.value}
              onSelect={() => onFacultySelect(faculty)} // Pass the faculty object
            >
              {faculty.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, GripVertical, SquarePen } from "lucide-react";

export default function CourseSchedule() {
  const [units, setUnits] = useState([
    { unitTitle: "", modules: [{ moduleTitle: "", files: [] as File[] }] },
  ]);

  const addUnit = () => {
    setUnits([
      ...units,
      { unitTitle: "", modules: [{ moduleTitle: "", files: [] }] },
    ]);
  };

  const removeUnit = (unitIndex: number) => {
    if (units.length === 1) return;
    setUnits(units.filter((_, i) => i !== unitIndex));
  };

  const addModule = (unitIndex: number) => {
    const updated = [...units];
    updated[unitIndex].modules.push({ moduleTitle: "", files: [] });
    setUnits(updated);
  };

  const [editing, setEditing] = useState<{
    unitIndex: number;
    moduleIndex: number;
  } | null>(null);

  const handleInputChange = (
    unitIndex: number,
    moduleIndex: number | null,
    value: string
  ) => {
    const updated = [...units];

    if (moduleIndex === null) {
      updated[unitIndex].unitTitle = value;
    } else {
      updated[unitIndex].modules[moduleIndex].moduleTitle = value;
    }

    setUnits(updated);
  };

  const handleFileUpload = (
    unitIndex: number,
    moduleIndex: number,
    files: FileList | null
  ) => {
    if (!files) return;
    const updated = [...units];
    updated[unitIndex].modules[moduleIndex].files = Array.from(files);
    setUnits(updated);
  };

  return (
    <section className="p-[20px] rounded-[12px] space-y-4 bg-white w-full border">
      <h2 className="font-semibold text-lg mb-[30px]">Course Schedule</h2>

      {units.map((unit, unitIndex) => (
        <div
          key={unitIndex}
          className="border rounded-lg p-4 space-y-3 bg-[#F9FBFC]">
          {/* Unit header row */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full md:w-auto">
              <div className="flex items-center font-semibold text-[14px] text-[#141414]">
                <GripVertical className="inline-block mr-2" size={16} />
                <p className="mr-[2px]">Unit</p>
                <p>{unitIndex + 1}</p>
              </div>

              <Input
                placeholder="Enter unit title"
                value={unit.unitTitle}
                className="w-full sm:w-[300px] md:w-[378px]"
                onChange={(e) =>
                  handleInputChange(unitIndex, null, e.target.value)
                }
              />
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditing({ unitIndex, moduleIndex: -1 })}>
                <SquarePen />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeUnit(unitIndex)}>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>

          {/* Modules */}
          {unit.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="rounded p-3 space-y-2 bg-white">
              <p className="text-[14px] font-medium text-[#141414]">
                Module Title
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Input
                  placeholder="Enter module title"
                  value={module.moduleTitle}
                  onChange={(e) =>
                    handleInputChange(unitIndex, moduleIndex, e.target.value)
                  }
                  className="flex-1"
                />
                <label className="cursor-pointer text-sm font-medium text-[#656565] border rounded-md px-3 py-2 hover:bg-gray-100 flex items-center justify-center sm:w-[130px]">
                  <Plus className="inline-block mr-1" size={16} /> Add File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(unitIndex, moduleIndex, e.target.files)
                    }
                  />
                </label>
              </div>

              <div className="flex flex-col gap-4">
                {module.files.length > 0 && (
                  <ul className="text-sm text-gray-600">
                    {module.files.map((file, i) => (
                      <li key={i}>📄 {file.name}</li>
                    ))}
                  </ul>
                )}
                <div>
                  <Button
                    variant="ghost"
                    className="border border-[#2E6BCE] text-[#2E6BCE] hover:text-[#2E6BCE] w-full sm:w-auto"
                    onClick={() => addModule(unitIndex)}>
                    <Plus size={16} className="text-[#2E6BCE]" /> Add Module
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Add unit button */}
      <div className="flex justify-end">
        <Button
          onClick={addUnit}
          className="bg-blue-600 text-white w-full sm:w-auto">
          <Plus size={16} /> Add Unit
        </Button>
      </div>
    </section>
  );
}

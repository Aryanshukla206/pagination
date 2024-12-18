import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface SelectionOverlayProps {
  visible: boolean;
  onHide: () => void;
  onSelect: (count: number) => void;
}

export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({
  visible,
  onHide,
  onSelect,
}) => {
  const [count, setCount] = useState<number>(1);

  const handleSubmit = () => {
    onSelect(count);
    onHide();
  };

  return (
    <Dialog
      header="Select Rows"
      visible={visible}
      onHide={onHide}
      className="w-[90vw] md:w-[30vw]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="count" className="font-medium">
            Number of rows to select
          </label>
          <InputNumber
            id="count"
            value={count}
            onValueChange={(e) => setCount(e.value || 1)}
            min={1}
            className="w-full"
          />
        </div>
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
};
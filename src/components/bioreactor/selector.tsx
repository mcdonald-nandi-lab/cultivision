"use client";

import { useState, useEffect } from "react";

interface BioreactorOption {
  id: string;
  name: string;
}

interface BioreactorSelectorProps {
  selectedBioreactor: string;
  onBioreactorChange: (bioreactorId: string) => void;
}

export default function BioreactorSelector({
  selectedBioreactor,
  onBioreactorChange,
}: BioreactorSelectorProps) {
  const [options, setOptions] = useState<BioreactorOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBioreactors() {
      try {
        const response = await fetch("/api/bioreactors");
        if (!response.ok) {
          throw new Error("Failed to fetch bioreactors");
        }

        const data = await response.json();
        // ! TODO: Change the below
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedOptions = data.map((bioreactor: any) => ({
          id: bioreactor.id,
          name: bioreactor.name,
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching bioreactors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBioreactors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onBioreactorChange(e.target.value);
  };

  if (loading) {
    return <div>Loading bioreactor options...</div>;
  }

  return (
    <div className='mb-3'>
      <select
        className='form-select'
        id='bioreactorType'
        value={selectedBioreactor}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { SelectionOverlay } from './SelectionOverlay';
import type { Artwork, ArtworkResponse } from '../types/artwork';
import { Settings2 } from 'lucide-react';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';

export const ArtworksTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows] = useState(12);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectionMap, setSelectionMap] = useState<Record<number, boolean>>({});
  const [rowClick, setRowClick] = useState<boolean>(true);


  const loadArtworks = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${rows}`
      );
      const data: ArtworkResponse = await response.json();
      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = Math.floor(first / rows) + 1;
    loadArtworks(page);
  }, [first, rows]);

  const onPage = (event: { first: number }) => {
    setFirst(event.first);
  };

  const handleSelectionChange = (e: { value: Artwork[] }) => {
    const newSelection = e.value;
    setSelectedArtworks(newSelection);
    
    const newSelectionMap = { ...selectionMap };
    artworks.forEach(artwork => {
      const isSelected = newSelection.some(selected => selected.id === artwork.id);
      newSelectionMap[artwork.id] = isSelected;
    });
    setSelectionMap(newSelectionMap);
  };


  const handleBulkSelect = async (count: number) => {
    const totalPages = Math.ceil(count / rows);
    const newSelectionMap = { ...selectionMap };
    let remainingCount = count;

    for (let page = 1; page <= totalPages && remainingCount > 0; page++) {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${rows}`
      );
      const data: ArtworkResponse = await response.json();
      
      data.data.forEach(artwork => {
        if (remainingCount > 0) {
          newSelectionMap[artwork.id] = true;
          remainingCount--;
        }
      });
    }

    setSelectionMap(newSelectionMap);
    const currentSelection = artworks.filter(artwork => newSelectionMap[artwork.id]);
    setSelectedArtworks(currentSelection);
  };

  const header = (
    <div className="flex justify-between items-center">
      <Button
        icon={<Settings2 className="w-4 h-4" />}
        onClick={() => setShowOverlay(true)}
        className="p-2"
        rounded
      />
    </div>
  );

  return (
    <>
    <div className="card px-6 py-5 border-b border-gray-800 ">
       <div className='text-3xl font-bold text-gray-900 mb-2 text-center'>GrowMeOrganic</div>
       <p className='text-gray-600  text-xl text-center py-4 transition-all duration-300 hover:text-gray-900 hover:font-bold'>Art Gallary</p>
       <div className="flex justify-content-center align-items-center mb-4 gap-2">
      <InputSwitch
          inputId="input-rowclick"
          checked={rowClick}
          onChange={(e: InputSwitchChangeEvent) => setRowClick(e.value!)}
        />
        <label htmlFor="input-rowclick">Lock Row Click</label>
      </div>
      <DataTable
        value={artworks}
        selection={rowClick ? undefined : selectedArtworks}
        onSelectionChange={handleSelectionChange}
        dataKey="id"
        paginator
        rows={rows}
        totalRecords={totalRecords}
        lazy
        first={first}
        onPage={onPage}
        loading={loading}
        header={header}
        className="p-4"
        tableStyle={{ minWidth: '40rem' }}
        selectionMode={rowClick ? undefined : 'multiple'}
      >
        <Column selectionMode="multiple" className='header' headerStyle={{ width: '3rem', backgroundColor : 'lightgrey' }} />
        <Column field="title" header="Title"  />
        <Column field="place_of_origin" header="Place"  />
        <Column field="artist_display" header="Artist Display"  />
        <Column field="inscriptions" header="Inscriptions"  />
        <Column field="date_start" header="Start Date"  />
        <Column field="date_end" header="End Date"  />
      </DataTable>

      <SelectionOverlay
        visible={showOverlay}
        onHide={() => setShowOverlay(false)}
        onSelect={handleBulkSelect}
      />
    </div>
    </>
  );
};
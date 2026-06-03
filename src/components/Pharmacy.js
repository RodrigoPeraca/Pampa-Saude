import React, { useState, useMemo } from 'react';

const PHARMACIES = [
  {
    id: 'fbm',
    name: 'Farmácia Básica Municipal',
    address: 'Rua João Telles, 862 - Centro',
    medicines: [
      { name: 'Dipirona Sódica', dosage: '500mg', type: 'Analgésico' },
      { name: 'Losartana Potássica', dosage: '50mg', type: 'Anti-hipertensivo' },
      { name: 'Amoxicilina', dosage: '500mg', type: 'Antibiótico' },
      { name: 'Ibuprofeno', dosage: '400mg', type: 'Anti-inflamatório' },
      { name: 'Metformina', dosage: '850mg', type: 'Antidiabético' },
      { name: 'Omeprazol', dosage: '20mg', type: 'Protetor Gástrico' }
    ]
  },
  {
    id: 'camilo-gomes',
    name: 'Farmácia - Posto Camilo Gomes',
    address: 'R. Fabrício Pilar, 1201 - Centro',
    medicines: [
      { name: 'Dipirona Sódica', dosage: '500mg', type: 'Analgésico' },
      { name: 'Losartana Potássica', dosage: '50mg', type: 'Anti-hipertensivo' },
      { name: 'Paracetamol', dosage: '750mg', type: 'Analgésico' },
    ]
  }
];

export default function Pharmacy() {
  // Estados do componente
  const [selectedPharmacy, setSelectedPharmacy] = useState(PHARMACIES[0]); // Começa com a primeira farmácia selecionada
  const [searchMedicine, setSearchMedicine] = useState('');

  // Filtro de medicamentos
  const filteredMedicines = useMemo(() => {
    if (!searchMedicine.trim()) return selectedPharmacy.medicines;
    
    return selectedPharmacy.medicines.filter((med) =>
      med.name.toLowerCase().includes(searchMedicine.toLowerCase()) ||
      med.type.toLowerCase().includes(searchMedicine.toLowerCase())
    );
  }, [searchMedicine, selectedPharmacy]);

  return (
    <div className="pharmacy-container">
      <section className="panel search-panel">
        <label>Escolha a Unidade de Retirada</label>
        
        {}
        <select
          className="pharmacy-select"
          value={selectedPharmacy.id} 
          onChange={(e) => {
            const pharmacy = PHARMACIES.find(p => p.id === e.target.value);
            setSelectedPharmacy(pharmacy);
            setSearchMedicine(''); // Limpa a busca ao trocar de farmácia
          }}
        >
          {PHARMACIES.map(pharmacy => (
            <option key={pharmacy.id} value={pharmacy.id}>
              {pharmacy.name}
            </option>
          ))}
        </select>

        <label style={{ marginTop: '1rem' }}>Buscar Medicamento nesta unidade</label>
        {/* Input para buscar o remédio */}
        <input
          type="text"
          placeholder="Ex.: Dipirona, Antibiótico..."
          value={searchMedicine}
          onChange={(e) => setSearchMedicine(e.target.value)}
        />
      </section>

      {/* Lista de Medicamentos */}
      <section className="cards-grid">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((med, index) => (
            <article key={index} className="facility-card">
              <header>
                <div>
                  <p className="facility-type">{med.type}</p>
                  <h2>{med.name}</h2>
                </div>
                <span className="facility-badge">{med.dosage}</span>
              </header>
              <div className="facility-info">
                <p>Disponível na {selectedPharmacy.name}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <p>Nenhum medicamento encontrado com esse nome nesta unidade.</p>
          </div>
        )}
      </section>
    </div>
  );
}
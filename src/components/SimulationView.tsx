import React from 'react';
import { SimulationScenario } from '../types';
import { ADVENTURES_DATA } from '../data/adventureData';
import { BranchingAdventureView } from './BranchingAdventureView';

interface SimulationViewProps {
  moduleId: number;
  simulation?: SimulationScenario;
  onProceedToStep4?: () => void;
}

export const SimulationView: React.FC<SimulationViewProps> = ({
  moduleId,
  onProceedToStep4,
}) => {
  const adventure = ADVENTURES_DATA[moduleId];

  if (adventure) {
    return (
      <BranchingAdventureView
        moduleId={moduleId}
        adventure={adventure}
        onProceedToStep4={onProceedToStep4}
      />
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center">
      <p className="text-xs text-slate-500">Keine Simulation für dieses Modul vorhanden.</p>
    </div>
  );
};

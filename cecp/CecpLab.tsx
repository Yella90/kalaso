'use client';

import dynamic from 'next/dynamic';
import { useState, type ReactNode } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { SimulationFrame as Frame } from './components/layout/SimulationFrame';
import { PredictChallenges } from '@/components/sim/PredictChallenges';
import { CECP_CHALLENGES } from './challenges';

// Simulations du site cecp, telles quelles (fond sombre, textes en français).
// Chacune est un morceau de code séparé : le téléphone ne télécharge que celle du chapitre ouvert.

function Loading() {
  return <div className="flex h-72 items-center justify-center text-slate-400">…</div>;
}

const Kinematics = dynamic(() => import('./simulations/Kinematics/KinematicsSimulation').then((m) => m.KinematicsSimulation), { ssr: false, loading: Loading });
const KinematicsPanel = dynamic(() => import('./simulations/Kinematics/KinematicsParameterPanel').then((m) => m.KinematicsParameterPanel), { ssr: false, loading: Loading });
const Projectile = dynamic(() => import('./simulations/Projectile/ProjectileSimulation').then((m) => m.ProjectileSimulation), { ssr: false, loading: Loading });
const ProjectilePanel = dynamic(() => import('./simulations/Projectile/ParameterPanel').then((m) => m.ProjectileParameterPanel), { ssr: false, loading: Loading });
const ProjectileGraphs = dynamic(() => import('./simulations/Projectile/GraphPanel').then((m) => m.GraphPanel), { ssr: false, loading: Loading });
const SolarSystem = dynamic(() => import('./simulations/SolarSystem/SolarSystemSimulation').then((m) => m.SolarSystemSimulation), { ssr: false, loading: Loading });
const SolarControls = dynamic(() => import('./simulations/SolarSystem/SolarSystemPanel').then((m) => m.SolarSystemControls), { ssr: false, loading: Loading });
const SolarBodyInfo = dynamic(() => import('./simulations/SolarSystem/SolarSystemPanel').then((m) => m.BodyInfo), { ssr: false, loading: Loading });
const KeplerLab = dynamic(() => import('./simulations/SolarSystem/KeplerLab').then((m) => m.KeplerLab), { ssr: false, loading: Loading });
const OrbitCalculator = dynamic(() => import('./simulations/SolarSystem/KeplerLab').then((m) => m.OrbitCalculator), { ssr: false, loading: Loading });
const Satellite = dynamic(() => import('./simulations/Satellite/SatelliteSimulation').then((m) => m.SatelliteSimulation), { ssr: false, loading: Loading });
const SatellitePanel = dynamic(() => import('./simulations/Satellite/SatelliteParameterPanel').then((m) => m.SatelliteParameterPanel), { ssr: false, loading: Loading });
const Charged = dynamic(() => import('./simulations/ChargedParticle/ChargedParticleSimulation').then((m) => m.ChargedParticleSimulation), { ssr: false, loading: Loading });
const ChargedPanel = dynamic(() => import('./simulations/ChargedParticle/ChargedParticleParameterPanel').then((m) => m.ChargedParticleParameterPanel), { ssr: false, loading: Loading });
const Magnetic = dynamic(() => import('./simulations/Magnetic/MagneticSimulation').then((m) => m.MagneticSimulation), { ssr: false, loading: Loading });
const MagneticPanel = dynamic(() => import('./simulations/Magnetic/MagneticPanel').then((m) => m.MagneticPanel), { ssr: false, loading: Loading });
const Calorimeter = dynamic(() => import('./simulations/Thermal/CalorimeterSimulation').then((m) => m.CalorimeterSimulation), { ssr: false, loading: Loading });
const RL = dynamic(() => import('./simulations/Electric/RLSimulation').then((m) => m.RLSimulation), { ssr: false, loading: Loading });
const Transformer = dynamic(() => import('./simulations/Induction/TransformerSimulation').then((m) => m.TransformerSimulation), { ssr: false, loading: Loading });
const RopeWave = dynamic(() => import('./simulations/Waves/RopeWaveSimulation').then((m) => m.RopeWaveSimulation), { ssr: false, loading: Loading });
const RippleTank = dynamic(() => import('./simulations/Waves/RippleTankSimulation').then((m) => m.RippleTankSimulation), { ssr: false, loading: Loading });
const Interference = dynamic(() => import('./simulations/Light/InterferenceSimulation').then((m) => m.InterferenceSimulation), { ssr: false, loading: Loading });
const Laser = dynamic(() => import('./simulations/Light/LaserSimulation').then((m) => m.LaserSimulation), { ssr: false, loading: Loading });
const Spring = dynamic(() => import('./simulations/Oscillators/SpringSimulation').then((m) => m.SpringSimulation), { ssr: false, loading: Loading });
const Torsion = dynamic(() => import('./simulations/Oscillators/TorsionSimulation').then((m) => m.TorsionSimulation), { ssr: false, loading: Loading });
const Pendulum = dynamic(() => import('./simulations/Oscillators/PendulumSimulation').then((m) => m.PendulumSimulation), { ssr: false, loading: Loading });
const LC = dynamic(() => import('./simulations/Electric/LCSimulation').then((m) => m.LCSimulation), { ssr: false, loading: Loading });
const EMWave = dynamic(() => import('./simulations/Waves/EMWaveSimulation').then((m) => m.EMWaveSimulation), { ssr: false, loading: Loading });
const ForcedOscillation = dynamic(() => import('./simulations/Oscillators/ForcedOscillationSimulation').then((m) => m.ForcedOscillationSimulation), { ssr: false, loading: Loading });
const ForcedRLC = dynamic(() => import('./simulations/Electric/ForcedRLCSimulation').then((m) => m.ForcedRLCSimulation), { ssr: false, loading: Loading });
const Photoelectric = dynamic(() => import('./simulations/Quantum/PhotoelectricSimulation').then((m) => m.PhotoelectricSimulation), { ssr: false, loading: Loading });
const EnergyLevels = dynamic(() => import('./simulations/Atom/EnergyLevelsSimulation').then((m) => m.EnergyLevelsSimulation), { ssr: false, loading: Loading });
const XRayTube = dynamic(() => import('./simulations/Quantum/XRayTubeSimulation').then((m) => m.XRayTubeSimulation), { ssr: false, loading: Loading });
const Nucleus = dynamic(() => import('./simulations/Nuclear/NucleusSimulation').then((m) => m.NucleusSimulation), { ssr: false, loading: Loading });
const Radioactivity = dynamic(() => import('./simulations/Nuclear/RadioactivitySimulation').then((m) => m.RadioactivitySimulation), { ssr: false, loading: Loading });
const Stereo = dynamic(() => import('./simulations/Chemistry/StereoSimulation').then((m) => m.StereoSimulation), { ssr: false, loading: Loading });
const Oxidation = dynamic(() => import('./simulations/Chemistry/OxidationLab').then((m) => m.OxidationLab), { ssr: false, loading: Loading });
const Titration = dynamic(() => import('./simulations/Chemistry/TitrationSimulation').then((m) => m.TitrationSimulation), { ssr: false, loading: Loading });
const Esterification = dynamic(() => import('./simulations/Chemistry/EsterificationSimulation').then((m) => m.EsterificationSimulation), { ssr: false, loading: Loading });
const Peptide = dynamic(() => import('./simulations/Chemistry/PeptideBuilder').then((m) => m.PeptideBuilder), { ssr: false, loading: Loading });

/** Le montage de chaque chapitre, comme sur la page du chapitre dans cecp. */
const LABS: Record<string, () => ReactNode> = {
  '12e/physique/cinematique-point': () => (
    <>
      <Frame><Kinematics /></Frame>
      <KinematicsPanel />
    </>
  ),
  '12e/physique/centre-inertie': () => (
    <>
      <Frame><Kinematics /></Frame>
      <KinematicsPanel />
    </>
  ),
  '12e/physique/projectile': () => (
    <>
      <Frame><Projectile /></Frame>
      <ProjectilePanel />
      <ProjectileGraphs />
    </>
  ),
  '12e/physique/gravitation': () => (
    <>
      <Frame caption="Distances et tailles compressées pour tenir à l'écran ; les périodes de révolution sont les vraies valeurs. Fais glisser pour tourner, pince ou molette pour zoomer.">
        <SolarSystem />
      </Frame>
      <SolarControls />
      <SolarBodyInfo />
      <KeplerLab />
      <OrbitCalculator />
    </>
  ),
  '12e/physique/satellite': () => (
    <>
      <Frame><Satellite /></Frame>
      <SatellitePanel />
    </>
  ),
  '12e/physique/particule-champ-electrique': () => (
    <>
      <Frame><Charged /></Frame>
      <ChargedPanel />
    </>
  ),
  '12e/physique/particule-champ-magnetique': () => (
    <>
      <Frame caption="Le champ B sort de l'écran (flèches bleues). Vecteur vitesse en rose, force de Lorentz en vert.">
        <Magnetic />
      </Frame>
      <MagneticPanel />
    </>
  ),
  '12e/physique/calorimetrie': () => <Frame><Calorimeter /></Frame>,
  '12e/physique/auto-induction': () => <Frame><RL /></Frame>,
  '12e/physique/transformateurs-alternateurs': () => <Frame><Transformer /></Frame>,
  '12e/physique/ondes-progressives': () => <Frame><RopeWave /></Frame>,
  '12e/physique/interferences-mecaniques': () => <Frame><RippleTank /></Frame>,
  '12e/physique/interferences-lumineuses': () => <Frame><Interference /></Frame>,
  '12e/physique/laser': () => <Frame><Laser /></Frame>,
  '12e/physique/pendule-elastique': () => <Frame><Spring /></Frame>,
  '12e/physique/pendule-torsion': () => <Frame><Torsion /></Frame>,
  '12e/physique/pendule-pesant': () => <Frame><Pendulum /></Frame>,
  '12e/physique/circuit-oscillant': () => <Frame><LC /></Frame>,
  '12e/physique/ondes-electromagnetiques': () => <Frame><EMWave /></Frame>,
  '12e/physique/oscillations-mecaniques-forcees': () => <Frame><ForcedOscillation /></Frame>,
  '12e/physique/oscillations-electriques-forcees': () => <Frame><ForcedRLC /></Frame>,
  '12e/physique/effet-photoelectrique': () => <Frame><Photoelectric /></Frame>,
  '12e/physique/niveaux-energie': () => <Frame><EnergyLevels /></Frame>,
  '12e/physique/rayons-x': () => <Frame><XRayTube /></Frame>,
  '12e/physique/noyau': () => <Frame><Nucleus /></Frame>,
  '12e/physique/reactions-nucleaires': () => <Frame><Radioactivity /></Frame>,
  '12e/chimie/stereochimie': () => <Frame><Stereo /></Frame>,
  '12e/chimie/alcools': () => <Frame><Oxidation /></Frame>,
  '12e/chimie/amines': () => <Frame><Titration kind="base" /></Frame>,
  '12e/chimie/acides-carboxyliques': () => (
    <>
      <Frame><Esterification /></Frame>
      <Frame><Titration kind="acide" /></Frame>
    </>
  ),
  '12e/chimie/acides-amines': () => <Frame><Peptide /></Frame>,
};

/** Simulation cecp du chapitre ; la 3D attend que l'élève la lance (données, téléphones modestes). */
export function CecpLab({ chapterKey, three, t }: { chapterKey: string; three?: boolean; t: Dictionary['lesson'] }) {
  const [started, setStarted] = useState(!three);
  const Lab = LABS[chapterKey];
  if (!Lab) return null;
  return (
    <div className="rounded-2xl bg-slate-950 p-3 text-slate-200 sm:p-4">
      {started ? (
        <div className="flex flex-col gap-4">
          <Lab />
          {CECP_CHALLENGES[chapterKey] && <PredictChallenges challenges={CECP_CHALLENGES[chapterKey]} t={t.predict} />}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
          <p className="max-w-md text-slate-300">{t.lab3dNote}</p>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="rounded-full bg-amber-400 px-5 py-2 font-bold text-slate-950"
          >
            {t.lab3dStart}
          </button>
        </div>
      )}
    </div>
  );
}

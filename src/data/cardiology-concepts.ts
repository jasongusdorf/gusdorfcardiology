export type ConceptSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CardiologyConcept = {
  slug: string;
  term: string;
  aliases: string[];
  definition: string;
  clinicalQuestion: string;
  equations?: Array<{ label: string; expression: string; meaning: string }>;
  sections: ConceptSection[];
  connections: string[];
  pitfalls: string[];
  sources: Array<{ label: string; href: string }>;
};

export const cardiologyConcepts: CardiologyConcept[] = [
  {
    slug: 'preload',
    term: 'Preload',
    aliases: ['preload', 'preload-dependent', 'preload sensitive', 'preload-sensitive'],
    definition: 'The myocardial fiber stretch present at end diastole, immediately before contraction. In practice it is inferred—not directly measured—from end-diastolic volume, filling pressure, venous return, and the ventricle’s compliance.',
    clinicalQuestion: 'How filled and stretched is this ventricle before it contracts—and is more filling likely to increase forward stroke volume or merely raise congestion?',
    equations: [
      { label: 'Wall stress approximation', expression: 'σ ≈ P × r / 2h', meaning: 'End-diastolic pressure and chamber radius increase myocardial stress; greater wall thickness reduces it.' },
      { label: 'Stroke volume', expression: 'SV = EDV − ESV', meaning: 'An effective preload increase raises EDV and may widen stroke volume if contractile reserve remains.' },
    ],
    sections: [
      {
        title: 'From venous return to sarcomere length',
        paragraphs: [
          'Blood returning to the heart establishes ventricular end-diastolic volume. That volume stretches the ventricular wall and its cardiomyocytes. Within each myocyte, sarcomeres lengthen as actin and myosin filaments assume a more favorable geometry for force generation.',
          'Preload is therefore not synonymous with “fluid status,” central venous pressure, wedge pressure, or EDV. Those are related observations. The same filling pressure can produce different fiber stretch in ventricles with different geometry and compliance.',
        ],
        bullets: ['Venous return determines available filling.', 'Pericardial restraint and ventricular interaction determine how much of that filling expands the chamber.', 'Compliance determines the pressure cost of achieving a given end-diastolic volume.'],
      },
      {
        title: 'The Frank–Starling mechanism',
        paragraphs: [
          'Within a physiologic range, greater end-diastolic stretch increases active force and stroke volume. Length-dependent activation reflects improved myofilament calcium sensitivity, altered lattice spacing, and recruitment of force-generating cross-bridges—not simply “more overlap.”',
          'The response depends on contractility. A healthy ventricle can translate extra filling into useful output; a failing or overdistended ventricle may gain little stroke volume while filling pressure and wall stress rise sharply.',
        ],
      },
      {
        title: 'Compliance changes what preload looks like',
        paragraphs: [
          'A compliant ventricle accepts volume with a modest pressure rise. A stiff ventricle reaches high diastolic pressure at a much smaller volume. Thus PCWP can be high in HFpEF even when LVEDV is not strikingly enlarged, while a chronically dilated ventricle may hold a large volume at a less dramatic pressure.',
          'This is why pressure-based and volume-based definitions of preload can appear to disagree. They are describing different points in the chain from chamber filling to myocardial stretch.',
        ],
      },
      {
        title: 'How preload appears on a pressure–volume loop',
        paragraphs: [
          'With afterload and contractility initially fixed, increased preload moves the end-diastolic point rightward and widens the loop. Stroke volume rises because the ventricle begins from a larger end-diastolic volume while end-systolic volume changes little on the first beat.',
          'Reduced compliance shifts the end-diastolic pressure–volume relation upward and leftward: the same volume carries a higher pressure. Volume and filling pressure must therefore be read together.',
        ],
      },
      {
        title: 'Bedside inference and fluid responsiveness',
        paragraphs: [
          'JVP, edema, lung ultrasound, IVC behavior, Doppler filling, chamber size, and invasive pressures estimate different consequences of filling. None alone proves that giving fluid will improve output.',
          'Fluid responsiveness is a dynamic question. Passive leg raise, respiratory stroke-volume variation in carefully selected ventilated patients, or a small monitored fluid challenge asks whether moving along the Starling curve meaningfully increases flow.',
        ],
        bullets: ['Congested does not always mean fluid unresponsive.', 'Preload dependent does not mean “give unlimited fluid.”', 'A failing RV can be underfilled on the left while already suffering harmful right-sided volume and pressure overload.'],
      },
    ],
    connections: ['afterload', 'contractility', 'compliance'],
    pitfalls: ['Using CVP or PCWP as a direct measurement of sarcomere preload.', 'Equating volume responsiveness with improved patient-centered outcome.', 'Ignoring pericardial pressure, intrathoracic pressure, RV–LV interaction, or valvular regurgitation.'],
    sources: [
      { label: 'StatPearls: Physiology, Frank–Starling Law', href: 'https://www.ncbi.nlm.nih.gov/books/NBK470295/' },
      { label: 'Merck Manual: Overview of Heart Failure', href: 'https://www.merckmanuals.com/professional/cardiovascular-disorders/heart-failure/overview-of-heart-failure' },
    ],
  },
  {
    slug: 'afterload',
    term: 'Afterload',
    aliases: ['afterload'],
    definition: 'The load opposing ventricular fiber shortening during ejection. It is best understood as systolic myocardial wall stress and arterial impedance—not as blood pressure or systemic vascular resistance alone.',
    clinicalQuestion: 'What load must the ventricle overcome to eject, and which part comes from pressure, chamber geometry, valve obstruction, or the arterial tree?',
    equations: [
      { label: 'Wall stress approximation', expression: 'σ ≈ P × r / 2h', meaning: 'Pressure and chamber radius raise systolic wall stress; hypertrophy can initially normalize it by increasing wall thickness.' },
      { label: 'Effective arterial elastance', expression: 'Ea ≈ ESP / SV', meaning: 'A lumped description of arterial load incorporating resistance, compliance, timing, and heart rate.' },
    ],
    sections: [
      { title: 'Afterload is a myocardial problem, not a cuff number', paragraphs: ['A ventricle ejects against a time-varying load. Aortic pressure matters, but so do arterial compliance, characteristic impedance, reflected waves, ejection timing, and any fixed or dynamic outflow obstruction.', 'Two patients with the same systolic pressure can impose different wall stress on the myocardium because ventricular radius and wall thickness differ. A dilated thin-walled LV pays a larger stress cost than a smaller thick-walled chamber.'] },
      { title: 'Myocyte mechanics and force–velocity', paragraphs: ['As load rises, myocardial fibers shorten more slowly and less completely during a given systole. More cross-bridge force is devoted to developing tension before and during ejection, leaving a larger end-systolic volume if contractility and preload do not immediately change.', 'Chronic pressure load activates mechanosensitive signaling, sarcomere addition in parallel, and concentric hypertrophy. This can normalize wall stress temporarily while worsening relaxation, oxygen demand, fibrosis, and diastolic reserve.'] },
      { title: 'Pressure–volume loop consequences', paragraphs: ['An acute afterload increase makes the loop taller and narrower: systolic pressure rises, end-systolic volume increases, and stroke volume falls. The end-systolic pressure–volume relation itself does not move if intrinsic contractility is unchanged.', 'Chronic adaptation changes geometry and loading, so a later loop may not resemble the first-beat experiment. Neurohormonal responses, hypertrophy, and altered contractility become part of the phenotype.'] },
      { title: 'Different forms of afterload', paragraphs: ['The LV faces systemic arterial load and aortic-valve/outflow gradients. The RV faces pulmonary vascular load; it is particularly vulnerable to an abrupt rise because its thin wall is designed for a low-pressure circuit.', 'Vasodilators reduce arterial load, but their clinical effect depends on preload, perfusion pressure, valve lesions, and whether the dominant obstruction is fixed. Lowering SVR does not remove severe valvular aortic stenosis.'] },
    ],
    connections: ['preload', 'contractility', 'compliance'],
    pitfalls: ['Treating SVR as the complete definition of afterload.', 'Calling an afterload-mediated fall in EF a primary loss of contractility.', 'Assuming systemic and pulmonary afterload have equivalent ventricular consequences.'],
    sources: [{ label: 'NCBI Bookshelf: Cardiovascular Physiology Concepts', href: 'https://www.ncbi.nlm.nih.gov/books/NBK538143/' }],
  },
  {
    slug: 'contractility',
    term: 'Contractility',
    aliases: ['contractility', 'inotropy', 'inotropic'],
    definition: 'The myocardium’s intrinsic ability to generate force and shorten at a given preload and afterload. It depends on excitation–contraction coupling, calcium handling, myofilament responsiveness, energetics, and viable muscle mass.',
    clinicalQuestion: 'How strongly can the myocardium contract independent of the loading conditions imposed on it?',
    equations: [{ label: 'End-systolic elastance', expression: 'Ees = ΔP / ΔV along the ESPVR', meaning: 'A steeper ESPVR generally reflects greater contractile state, although true measurement requires multiple loading conditions.' }],
    sections: [
      { title: 'Inside the cardiomyocyte', paragraphs: ['Depolarization opens L-type calcium channels in the T-tubule. Trigger calcium activates ryanodine receptors on the sarcoplasmic reticulum, producing calcium-induced calcium release. Calcium binds troponin C, shifts tropomyosin, and permits actin–myosin cross-bridge cycling.', 'Relaxation requires ATP-dependent calcium reuptake by SERCA, extrusion through the sodium–calcium exchanger, and cross-bridge detachment. Phospholamban, beta-adrenergic signaling, intracellular pH, ischemia, and energetic supply all modify the cycle.'], bullets: ['T-tubules bring membrane depolarization close to the sarcoplasmic reticulum.', 'The dyad couples L-type channels to ryanodine receptors.', 'Mitochondria supply ATP for cross-bridge cycling and calcium reuptake.', 'Intercalated discs mechanically and electrically couple neighboring myocytes.'] },
      { title: 'Sarcomere force generation', paragraphs: ['Each sarcomere runs from Z disc to Z disc. Thick myosin filaments pull thin actin filaments toward the center; titin contributes passive recoil and length-dependent properties. Force depends on the number and kinetics of strongly bound cross-bridges, not merely the amount of calcium present.', 'Contractility differs from preload-dependent recruitment. A preload increase can strengthen contraction through Frank–Starling physiology without changing the intrinsic inotropic state.'] },
      { title: 'What changes contractility', paragraphs: ['Sympathetic beta-1 signaling increases cAMP/PKA activity, calcium entry, SR calcium cycling, and both contraction and relaxation. Ischemia, acidosis, hypoxia, myocarditis, toxins, and advanced cardiomyopathy reduce force by disrupting energetics, calcium handling, or viable contractile units.', 'Inotropes can increase measured output but also myocardial oxygen consumption, arrhythmia risk, and mortality in some settings. “Stronger squeeze” is not automatically beneficial.'] },
      { title: 'Why EF is not contractility', paragraphs: ['Ejection fraction is a load-dependent chamber ratio. It can fall when afterload rises despite unchanged myocyte contractility, remain preserved in concentric remodeling despite reduced longitudinal function, or appear high in severe mitral regurgitation because blood ejects into a low-impedance atrium.', 'Contractility is better approached through integrated pressure–volume behavior, strain, tissue velocities, hemodynamics, and clinical context. No routine bedside number is perfectly load independent.'] },
    ],
    connections: ['preload', 'afterload', 'compliance'],
    pitfalls: ['Equating EF, blood pressure, or dP/dt with pure contractility.', 'Ignoring lusitropy: calcium cycling controls relaxation as well as contraction.', 'Using an inotrope to treat low output without correcting ischemia, loading, rhythm, or mechanical obstruction.'],
    sources: [
      { label: 'NCBI Bookshelf: Cardiac Muscle and Electrical Activity', href: 'https://www.ncbi.nlm.nih.gov/books/NBK537194/' },
      { label: 'OpenStax: Cardiac Muscle and Electrical Activity', href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity' },
    ],
  },
  {
    slug: 'compliance',
    term: 'Compliance',
    aliases: ['compliance', 'compliant', 'noncompliant'],
    definition: 'The change in volume produced by a change in pressure. Ventricular compliance describes passive diastolic chamber behavior; arterial compliance describes how the vascular tree buffers pulsatile ejection.',
    clinicalQuestion: 'How much does pressure rise when volume is added to this chamber or vessel?',
    equations: [{ label: 'Compliance', expression: 'C = ΔV / ΔP', meaning: 'Low compliance means a small volume increment produces a large pressure increase.' }],
    sections: [
      { title: 'Chamber compliance and stiffness', paragraphs: ['Compliance is the inverse of stiffness over a local portion of a nonlinear pressure–volume curve. Because the diastolic relation is curved, a ventricle becomes progressively less compliant as it fills—even without disease.', 'Measured chamber compliance reflects myocardium, geometry, pericardial constraint, ventricular interaction, and intrathoracic pressure. It is not a single material property.'] },
      { title: 'Myocyte and extracellular determinants', paragraphs: ['Titin acts as a molecular spring within the sarcomere. Its isoforms and phosphorylation state influence passive tension. The extracellular matrix—especially collagen amount, cross-linking, and fibrosis—adds parallel stiffness.', 'Hypertrophy, ischemia, inflammation, infiltration, aging, and metabolic disease can impair active relaxation and increase passive stiffness. Relaxation and compliance are related but distinct: one is energy-dependent deactivation, the other is the passive pressure–volume response.'] },
      { title: 'Clinical consequences', paragraphs: ['When LV compliance falls, left-atrial and pulmonary venous pressure can rise sharply with exercise, tachycardia, hypertension, or a modest volume challenge. EF may remain normal because fractional emptying does not measure the pressure cost of filling.', 'Reduced arterial compliance widens pulse pressure and increases pulsatile LV load. Thus “compliance” must always specify the structure: ventricle, atrium, pericardium, pulmonary artery, or systemic arterial tree.'] },
      { title: 'How it is inferred', paragraphs: ['The gold-standard concept requires simultaneous pressure and volume across loading conditions. Clinically, Doppler filling, tissue velocity, atrial size, pulmonary pressures, invasive filling pressures, and the response to exercise provide indirect evidence.', 'A single E/e′, wedge pressure, or chamber size should not be treated as compliance itself. Each is influenced by rhythm, valve disease, loading, measurement technique, and regional function.'] },
    ],
    connections: ['preload', 'afterload', 'contractility'],
    pitfalls: ['Using impaired relaxation and low compliance as synonyms.', 'Assuming normal EF means normal diastolic mechanics.', 'Forgetting pericardial and RV constraints when interpreting LV filling pressure.'],
    sources: [
      { label: 'ASE/EACVI recommendations for diastolic function', href: 'https://www.asecho.org/guideline/recommendations-for-the-evaluation-of-left-ventricular-diastolic-function-by-echocardiography/' },
      { label: 'NCBI Bookshelf: Physiology, Cardiac Preload', href: 'https://www.ncbi.nlm.nih.gov/books/NBK541109/' },
    ],
  },
];

export const conceptBySlug = Object.fromEntries(cardiologyConcepts.map((concept) => [concept.slug, concept]));

const escaped = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function linkCardiologyConcepts(text: string): string {
  const entries = cardiologyConcepts
    .flatMap((concept) => concept.aliases.map((alias) => ({ alias, concept })))
    .sort((a, b) => b.alias.length - a.alias.length);
  const pattern = new RegExp(`\\b(${entries.map((entry) => escaped(entry.alias)).join('|')})\\b`, 'gi');
  const lookup = new Map(entries.map((entry) => [entry.alias.toLowerCase(), entry.concept]));
  return text.replace(pattern, (match) => {
    const concept = lookup.get(match.toLowerCase());
    return concept ? `<a href="/concepts/${concept.slug}" class="concept-link" title="Deep dive: ${concept.term}">${match}</a>` : match;
  });
}

export type LessonFigure = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
  license: string;
  wide?: boolean;
};

export type LessonFormula = {
  name: string;
  latex: string;
  interpretation: string;
  variables?: string;
};

export type VisualResource = {
  label: string;
  source: string;
  href: string;
};

export type LessonEnhancement = {
  figures?: LessonFigure[];
  formulas?: LessonFormula[];
  resources?: VisualResource[];
};

const commons = (file: string) =>
  `https://upload.wikimedia.org/wikipedia/commons/${file}?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original`;

/**
 * Curated teaching aids keyed to lesson slug. Wikimedia figures are embedded
 * only when their file page identifies a reusable license. Other sites are
 * linked rather than hot-linked so their context, attribution, and terms stay intact.
 */
export const lessonEnhancements: Record<string, LessonEnhancement> = {
  'cardiac-anatomy-and-flow': {
    figures: [
      {
        src: '/images/curriculum/generated/coronary-anatomy-atlas.png',
        alt: 'High-fidelity anterior human heart with labeled right and left coronary arteries and a posterior inset showing the posterior descending artery',
        caption: 'Coronary anatomy in three dimensions. Follow each vessel from its aortic origin, through its epicardial groove, to the myocardium it supplies; the posterior inset makes coronary dominance anatomically concrete.',
        credit: 'AI-generated original medical illustration',
        sourceUrl: '/images/curriculum/generated/coronary-anatomy-atlas.png',
        license: 'Gusdorf Cardiology · 2026',
        wide: true,
      },
      {
        src: '/images/curriculum/anatomy/gross-heart-specimen.jpg',
        alt: 'Gross anatomical heart specimen viewed from above with the aorta, pulmonary artery, vena cava, auricles, and pulmonary valve labeled',
        caption: 'Gross superior–anterior orientation. First find the thick-walled aorta and anterior pulmonary trunk; the pulmonary valve sits at the RV outflow while the auricles flank the great vessels.',
        credit: 'Dr. Jana, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Heart,_aorta_and_pulmonary_artery.jpg',
        license: 'CC BY-SA 3.0',
      },
      {
        src: '/images/curriculum/anatomy/heart-anterior.png',
        alt: 'Detailed anterior anatomical illustration of the human heart and great vessels',
        caption: 'Anterior surface anatomy. The right ventricle occupies most of the sternocostal surface; the LV forms the left border and apex. Use the interventricular groove to orient the ventricles and LAD.',
        credit: 'xranatomy.com, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Anterior_surface_of_heart.png',
        license: 'CC BY-SA 4.0',
      },
      {
        src: '/images/curriculum/anatomy/heart-internal.jpg',
        alt: 'Cutaway diagram of internal cardiac anatomy labeling chambers, septa, valves, chordae, papillary muscles, and great vessels',
        caption: 'Internal architecture. Follow inflow → atrioventricular valve → trabeculated ventricle → semilunar valve. Compare the thin RV free wall with the thick LV and identify the chordal–papillary support apparatus.',
        credit: 'OpenStax College, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:2008_Internal_Anatomy_of_the_HeartN.jpg',
        license: 'CC BY 3.0',
      },
      {
        src: '/images/curriculum/anatomy/coronary-territories.jpg',
        alt: 'Anterior and inferior cardiac surfaces colored by typical coronary artery perfusion territories',
        caption: 'Coronary territories are probabilistic maps. Dominance and branch anatomy vary, so use the map to form a culprit hypothesis, then reconcile it with angiography and wall motion.',
        credit: 'Patrick J. Lynch, medical illustrator, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Heart_coronary_territories.jpg',
        license: 'CC BY 2.5',
      },
      {
        src: '/images/curriculum/anatomy/conduction-system.jpg',
        alt: 'Cardiac conduction system diagram showing SA node, internodal pathways, AV node, His bundle, bundle branches, and Purkinje fibers',
        caption: 'Electrical anatomy. Physiologic AV-nodal delay permits filling; rapid His–Purkinje activation produces a narrow, coordinated QRS. Disease below the His bundle carries different implications from nodal delay.',
        credit: 'OpenStax College, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:2019_Cardiac_ConductionN.jpg',
        license: 'CC BY 3.0',
      },
      {
        src: commons('5/5f/Circulation_of_blood_through_the_heart.png'),
        alt: 'Diagram tracing systemic and pulmonary blood flow through the four chambers and great vessels',
        caption: 'Trace the circuit in series: systemic veins → right heart → lungs → left heart → systemic arteries. Then repeat the path while naming pressure changes and valve states.',
        credit: 'Christinelmiller, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Circulation_of_blood_through_the_heart.png',
        license: 'CC BY-SA 4.0',
      },
    ],
    formulas: [
      { name: 'Cardiac output', latex: String.raw`CO = HR \times SV`, interpretation: 'Flow per minute is heart rate multiplied by blood ejected per beat.', variables: 'CO L/min; HR beats/min; SV L/beat' },
      { name: 'Oxygen delivery', latex: String.raw`DO_2 = CO \times CaO_2 \times 10`, interpretation: 'Systemic oxygen delivery couples pump flow to arterial oxygen content.', variables: 'DO₂ mL/min; CO L/min; CaO₂ mL/dL' },
    ],
  },
  'cardiac-cycle-and-pressure-volume-loops': {
    figures: [
      {
        src: '/images/curriculum/generated/pressure-volume-loop-atlas.png',
        alt: 'Counterclockwise left ventricular pressure-volume loop connected to cutaway hearts showing valve state during filling, isovolumetric contraction, ejection, and isovolumetric relaxation',
        caption: 'The loop is a cardiac cycle drawn in pressure–volume space: fill rightward, contract upward at fixed volume, eject leftward, then relax downward at fixed volume. Each corner is a valve event.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/pressure-volume-loop-atlas.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/preload-afterload-contractility.png',
        alt: 'Matched pressure-volume loops showing the independent effects of increased preload, increased afterload, and increased contractility',
        caption: 'Loading and contractility move the loop in different ways. Preload primarily raises end-diastolic volume, afterload raises systolic pressure and end-systolic volume, and greater contractility steepens the end-systolic relation while reducing end-systolic volume.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/preload-afterload-contractility.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: commons('1/1c/Cardiac_Pressure_Volume_Loop.jpg'),
        alt: 'Left ventricular pressure-volume loop labeled with valve events and phases of the cardiac cycle',
        caption: 'Width is stroke volume; enclosed area approximates external stroke work. Move the loop—not just the EF—when reasoning about loading conditions.',
        credit: 'Andyhenton83, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cardiac_Pressure_Volume_Loop.jpg',
        license: 'CC BY-SA 3.0',
      },
    ],
    formulas: [
      { name: 'Stroke volume', latex: String.raw`SV = EDV - ESV`, interpretation: 'The horizontal width of the pressure-volume loop.', variables: 'Volumes in mL' },
      { name: 'Ejection fraction', latex: String.raw`EF = \frac{EDV-ESV}{EDV} \times 100\%`, interpretation: 'A ratio of chamber emptying—not a direct measure of contractility.' },
      { name: 'Mean arterial pressure', latex: String.raw`MAP \approx DBP + \frac{1}{3}(SBP-DBP)`, interpretation: 'A useful approximation at normal heart rates; invasive integration is more exact.' },
    ],
  },
  'electrophysiology-and-reentry': {
    figures: [
      {
        src: '/images/curriculum/generated/cardiac-conduction-anatomy.png',
        alt: 'Cutaway heart showing the SA node, AV node, His bundle, bundle branches, fascicles, moderator band, and Purkinje network in anatomical context',
        caption: 'Conduction anatomy is spatial anatomy. The AV node–His inset localizes the vulnerable bridge through the fibrous skeleton; distal branching explains why fascicular and bundle disease produce characteristic activation patterns.',
        credit: 'AI-generated original medical illustration',
        sourceUrl: '/images/curriculum/generated/cardiac-conduction-anatomy.png',
        license: 'Gusdorf Cardiology · 2026',
        wide: true,
      },
      {
        src: '/images/curriculum/generated/cardiac-action-potentials-drug-targets.png',
        alt: 'Ventricular, Purkinje, atrial, and nodal action potentials with principal ionic currents and antiarrhythmic drug targets',
        caption: 'Action potentials are tissue-specific. Fast-response myocardium and Purkinje tissue depend on a sodium-mediated phase 0, while nodal upstroke is calcium-mediated; antiarrhythmic effects therefore depend on current, tissue, phase, and rate.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cardiac-action-potentials-drug-targets.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: commons('c/ce/Currents_responsible_for_the_cardiac_action_potential.png'),
        alt: 'Ventricular action potential phases with the principal sodium, calcium, and potassium currents',
        caption: 'Channel currents change across the action potential; drug effects therefore depend on phase, tissue, rate, and substrate.',
        credit: 'PeaBrainC, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Currents_responsible_for_the_cardiac_action_potential.png',
        license: 'CC BY-SA 4.0',
      },
    ],
    formulas: [{ name: 'Corrected QT (Fridericia)', latex: String.raw`QTc_F = \frac{QT}{\sqrt[3]{RR}}`, interpretation: 'Often less rate-distorted than Bazett at tachycardic or bradycardic extremes.', variables: 'QT and RR in seconds' }],
    resources: [{ label: 'Cardiac action potentials', source: 'LITFL', href: 'https://litfl.com/cardiac-action-potentials/' }],
  },
  'probability-and-cardiac-testing': {
    figures: [{
      src: '/images/curriculum/generated/pretest-posttest-probability.png',
      alt: 'Pretest probability spectrum, diagnostic test likelihood ratios, and post-test movement across testing and treatment thresholds',
      caption: 'A test result moves probability; it does not create probability from nothing. Positive and negative likelihood ratios update the starting estimate, and the resulting post-test probability—not the result in isolation—drives the next threshold decision.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/pretest-posttest-probability.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    formulas: [
      { name: 'Odds form of Bayes', latex: String.raw`Posttest\ odds = Pretest\ odds \times LR`, interpretation: 'A likelihood ratio updates odds; it does not replace the pretest estimate.' },
      { name: 'Probability to odds', latex: String.raw`Odds = \frac{p}{1-p}`, interpretation: 'Convert probability to odds before applying a likelihood ratio.' },
    ],
  },
  'heart-sounds-and-splitting': {
    figures: [{
      src: '/images/curriculum/generated/heart-sounds-timing.png',
      alt: 'Valve closures, auscultation areas, pressure tracings, ECG, and phonocardiogram aligned to S1, A2, P2, S3, and S4',
      caption: 'Heart sounds are mechanical events placed on a pressure–time map. Time S1 and S2 to valve closure, then place splitting and extra sounds within systole or diastole before naming a lesion.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/heart-sounds-timing.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    resources: [
      { label: 'Heart sounds and murmurs', source: 'LITFL', href: 'https://litfl.com/heart-sounds-and-murmurs/' },
      { label: 'Harvey recordings on this site', source: 'Gusdorf Cardiology', href: '/heart-sounds' },
    ],
  },
  'murmurs-and-dynamic-maneuvers': {
    figures: [
      {
        src: '/images/curriculum/generated/murmur-maneuvers.png',
        alt: 'Standing or Valsalva, squatting or leg raise, handgrip, and inspiration shown with their effects on preload, afterload, chamber size, and murmur intensity',
        caption: 'Dynamic auscultation is a controlled perturbation: change venous return, afterload, or right-heart filling and predict how the responsible gradient or regurgitant flow should respond.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/murmur-maneuvers.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: commons('9/9e/Phonocardiogram_of_aortic_stenosis-HE.PNG'),
        alt: 'Phonocardiogram showing the crescendo-decrescendo systolic murmur of aortic stenosis',
        caption: 'The systolic envelope follows the changing LV–aortic gradient; later peaking often accompanies more severe obstruction.',
        credit: 'Madhero88, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Phonocardiogram_of_aortic_stenosis-HE.PNG',
        license: 'CC BY-SA 3.0',
      },
    ],
    formulas: [{ name: 'Simplified Bernoulli equation', latex: String.raw`\Delta P \approx 4v^2`, interpretation: 'Doppler velocity becomes an estimated instantaneous pressure gradient.', variables: 'ΔP mmHg; v m/s' }],
  },
  'jugular-venous-examination': {
    figures: [
      {
        src: '/images/curriculum/generated/jvp-anatomy-waveform.png',
        alt: 'Reclined patient with internal and external jugular anatomy, vertical JVP measurement, and right atrial events aligned to a, c, and v waves and x and y descents',
        caption: 'Read the neck as a remote right-atrial pressure tracing. Measure vertically above the sternal angle, then time each wave to the atrial and tricuspid event that creates it.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/jvp-anatomy-waveform.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: commons('2/25/Wiggers_diagram_with_jugular_venous_waveform.png'),
        alt: 'Wiggers diagram aligning jugular venous waves with ECG, heart sounds, and chamber pressures',
        caption: 'Time each venous wave to atrial contraction, tricuspid motion, atrial filling, and early ventricular filling.',
        credit: 'Nootherone321, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wiggers_diagram_with_jugular_venous_waveform.png',
        license: 'CC BY-SA 4.0',
      },
    ],
    formulas: [{ name: 'Estimated right atrial pressure', latex: String.raw`RAP \approx h_{JVP} + 5\ \text{cm H}_2\text{O}`, interpretation: 'Add roughly 5 cm for the vertical distance from the sternal angle to the right atrium.', variables: 'hJVP is vertical height above the sternal angle' }],
    resources: [{ label: 'Central venous pressure waveform', source: 'LITFL', href: 'https://litfl.com/central-venous-pressure-cvp/' }],
  },
  'congestion-and-perfusion': {
    figures: [
      {
        src: '/images/curriculum/generated/congestion-perfusion-profiles.png',
        alt: 'Warm-dry, warm-wet, cold-dry, and cold-wet bedside profiles arranged by independent congestion and perfusion axes',
        caption: 'Congestion and perfusion are separate bedside axes. A patient can be wet yet warm, or dry yet cold; naming both dimensions is more useful than treating every heart-failure presentation as the same state.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/congestion-perfusion-profiles.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/arterial-pulse-contours.png',
        alt: 'Aortic and radial pulse anatomy with normal, parvus et tardus, water-hammer, bisferiens, alternans, and paradoxus pressure contours',
        caption: 'The arterial pulse is a pressure waveform available at the bedside. Its upstroke, amplitude, contour, beat-to-beat behavior, and respiratory variation connect palpable findings to valve, ventricular, and pericardial physiology.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/arterial-pulse-contours.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [{ name: 'Pulse pressure', latex: String.raw`PP = SBP - DBP`, interpretation: 'A narrow pulse pressure can be a bedside clue to low stroke volume, but arterial compliance and measurement conditions matter.' }],
  },
  'systematic-ecg-interpretation': {
    figures: [
      {
        src: '/images/curriculum/generated/ecg-territories-leads.png',
        alt: 'Twelve-lead electrode positions and viewing vectors mapped to septal, anterior, lateral, inferior, posterior, and right-ventricular myocardial territories',
        caption: 'Each ECG lead is a viewpoint, not a patch of myocardium. Group contiguous leads into spatial hypotheses, then remember that coronary supply varies with dominance and individual anatomy.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/ecg-territories-leads.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/wide-complex-tachycardia-mechanisms.png',
        alt: 'Matched cardiac activation maps comparing scar-mediated ventricular tachycardia, supraventricular tachycardia with bundle-branch aberrancy, and pre-excited tachycardia',
        caption: 'A wide tachycardia can begin in ventricular myocardium, traverse the normal atrioventricular axis with aberrant distal conduction, or recruit an accessory pathway. Mechanism—not hemodynamic stability—determines the diagnosis.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/wide-complex-tachycardia-mechanisms.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [
      { name: 'Rate from a regular rhythm', latex: String.raw`HR \approx \frac{300}{\text{large boxes between R waves}}`, interpretation: 'At 25 mm/s, the sequence is 300, 150, 100, 75, 60, 50.' },
      { name: 'Frontal QRS axis', latex: String.raw`Axis \approx \operatorname{atan2}(aVF, I)`, interpretation: 'The net QRS deflections in leads I and aVF define the quadrant; atan2 expresses the vector relationship.' },
    ],
    resources: [{ label: 'ECG basics', source: 'LITFL ECG Library', href: 'https://litfl.com/ecg-library/basics/' }],
  },
  'telemetry-and-artifact': {
    figures: [{
      src: '/images/curriculum/generated/telemetry-artifact.png',
      alt: 'Telemetry electrode sources and monitor strips comparing true rhythm, motion, tremor, loose electrode, baseline wander, electrical interference, and polymorphic ventricular tachycardia',
      caption: 'Artifact often leaves an organized QRS or pulse marching through the noise. A second lead and the patient’s pulse are parallel truth sources; true polymorphic VT should not preserve an orderly pleth waveform.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/telemetry-artifact.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    resources: [{ label: 'ECG artifact', source: 'LITFL ECG Library', href: 'https://litfl.com/ecg-artifact/' }],
  },
  'echocardiography-and-pocus': {
    figures: [
      {
        src: '/images/curriculum/generated/echo-windows-anatomy.png',
        alt: 'Transparent thoracic anatomy linking parasternal, apical, subcostal, and suprasternal probe positions to standard echocardiographic views',
        caption: 'An echo view is an insonation plane through three-dimensional anatomy. Start with the probe position and beam path, then identify chambers by their relationships rather than memorized screen coordinates.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/echo-windows-anatomy.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/diastolic-filling-echo.png',
        alt: 'Normal versus elevated filling pressure with mitral E and A waves, tissue Doppler e-prime, left atrial size, and pulmonary venous flow',
        caption: 'Diastolic assessment is a synthesis. Mitral inflow, annular relaxation velocity, atrial remodeling, pulmonary venous behavior, rhythm, and loading conditions must agree before assigning filling pressure.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/diastolic-filling-echo.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/lv-systolic-function-imaging.png',
        alt: 'Apical four-chamber anatomy with Simpson biplane end-diastolic and end-systolic volumes, ejection fraction, and global longitudinal strain',
        caption: 'Systolic imaging asks more than one question. Simpson volumes quantify chamber emptying, while longitudinal strain can reveal abnormal myocardial deformation even when ejection fraction remains preserved.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/lv-systolic-function-imaging.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: commons('4/41/Doppler_mitral_valve.gif'),
        alt: 'Animated Doppler echocardiography view across the mitral valve',
        caption: 'Doppler samples velocity along the ultrasound beam; alignment error systematically underestimates velocity and derived gradients.',
        credit: 'Kalumet, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Doppler_mitral_valve.gif',
        license: 'CC BY-SA 3.0',
      },
    ],
    formulas: [
      { name: 'Continuity equation', latex: String.raw`A_1v_1 = A_2v_2`, interpretation: 'Conservation of flow allows valve area to be derived from upstream area and velocity-time integrals.' },
      { name: 'LV mass (ASE)', latex: String.raw`LVM = 0.8\{1.04[(IVS+LVID+PWT)^3-LVID^3]\}+0.6`, interpretation: 'A geometric estimate that is highly sensitive to measurement error because dimensions are cubed.', variables: 'Linear dimensions in cm; mass in g' },
    ],
  },
  'troponin-and-natriuretic-peptides': {
    figures: [{
      src: '/images/curriculum/generated/cardiac-biomarkers.png',
      alt: 'Cardiomyocyte troponin release, acute versus chronic serial troponin patterns, multiple injury mechanisms, and BNP or NT-proBNP generation from wall stress',
      caption: 'Troponin establishes myocardial injury; serial change helps define acuity, while clinical evidence establishes mechanism. Natriuretic peptides report myocardial wall stress rather than a single diagnosis.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cardiac-biomarkers.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    formulas: [{ name: 'Relative biomarker change', latex: String.raw`\Delta_{rel} = \frac{Value_2-Value_1}{Value_1}\times100\%`, interpretation: 'The clinically appropriate delta is assay- and pathway-specific; many algorithms use absolute rather than relative change.' }],
  },
  'invasive-hemodynamics': {
    figures: [{
      src: '/images/curriculum/generated/right-heart-catheterization.png',
      alt: 'Balloon-tipped pulmonary artery catheter traversing the right heart with right atrial, right ventricular, pulmonary artery, and wedge pressure waveforms',
      caption: 'The catheter changes waveform as it crosses each chamber and valve. A wedge is a distal pulmonary-artery occlusion measurement that estimates downstream left-atrial pressure only when the tracing and position are valid.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/right-heart-catheterization.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    formulas: [
      { name: 'Fick cardiac output', latex: String.raw`CO = \frac{\dot V O_2}{CaO_2-CvO_2}`, interpretation: 'Flow equals oxygen consumption divided by the arteriovenous oxygen-content difference.' },
      { name: 'Systemic vascular resistance', latex: String.raw`SVR = 80\,\frac{MAP-RAP}{CO}`, interpretation: 'Resistance is the systemic pressure gradient divided by flow.', variables: 'dyn·s·cm⁻⁵' },
      { name: 'Pulmonary vascular resistance', latex: String.raw`PVR = \frac{mPAP-PAWP}{CO}`, interpretation: 'Always inspect the component measurements; an implausible wedge or output makes an implausible PVR.', variables: 'Wood units' },
    ],
    resources: [{ label: 'Pulmonary artery catheter waveforms', source: 'LITFL', href: 'https://litfl.com/pulmonary-artery-catheterisation/' }],
  },
  'heart-failure': {
    figures: [
      {
        src: '/images/curriculum/generated/heart-failure-remodeling.png',
        alt: 'Matched normal, HFpEF, and HFrEF cardiac cutaways with short-axis geometry and pressure-volume loop comparisons',
        caption: 'Heart failure phenotypes distort pressure, volume, and geometry differently. HFpEF commonly raises filling pressure in a stiff ventricle; HFrEF commonly shifts toward dilation, reduced emptying, and secondary mitral regurgitation.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/heart-failure-remodeling.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/heart-failure-neurohormonal-therapy.png',
        alt: 'Reduced cardiac output activating sympathetic and renin-angiotensin-aldosterone pathways, sodium retention, loading, remodeling, and four foundational HFrEF drug classes',
        caption: 'HFrEF activates compensatory systems that become maladaptive: sympathetic tone, RAAS signaling, sodium retention, loading, and remodeling reinforce one another. Foundational therapies interrupt different nodes of that cycle rather than serving as interchangeable diuretics.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/heart-failure-neurohormonal-therapy.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [{ name: 'Cardiac index', latex: String.raw`CI = \frac{CO}{BSA}`, interpretation: 'Indexes flow to body surface area; interpret beside perfusion rather than as an isolated cutoff.', variables: 'L/min/m²' }],
  },
  'valvular-heart-disease': {
    figures: [
      {
        src: '/images/curriculum/generated/four-valve-anatomy.png',
        alt: 'Superior oblique cardiac cutaway showing all four valves, the fibrous annuli, chordae, papillary muscles, coronary ostium, and aortic-mitral continuity',
        caption: 'The four valves share a crowded fibrous neighborhood but use two different support systems: chordal–papillary restraint for the AV valves and free-standing cusps for the semilunar valves.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/four-valve-anatomy.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/aortic-stenosis-hemodynamics.png',
        alt: 'Normal and calcific aortic valves with stenotic jet, concentric hypertrophy, Doppler alignment, continuity equation, and low-flow low-gradient physiology',
        caption: 'Aortic stenosis is valve morphology plus flow and ventricular response. Gradient rises with velocity, but low flow can hide severe obstruction; reconcile cusp motion, valve area, flow, gradient, and LV phenotype.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/aortic-stenosis-hemodynamics.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/primary-secondary-mitral-regurgitation.png',
        alt: 'Matched systolic cutaways comparing a flail leaflet and eccentric jet in primary mitral regurgitation with ventricular remodeling, tethering, annular dilation, and central regurgitation in secondary mitral regurgitation',
        caption: 'Primary MR begins in the valve apparatus; secondary MR begins in ventricular or atrial geometry. The distinction changes what must be repaired: a diseased leaflet in one case, the forces pulling an otherwise intact valve apart in the other.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/primary-secondary-mitral-regurgitation.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [
      { name: 'Aortic valve area', latex: String.raw`AVA = \frac{CSA_{LVOT}\times VTI_{LVOT}}{VTI_{AV}}`, interpretation: 'The continuity equation is vulnerable to LVOT diameter error, irregular rhythm, and poor Doppler alignment.' },
      { name: 'Mitral valve area by pressure half-time', latex: String.raw`MVA \approx \frac{220}{PHT}`, interpretation: 'Useful in selected mitral stenosis; unreliable when chamber compliance or flow changes materially.' },
    ],
  },
  'atrial-fibrillation': {
    figures: [
      {
        src: '/images/curriculum/generated/af-left-atrial-appendage.png',
        alt: 'Posterior left atrial cutaway showing pulmonary vein triggers, atrial fibrosis, left atrial appendage pectinate muscles, and appendage thrombus',
        caption: 'AF is both an electrical and thrombotic disease: pulmonary-vein triggers meet a remodeled atrium, while stasis and appendage anatomy create a protected niche for thrombus.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/af-left-atrial-appendage.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: commons('4/43/ECG_Atrial_Fibrillation_90_bpm.jpg'),
        alt: 'Twelve-lead ECG showing atrial fibrillation with an irregular ventricular response',
        caption: 'Confirm irregularly irregular R–R intervals and absence of organized, repetitive P waves on an ECG-quality tracing.',
        credit: 'Ewingdo, Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:ECG_Atrial_Fibrillation_90_bpm.jpg',
        license: 'CC BY-SA 4.0',
      },
    ],
    resources: [{ label: 'Atrial fibrillation ECG features', source: 'LITFL ECG Library', href: 'https://litfl.com/atrial-fibrillation-ecg-library/' }],
  },
  'acute-coronary-syndromes': {
    figures: [
      {
        src: '/images/curriculum/generated/endothelium-early-atherosclerosis.png',
        alt: 'Longitudinal coronary artery cutaway comparing normal endothelial microanatomy with endothelial dysfunction, LDL retention, foam cells, and early eccentric plaque',
        caption: 'Endothelium is a single-cell interface, not passive wallpaper. Loss of barrier and signaling function permits intimal lipid retention, leukocyte recruitment, foam-cell formation, and fibrous-cap remodeling long before the lumen tells the whole story.',
        credit: 'AI-generated original medical illustration',
        sourceUrl: '/images/curriculum/generated/endothelium-early-atherosclerosis.png',
        license: 'Gusdorf Cardiology · 2026',
        wide: true,
      },
      {
        src: '/images/curriculum/generated/plaque-rupture-coronary-thrombosis.png',
        alt: 'Coronary artery sequence showing thin-cap plaque rupture, platelet adhesion and aggregation, fibrin propagation, partial or complete occlusion, and downstream myocardial ischemia',
        caption: 'Acute coronary thrombosis begins when a thrombogenic plaque surface meets circulating platelets and coagulation. The resulting lumen compromise is dynamic; plaque burden, thrombus, vasomotion, and collateral flow all influence the clinical phenotype.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/plaque-rupture-coronary-thrombosis.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [{ name: 'Fractional flow reserve', latex: String.raw`FFR = \frac{P_d}{P_a}\ \text{during maximal hyperemia}`, interpretation: 'A pressure ratio used to estimate whether an epicardial stenosis limits maximal flow; it is not a plaque-vulnerability test.' }],
    resources: [{ label: 'Myocardial ischaemia and infarction', source: 'LITFL ECG Library', href: 'https://litfl.com/myocardial-ischaemia-ecg-library/' }],
  },
  'cardiomyopathies': {
    figures: [
      {
        src: '/images/curriculum/generated/cardiomyopathy-phenotypes.png',
        alt: 'Matched cutaway hearts comparing normal, dilated, hypertrophic, restrictive or infiltrative, arrhythmogenic right ventricular, and left ventricular noncompaction phenotypes',
        caption: 'Morphology is an entry point, not an etiology. Use the phenotype to choose the next causal questions—pedigree, loading, ischemia, inflammation, infiltration, toxins, rhythm, and genetics.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cardiomyopathy-phenotypes.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/hcm-dynamic-lvot-obstruction.png',
        alt: 'Diastolic and systolic cutaways of hypertrophic cardiomyopathy showing asymmetric septal hypertrophy, systolic anterior mitral motion, dynamic LV outflow obstruction, and mitral regurgitation',
        caption: 'Dynamic HCM obstruction emerges from geometry and loading: septal hypertrophy narrows the outflow tract, systolic anterior mitral motion narrows it further, and a smaller LV cavity can intensify the gradient and associated MR.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/hcm-dynamic-lvot-obstruction.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/amyloidosis-sarcoidosis.png',
        alt: 'Cardiac amyloidosis and sarcoidosis compared across anatomy, histology, ECG, echo, strain, CMR, and extracardiac clues',
        caption: 'Infiltrative and inflammatory cardiomyopathies can share heart-failure, conduction, and arrhythmic presentations while leaving different tissue patterns. Anatomy, extracardiac clues, electrical disease, and multimodality imaging must be reconciled before assigning cause.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/amyloidosis-sarcoidosis.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
  },
  'pericardial-and-myocardial-inflammation': {
    figures: [
      {
        src: '/images/curriculum/generated/pericardium-tamponade.png',
        alt: 'Layered fibrous and serous pericardial anatomy with effusion, chamber collapse, septal shift, venous congestion, and rising pericardial pressure in tamponade',
        caption: 'Tamponade is pressure physiology, not an effusion-size diagnosis. As pericardial pressure approaches chamber diastolic pressure, right-sided collapse and ventricular interdependence impair filling and output.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/pericardium-tamponade.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/cardiac-inflammation-spectrum.png',
        alt: 'Matched hearts comparing pericarditis, myocarditis, myopericarditis, and constrictive pericarditis by tissue compartment',
        caption: 'The injured compartment defines the syndrome: pericardial inflammation surrounds the heart, myocarditis involves muscle, overlap disease affects both, and chronic fibrosis can externally restrain diastolic filling.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cardiac-inflammation-spectrum.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
  },
  'pulmonary-hypertension-and-right-heart-failure': {
    figures: [
      {
        src: '/images/curriculum/generated/pulmonary-hypertension-rv-failure.png',
        alt: 'Progression from normal circulation to compensated pulmonary pressure overload and decompensated right ventricular failure with pulmonary arteriolar remodeling',
        caption: 'The RV first hypertrophies against increased afterload, then dilates and loses efficiency. Septal shift, functional TR, and venous congestion can reduce LV filling even when the primary pressure burden is pulmonary.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/pulmonary-hypertension-rv-failure.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/cteph-progression-treatment.png',
        alt: 'Progression from acute pulmonary embolism to organized thrombotic webs, mismatched perfusion defects, CTEPH, and right-heart failure with treatment options',
        caption: 'CTEPH is not simply persistent fresh clot. Organized fibrotic obstruction, secondary small-vessel disease, and chronic RV pressure overload require expert operability assessment across surgery, balloon intervention, and medical therapy.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cteph-progression-treatment.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [
      { name: 'Pulmonary vascular resistance', latex: String.raw`PVR = \frac{mPAP-PAWP}{CO}`, interpretation: 'Separates the transpulmonary gradient from the flow traversing it.', variables: 'Wood units' },
      { name: 'Transpulmonary gradient', latex: String.raw`TPG = mPAP - PAWP`, interpretation: 'A pressure difference, not a resistance; it remains flow-dependent.' },
    ],
  },
  'cardiovascular-pharmacology': {
    figures: [
      {
        src: '/images/curriculum/generated/cardiovascular-pharmacology-mechanisms.png',
        alt: 'Heart, vessels, kidney, autonomic signaling, arterial platelet thrombus, and fibrin-rich clot mapped to major cardiovascular drug mechanisms',
        caption: 'Cardiovascular drugs act on different compartments: pump, vascular tone, kidney, neurohormonal signaling, platelets, or coagulation. Naming the target prevents category errors—especially treating antiplatelet and anticoagulant therapy as interchangeable.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cardiovascular-pharmacology-mechanisms.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/antiplatelet-anticoagulant-mechanisms.png',
        alt: 'Platelet-rich arterial thrombosis and fibrin-rich venous or intracardiac thrombosis with antiplatelet and anticoagulant drug targets',
        caption: 'Antiplatelet drugs interrupt adhesion, activation, or aggregation in platelet-dominant arterial thrombosis; anticoagulants suppress factor Xa, thrombin, or fibrin generation. Real thrombi contain both systems, but the dominant mechanism guides therapy.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/antiplatelet-anticoagulant-mechanisms.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [{ name: 'Drug half-life', latex: String.raw`t_{1/2} = \frac{0.693\,V_d}{CL}`, interpretation: 'Volume of distribution and clearance determine the time course; organ dysfunction can therefore change accumulation.' }],
  },
  'coronary-angiography-and-pci': {
    figures: [
      {
        src: '/images/curriculum/generated/angiography-ivus-pci.png',
        alt: 'Three-panel comparison of coronary angiographic lumen silhouette, intravascular plaque cross-section, pressure wire, and a deployed coronary stent',
        caption: 'One lesion, three questions: angiography outlines the contrast lumen, intravascular imaging reveals plaque and vessel wall, and PCI scaffolds the selected segment. Pressure physiology addresses functional significance rather than plaque composition.',
        credit: 'AI-generated original medical illustration',
        sourceUrl: '/images/curriculum/generated/angiography-ivus-pci.png',
        license: 'Gusdorf Cardiology · 2026',
        wide: true,
      },
      {
        src: '/images/curriculum/generated/coronary-pressure-flow-physiology.png',
        alt: 'Pressure wire crossing a coronary stenosis with proximal and distal pressure waveforms for resting iFR and hyperemic FFR',
        caption: 'Angiography estimates lumen narrowing; pressure physiology asks whether that narrowing creates a meaningful pressure loss under defined conditions. iFR samples a resting wave-free period, while FFR uses maximal hyperemia.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/coronary-pressure-flow-physiology.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [{ name: 'Fractional flow reserve', latex: String.raw`FFR = \frac{P_d}{P_a}`, interpretation: 'Distal coronary pressure divided by aortic pressure during maximal hyperemia.' }],
  },
  'pacemakers-icds-and-crt': {
    figures: [{
      src: '/images/curriculum/generated/cied-lead-anatomy.png',
      alt: 'Comparative transvenous lead anatomy for a dual-chamber pacemaker, ICD, and CRT-D with a coronary sinus left ventricular lead',
      caption: 'Device names encode different jobs and lead paths: pacing preserves timing, an ICD adds defibrillation coils, and CRT adds a coronary-sinus tributary lead to recruit the LV from the epicardial surface.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cied-lead-anatomy.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    formulas: [{ name: 'Corrected sinus-node recovery time', latex: String.raw`CSNRT = SNRT - SCL`, interpretation: 'An electrophysiology measure of sinus-node recovery after pacing.', variables: 'SCL = baseline sinus cycle length' }],
    resources: [{ label: 'Pacemaker rhythms and troubleshooting', source: 'LITFL ECG Library', href: 'https://litfl.com/pacemaker-rhythms-normal-patterns/' }],
  },
  'cardioversion-and-ablation': {
    figures: [{
      src: '/images/curriculum/generated/cardioversion-af-ablation.png',
      alt: 'Synchronized cardioversion pad vectors and R-wave synchronization beside transseptal pulmonary-vein isolation anatomy and safety landmarks',
      caption: 'Cardioversion synchronizes energy to ventricular depolarization; AF ablation instead isolates atrial triggers at the pulmonary-vein antra. The procedures share a rhythm goal but act through different anatomy and timescales.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/cardioversion-af-ablation.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    formulas: [{ name: 'Electrical energy', latex: String.raw`E = \int V(t)I(t)\,dt`, interpretation: 'Delivered joules depend on the voltage–current waveform over time; pad position and transthoracic impedance affect current delivery.' }],
  },
  'chest-pain': {
    figures: [{
      src: '/images/curriculum/generated/dangerous-chest-pain.png',
      alt: 'Thoracic anatomy and insets for acute coronary occlusion, aortic dissection, pulmonary embolism, tension pneumothorax, esophageal rupture, and tamponade',
      caption: 'Dangerous chest pain crosses compartments. Symptoms overlap; localize the threatened anatomy—coronary artery, aortic wall, pulmonary artery, pleural space, pericardium, or esophagus—and choose the test that can see it.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/dangerous-chest-pain.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    formulas: [{ name: 'Posttest probability', latex: String.raw`p_{post} = \frac{LR\,p_{pre}}{1-p_{pre}+LR\,p_{pre}}`, interpretation: 'A direct probability form of Bayesian updating for one test result.' }],
  },
  'dyspnea-and-edema': {
    figures: [{
      src: '/images/curriculum/generated/dyspnea-pocus-differential.png',
      alt: 'Bedside ultrasound comparison of diffuse B-lines, pleural effusion, focal pneumonia consolidation, right-ventricular strain, and a plethoric inferior vena cava',
      caption: 'Dyspnea POCUS is a pattern-combination exercise. Diffuse B-lines, focal consolidation, pleural fluid, RV geometry, and venous congestion answer different questions; no single image should substitute for the clinical syndrome.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/dyspnea-pocus-differential.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
    formulas: [{ name: 'Alveolar gas equation', latex: String.raw`P_{AO_2}=F_{IO_2}(P_B-P_{H_2O})-\frac{P_{aCO_2}}{R}`, interpretation: 'Useful when separating hypoventilation from V/Q mismatch or shunt in dyspnea.' }],
  },
  'palpitations-and-syncope': {
    figures: [{
      src: '/images/curriculum/generated/syncope-mechanisms.png',
      alt: 'Reflex, orthostatic, arrhythmic, and structural syncope mechanisms converging on transient reduction in cerebral perfusion',
      caption: 'Syncope is a final common pathway—transient global cerebral hypoperfusion—with several upstream mechanisms. History, position, rhythm, structural disease, and recovery pattern identify which route is most plausible.',
      credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/syncope-mechanisms.png', license: 'Gusdorf Cardiology · 2026', wide: true,
    }],
  },
  'shock': {
    figures: [
      {
        src: '/images/curriculum/generated/shock-phenotypes.png',
        alt: 'Hypovolemic, cardiogenic, obstructive, and distributive shock phenotypes with compartment-specific hemodynamic patterns',
        caption: 'Shock is inadequate tissue perfusion reached through different mechanisms. In obstruction, right-sided pressure may rise while LV filling falls—one reason a single undifferentiated “preload” label can mislead.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/shock-phenotypes.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
      {
        src: '/images/curriculum/generated/mechanical-circulatory-support.png',
        alt: 'Anatomical comparison of intra-aortic balloon pump, transvalvular left-ventricular support, and peripheral VA-ECMO',
        caption: 'Support devices alter different parts of the circulation. IABP changes aortic timing, a transvalvular pump unloads the LV while adding forward flow, and peripheral VA-ECMO supplies systemic flow and gas exchange but can increase LV afterload.',
        credit: 'AI-generated original medical illustration', sourceUrl: '/images/curriculum/generated/mechanical-circulatory-support.png', license: 'Gusdorf Cardiology · 2026', wide: true,
      },
    ],
    formulas: [
      { name: 'Mean arterial pressure', latex: String.raw`MAP \approx CO\times SVR + RAP`, interpretation: 'Pressure can be restored by flow, resistance, or both; the same MAP can hide very different shock physiology.' },
      { name: 'Shock index', latex: String.raw`SI = \frac{HR}{SBP}`, interpretation: 'A rapid screening ratio; trends and clinical context are more useful than a single universal threshold.' },
    ],
  },
};

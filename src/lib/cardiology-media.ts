export type CardiologyMedia = {
  id: string; title: string; description: string; modality: string; category?: string;
  src: string; sourcePage: string; creator: string; credit?: string; license: string;
  licenseUrl: string; changes: string; width?: number; height?: number; mime: string;
  mediaKind?: string; poster?: string;
};

export type MediaInterpretation = {
  orientation: string;
  checklist: string[];
  supportedFindings: string[];
  clinicalMeaning: string;
  pitfalls: string[];
  sourceClaim: string;
  differential: string[];
  missingData: string[];
  selfTest: { prompt: string; answer: string };
};

const acronyms: Record<string,string> = {
  cmr:'CMR', mri:'MRI', ct:'CT', tee:'TEE', tte:'TTE', lv:'LV', rv:'RV', lvot:'LVOT',
  hcm:'HCM', arvc:'ARVC', asd:'ASD', vsd:'VSD', tavi:'TAVI', ivus:'IVUS', ivc:'IVC',
  '3d':'3D', '4d':'4D', dense:'DENSE', ecg:'ECG', mr:'MR', tr:'TR', ar:'AR', as:'AS',
};

export function displayTitleFor(item: CardiologyMedia): string {
  let title = item.title
    .replace(/\.(gif|ogv|webm|mp4|mov|jpe?g|png)$/i, '')
    .replace(/\s*\(CardioNetworks ECHOpedia\)\s*/gi, '')
    .replace(/\s+[EM]{1,2}\d{4,}\s*$/i, '')
    .replace(/[-_](?:\d{4}-\d{3,4}X?-\d+(?:-\d+)?|pone\.\d+)[.-]*(?:s|f)\d+\s*$/i, '')
    .replace(/[-_]\d{5,}\.f\d+\s*$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/^\d+\s+(?=[A-Za-z])/,'')
    .replace(/\s+/g, ' ')
    .trim();
  if (/^clip\s*\d+$/i.test(title)) {
    const usefulDescription = item.description.split(/[.;]/)[0]?.trim();
    title = usefulDescription && !/^moving .* teaching example/i.test(usefulDescription)
      ? usefulDescription
      : `${item.modality} cine study`;
  }
  title = title.replace(/\b[a-zA-Z0-9]+\b/g, word => acronyms[word.toLowerCase()] ?? word);
  return title || `${item.modality} study`;
}

export function sourceNameFor(item: CardiologyMedia): string {
  if (/wikimedia/i.test(item.category ?? '') || /commons\.wikimedia/i.test(item.sourcePage)) return 'Wikimedia Commons';
  if (/minnesota|vhlab/i.test(`${item.category ?? ''} ${item.sourcePage}`)) return 'University of Minnesota Cardiac Atlas';
  if (/echopedia|cardionetworks/i.test(`${item.title} ${item.creator} ${item.sourcePage}`)) return 'ECHOpedia / CardioNetworks';
  return 'Original publisher';
}

const diseaseGuides: Array<{match: RegExp; findings: string[]; meaning: string; pitfalls: string[]}> = [
  { match:/aortic stenosis|stenotic aortic/i, findings:['Assess cusp opening and calcification, then look for secondary LV hypertrophy and systolic consequences.','Severity cannot be assigned from morphology alone; it requires Doppler velocity/gradient, valve area, flow state, and clinical concordance.'], meaning:'The moving anatomy can support the mechanism of fixed LV outflow obstruction, but the cine is one component of a complete valve assessment.', pitfalls:['Do not infer severe AS from restricted-looking leaflets without hemodynamic measurements.'] },
  { match:/hypertrophic|HCM|LVOT|systolic anterior motion/i, findings:['Look for asymmetric hypertrophy, systolic anterior motion of the mitral valve, mitral–septal contact, and associated posteriorly directed MR.','Compare chamber size and wall thickening through the cardiac cycle.'], meaning:'These features can support hypertrophic cardiomyopathy and dynamic obstruction; provocation and Doppler establish the physiologic burden.', pitfalls:['Do not diagnose HCM from apparent wall thickness in an off-axis view.','A cine cannot provide an LVOT gradient.'] },
  { match:/mitral regurg|flail mitral|mitral prolapse|papillary/i, findings:['Identify leaflet motion, coaptation failure, flail or prolapsing segments, and the direction of any color-flow jet when Doppler is present.','Look for LV and LA remodeling, recognizing that acute severe MR may precede chamber enlargement.'], meaning:'Morphology localizes the mechanism of regurgitation; severity requires an integrated Doppler and chamber-response assessment.', pitfalls:['Jet area alone is not a severity measure.','Eccentric wall-hugging jets are easily underestimated.'] },
  { match:/aortic regurg|aortic insuff/i, findings:['Inspect cusp coaptation and, if color Doppler is present, the origin and direction of diastolic regurgitant flow.','Assess LV size and function for chronic volume-overload consequences.'], meaning:'The study can demonstrate the regurgitant mechanism, but severity requires multiparametric Doppler assessment and clinical context.', pitfalls:['Do not grade AR from a single color jet or cine plane.'] },
  { match:/tricuspid regurg/i, findings:['Look for incomplete tricuspid coaptation, annular dilation, RV/RA enlargement, and systolic hepatic-vein flow reversal when spectral Doppler is available.'], meaning:'The cine may establish mechanism and right-heart consequences; severity remains multiparametric.', pitfalls:['Loading conditions can substantially change apparent TR severity.'] },
  { match:/tamponade|pericardial effusion/i, findings:['Identify the distribution and size of pericardial fluid, right-atrial systolic collapse, right-ventricular early-diastolic collapse, and IVC plethora.','Respiratory Doppler variation and the bedside hemodynamic picture determine physiologic significance.'], meaning:'Echo findings support tamponade physiology; tamponade itself is a clinical-hemodynamic diagnosis.', pitfalls:['A large effusion is not synonymous with tamponade.','Positive-pressure ventilation alters expected respiratory findings.'] },
  { match:/pulmonary embol|RV strain|right ventricular dysfunction|pulmonary hypertension/i, findings:['Compare RV with LV size, inspect RV free-wall motion and septal shape, and assess right-atrial size and TR when visible.','Look for pressure-overload signs rather than relying on any single named sign.'], meaning:'Right-heart abnormalities can support pressure overload but do not identify its cause by themselves.', pitfalls:['McConnell-type regional motion is not specific for acute PE.','Chronic pulmonary hypertension can mimic acute RV strain.'] },
  { match:/dilated cardiomy|heart failure|reduced ejection|HFrEF/i, findings:['Assess global LV size and systolic thickening, regional versus global dysfunction, RV involvement, and functional MR.','Estimate function across multiple views rather than from one dramatic frame.'], meaning:'The cine demonstrates ventricular phenotype; etiology requires coronary, valvular, rhythm, genetic, toxic, and inflammatory assessment.', pitfalls:['Visual EF from one view is imprecise.','Foreshortening can make the apex and LV volumes misleading.'] },
  { match:/amyloid/i, findings:['Look for increased wall thickness, small ventricular cavity, biatrial enlargement, valve thickening, and pericardial effusion.','On CMR, tissue characterization—not cine morphology alone—is central.'], meaning:'Morphology may raise suspicion for an infiltrative phenotype but does not establish amyloidosis.', pitfalls:['Hypertension and HCM can produce similar wall thickening.'] },
  { match:/sarcoid/i, findings:['Evaluate global and regional function, focal thinning or aneurysm, and RV involvement.','CMR diagnosis depends heavily on edema and late-gadolinium enhancement sequences, which may not be represented in a cine loop.'], meaning:'Cine abnormalities can localize dysfunction but cannot establish active cardiac sarcoidosis.', pitfalls:['A normal cine does not exclude cardiac sarcoidosis.'] },
  { match:/arrhythmogenic|dysplasia|ARVC/i, findings:['Assess RV size, global function, and regional akinesia, dyskinesia, or aneurysm; also inspect LV involvement.'], meaning:'Motion abnormalities contribute to an arrhythmogenic cardiomyopathy evaluation but must be interpreted within formal imaging, ECG, rhythm, family, and genetic criteria.', pitfalls:['Normal RV variants and off-axis imaging can mimic regional dyskinesia.'] },
  { match:/myocardial infarct|infarction|ischemi/i, findings:['Look for regional wall-motion abnormality in a coronary distribution, wall thinning, aneurysm, or mechanical complication.','On CMR, cine function and late-gadolinium enhancement answer different questions.'], meaning:'Regional dysfunction may support ischemic injury; scar, edema, perfusion, and coronary anatomy determine acuity and etiology.', pitfalls:['Wall-motion abnormality is not specific for acute infarction.'] },
  { match:/endocarditis|vegetation|abscess/i, findings:['Inspect valve surfaces for independently mobile masses, leaflet destruction, perforation, regurgitation, and peri-annular complications.'], meaning:'A compatible moving lesion can support infective endocarditis, but microbiology, pretest probability, and a complete TTE/TEE examination remain essential.', pitfalls:['Artifacts, Lambl excrescences, thrombus, and degenerative tissue can mimic vegetation.'] },
  { match:/dissection/i, findings:['Look for an intimal flap separating true and false lumens, aortic regurgitation, pericardial effusion, and branch-vessel involvement when the field of view permits.'], meaning:'A demonstrated flap is a high-risk structural finding requiring complete aortic imaging and urgent clinical integration.', pitfalls:['Motion artifact in the ascending aorta can mimic a flap.'] },
  { match:/septal defect|\bASD\b|\bVSD\b|shunt|Gerbode/i, findings:['Define the defect location and relationship to valves, then use color and spectral Doppler to establish flow direction and velocity when available.','Assess chamber enlargement as evidence of hemodynamic consequence.'], meaning:'Anatomic visualization identifies a possible communication; shunt magnitude and significance require Doppler, oximetry, or cross-sectional quantification.', pitfalls:['Color dropout can mimic a defect, while suboptimal alignment can conceal one.'] },
];

const clinicalExtensions: Array<{match: RegExp; differential: string[]; missingData: string[]; prompt: string; answer: string}> = [
  { match:/aortic stenosis|stenotic aortic/i, differential:['True severe high-gradient AS','Low-flow, low-gradient severe AS','Pseudo-severe or moderate AS with restricted-looking cusps'], missingData:['Peak velocity, mean gradient, and LVOT-derived valve area','Stroke-volume index and dimensionless index','Blood pressure, symptoms, and LV response'], prompt:'Which three measurements prevent you from grading aortic stenosis from leaflet appearance alone?', answer:'At minimum: peak velocity, mean gradient, and calculated valve area; discordant studies also require flow state and dimensionless index.' },
  { match:/mitral regurg|flail mitral|mitral prolapse|papillary/i, differential:['Primary leaflet/chordal disease','Secondary ventricular functional MR','Atrial functional MR from annular dilation'], missingData:['Vena contracta and quantitative regurgitant volume/fraction','Pulmonary-vein flow and CW Doppler profile','LV/LA size, pulmonary pressure, and loading conditions'], prompt:'What separates mechanism from severity in mitral regurgitation?', answer:'Morphology and jet direction suggest mechanism; an integrated Doppler and chamber-response assessment establishes severity.' },
  { match:/aortic regurg|aortic insuff/i, differential:['Primary cusp disease','Aortic-root or ascending-aortic dilation','Endocarditic perforation or acute dissection'], missingData:['Vena contracta, flow reversal, pressure half-time, and quantitative flow','LV size/function and aortic dimensions','Clinical tempo and blood pressure'], prompt:'Why can acute severe AR look less impressive than chronic AR?', answer:'There may be no time for LV dilation, and rapid pressure equalization can shorten or soften the murmur and Doppler signal.' },
  { match:/endocarditis|vegetation|abscess/i, differential:['Vegetation or peri-annular infection','Degenerative tissue or Lambl excrescence','Thrombus, suture material, or imaging artifact'], missingData:['Multiple TTE/TEE planes and comparison imaging','Blood cultures and clinical probability','Valve destruction, regurgitation, and peri-annular extension'], prompt:'Why is a mobile valve mass not automatically endocarditis?', answer:'Several normal and pathologic structures mimic vegetation; diagnosis integrates microbiology, clinical probability, and destructive valve findings.' },
  { match:/dissection/i, differential:['True intimal flap','Reverberation or motion artifact','Atherosclerotic plaque or intramural hematoma'], missingData:['Complete gated CT/MR or TEE evaluation of the aorta','Aortic regurgitation, branch vessels, and pericardium','Clinical syndrome and pulse/perfusion findings'], prompt:'What feature makes an apparent aortic flap more convincing?', answer:'Independent motion with separation of true and false lumens in more than one plane, ideally confirmed by definitive aortic imaging.' },
  { match:/hypertrophic|HCM|LVOT|systolic anterior motion/i, differential:['Sarcomeric HCM','Hypertensive or valvular remodeling','Infiltrative/storage phenocopy or athlete remodeling'], missingData:['Maximal wall thickness in properly aligned views','Resting and provoked LVOT gradient','CMR tissue characterization, pedigree, and genetics when appropriate'], prompt:'What turns hypertrophy into obstructive physiology?', answer:'Dynamic systolic narrowing with SAM/mitral–septal contact and a measurable resting or provoked LVOT gradient.' },
  { match:/dilated cardiomy|heart failure|reduced ejection|HFrEF/i, differential:['Ischemic cardiomyopathy','Genetic or idiopathic DCM','Toxic, inflammatory, tachycardia-mediated, or valvular disease'], missingData:['Quantified biplane EF and ventricular volumes','Regional pattern, coronary assessment, and CMR tissue characterization','Rhythm history, exposures, laboratory clues, and pedigree'], prompt:'Why is “dilated cardiomyopathy” a phenotype rather than an etiology?', answer:'Many distinct diseases produce dilation and systolic dysfunction; cause requires history, coronary evaluation, tissue characterization, and sometimes genetics.' },
  { match:/pulmonary embol|RV strain|right ventricular dysfunction|pulmonary hypertension/i, differential:['Acute RV pressure load such as PE','Chronic pulmonary hypertension','RV infarction, cardiomyopathy, or volume overload'], missingData:['RV/LV ratio, TAPSE/S′/FAC, septal shape, and TR velocity','CT/VQ or pulmonary vascular evaluation as appropriate','Prior imaging and invasive hemodynamics when classification matters'], prompt:'Why can echo support but not diagnose pulmonary embolism?', answer:'RV pressure-overload signs are not cause-specific and may be chronic; pulmonary vascular imaging and clinical probability establish PE.' },
  { match:/tamponade|pericardial effusion/i, differential:['Effusion without hemodynamic effect','Tamponade physiology','Pleural fluid, epicardial fat, or loculated postoperative collection'], missingData:['Right-sided chamber collapse timing','Respiratory Doppler variation and IVC response','Blood pressure, pulsus, ventilation status, and clinical trajectory'], prompt:'What makes tamponade a physiologic diagnosis?', answer:'Pressure impairs filling and output; effusion size alone does not establish that consequence.' },
  { match:/myocardial infarct|infarction|ischemi|wall motion/i, differential:['Acute or chronic ischemic injury','Stress cardiomyopathy','Myocarditis, pacing/conduction abnormality, or postsurgical motion'], missingData:['Coronary distribution across multiple views','ECG, serial troponin, symptoms, and prior imaging','Perfusion and CMR edema/scar imaging when needed'], prompt:'Can a regional wall-motion abnormality date an infarct?', answer:'Not reliably; prior imaging, wall thickness, ECG/biomarker trajectory, perfusion, and tissue characterization establish acuity.' },
  { match:/septal defect|\bASD\b|\bVSD\b|shunt|Gerbode/i, differential:['True intracardiac communication','Color or tissue-dropout artifact','Alternative shunt level or postoperative residual flow'], missingData:['Defect rims/location in orthogonal planes','Color/spectral direction and velocity','Qp:Qs or oximetry plus chamber remodeling'], prompt:'What establishes whether a visible septal defect is hemodynamically important?', answer:'Shunt magnitude and chamber consequences—not the anatomic hole alone.' },
  { match:/prosthe|mechanical valve|bioprosth/i, differential:['Normal prosthetic motion and expected gradients','Thrombosis or pannus obstruction','Structural degeneration, dehiscence, or paravalvular leak'], missingData:['Valve type/size and expected reference hemodynamics','Doppler velocity index, acceleration time, gradients, and regurgitation','TEE, fluoroscopy, or CT when leaflet motion is uncertain'], prompt:'Why must a prosthetic gradient be compared with valve type and flow?', answer:'Expected gradients vary by design and size, while high flow can elevate gradients without obstruction.' },
  { match:/bicuspid/i, differential:['Bicuspid aortic valve phenotype','Tricuspid valve with commissural fusion or poor visualization','Unicuspid or other congenital valve morphology'], missingData:['Systolic short-axis morphology in multiple frames','Doppler stenosis/regurgitation assessment','Aortic-root and ascending-aortic dimensions'], prompt:'What additional structure must always be evaluated with a bicuspid aortic valve?', answer:'The entire visible thoracic aorta because bicuspid valve disease is associated with aortopathy.' },
];

export function interpretationFor(item: CardiologyMedia): MediaInterpretation {
  const text = `${item.title} ${item.description}`;
  const isCmr = /MRI|magnetic/i.test(item.modality);
  const isEcho = /echo|ultrasound/i.test(item.modality);
  const orientation = isCmr
    ? 'First identify the cine plane (short axis, two-/three-/four-chamber, or outflow view), then track chamber motion from end-diastole through end-systole. This appears to be a cine sequence; tissue characterization requires the corresponding T1/T2, perfusion, or late-gadolinium series.'
    : isEcho
      ? 'First name the acoustic window and view, then confirm orientation and image quality before interpreting anatomy. Sweep through the loop more than once: chambers and valves first, global function second, then the focal abnormality.'
      : 'Identify the modality, projection, anatomic orientation, and phase of acquisition before assigning a finding. Compare the visible structure with the source label and note what lies outside the field of view.';
  const checklist = isCmr
    ? ['Name the plane and sequence type.','Compare LV and RV size and systolic motion.','Separate global from regional dysfunction.','Inspect valves, septa, pericardium, and great vessels that are visible.','State which tissue-characterization or flow data are missing.']
    : isEcho
      ? ['Name the window/view and judge adequacy.','Assess chamber size and global systolic function.','Inspect valve morphology and motion.','Look for regional wall-motion, septal, pericardial, and great-vessel abnormalities.','Use Doppler measurements—not appearance alone—for hemodynamic severity.']
      : ['Name the projection and anatomy.','Describe the visible abnormality before naming a diagnosis.','Look for secondary chamber or vascular consequences.','State the additional views or measurements needed.'];
  const guide = diseaseGuides.find(entry=>entry.match.test(text));
  const extension = clinicalExtensions.find(entry=>entry.match.test(text));
  const sourceClaim = item.description?.trim() || `The source labels this as ${displayTitleFor(item)}.`;
  return {
    orientation,
    checklist,
    supportedFindings: guide?.findings ?? ['The source identifies this asset as the finding described above. The available record does not provide enough adjudicated measurements to make a more specific patient-level interpretation.','Use the loop to practice systematic description, then return to the original source for the complete case and acquisition context.'],
    clinicalMeaning: guide?.meaning ?? 'This is a teaching example rather than a complete diagnostic study. Its value is pattern recognition; clinical conclusions require the full examination, measurements, and patient context.',
    pitfalls: guide?.pitfalls ?? ['Do not infer severity, acuity, or etiology from a single selected loop.','The source label has not been independently adjudicated by this site.'],
    sourceClaim,
    differential: extension?.differential ?? (isCmr
      ? ['Normal or physiologic variation','Primary myocardial disease','Loading, ischemic, inflammatory, or technical explanation for the visible pattern']
      : isEcho
        ? ['Normal variant or acquisition artifact','Primary structural lesion','Secondary change caused by loading conditions or another cardiac process']
        : ['True structural abnormality','Normal variant','Projection or acquisition artifact']),
    missingData: extension?.missingData ?? (isCmr
      ? ['Orthogonal cine planes and quantified ventricular volumes/function','T1/T2, perfusion, and late-gadolinium enhancement when clinically relevant','Clinical context, ECG, and comparison imaging']
      : isEcho
        ? ['A complete set of standard views','Quantitative color and spectral Doppler measurements','Loading conditions, rhythm, symptoms, and prior studies']
        : ['Additional projections or sequences','Quantitative measurements','Clinical context and comparison imaging']),
    selfTest: extension
      ? { prompt: extension.prompt, answer: extension.answer }
      : { prompt: `Before reading the source label, how would you describe this ${item.modality.toLowerCase()} study in one sentence?`, answer: 'A strong answer names the view and modality, describes anatomy and motion without overcalling severity, identifies the dominant visible pattern, and states what data are missing.' },
  };
}

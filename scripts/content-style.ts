import { textSegments } from '../src/components/textSegments.ts';

/** Small editorial check, not a dictionary or a suffix-based spelling rule. */
export const britishForms: Record<string, string> = {
  analyze: 'analyse', analyzes: 'analyses', analyzed: 'analysed', analyzing: 'analysing',
  behavior: 'behaviour', behaviors: 'behaviours', center: 'centre', centered: 'centred',
  characterize: 'characterise', characterizes: 'characterises', characterization: 'characterisation',
  color: 'colour', colors: 'colours', favor: 'favour', favors: 'favours',
  initialize: 'initialise', localizing: 'localising', localization: 'localisation',
  maximize: 'maximise', maximizes: 'maximises', maximizer: 'maximiser',
  minimize: 'minimise', minimizes: 'minimises', minimized: 'minimised',
  modeling: 'modelling', normalize: 'normalise', normalized: 'normalised',
  normalization: 'normalisation', normalizable: 'normalisable', optimization: 'optimisation',
  parameterization: 'parametrisation', parametrization: 'parametrisation',
  parameterized: 'parametrised', randomization: 'randomisation', randomized: 'randomised',
  realized: 'realised', standardization: 'standardisation', standardized: 'standardised',
};
export function americanProseWords(text: string, preservedNames: readonly string[] = []): string[] {
  // Delimiters match MathText. Never change notation or TeX command names.
  let prose = textSegments(text).filter(s => s.kind === 'text').map(s => s.text).join(' ')
    .replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, ' ');
  // Exact exemptions for proper names/source quotations must be documented by callers.
  for (const name of preservedNames) prose = prose.replaceAll(name, '');
  return [...new Set((prose.match(/[A-Za-z]+/g) ?? []).map(w => w.toLowerCase()).filter(w => Object.hasOwn(britishForms, w)))];
}

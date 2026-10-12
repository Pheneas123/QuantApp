import { objectives } from './objectives';
import { guidedProblems } from './guided';
import { writtenProblems } from './written';
import { quickMappings } from './quickMappings';
import { validateObjectives, validateProblems } from '../schema';
export { objectives, guidedProblems, writtenProblems, quickMappings };
validateObjectives(objectives);
validateProblems(guidedProblems,'guided',objectives);
validateProblems(writtenProblems,'written',objectives);

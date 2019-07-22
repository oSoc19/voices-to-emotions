export const GENDER_ENUMS: { [key: string]: string } = {
  M: 'Male',
  F: 'Female',
  X: 'Gender X'
};

export default function getGenderString(g: string): string {
  let found = GENDER_ENUMS[g];
  if (found) {
    return found;
  }
  return 'Unknown Gender';
}

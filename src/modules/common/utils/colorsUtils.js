const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const totalColors = colors.length;
export const colorClasses = colors.map(color => `bg-${color}-100 text-${color}-800`);

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

export function randomColor() {
  return colorClasses[generateRandomInteger(totalColors)];
}

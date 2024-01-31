export function capitalizeStr(text: string): string {
  return text
    .split('_')
    .map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join(' ');
}

// Joins class names, skipping falsy values (replacement for Astro's class:list).
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

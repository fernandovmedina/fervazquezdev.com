import { icons, type IconName } from "@/icons";

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  const icon = icons[name];
  return (
    <svg
      viewBox={icon.viewBox}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}

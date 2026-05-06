import { Menu } from "lucide-react";

type SideMenuButtonProps = {
  isSideOpen: boolean;
  onOpen: () => void;
};

export function SideMenuButton({
  isSideOpen,
  onOpen,
}: SideMenuButtonProps) {
  return (
    <button
      className="btn bg-white shadow-sm position-fixed d-inline-flex align-items-center justify-content-center p-0"
      style={{
        top: 12,
        left: 12,
        zIndex: 500,
        width: 40,
        height: 40,
        borderRadius: 16,
      }}
      aria-label="메뉴 열기"
      aria-expanded={isSideOpen}
      aria-controls="side-nav"
      onClick={onOpen}
    >
      <Menu style={{ width: 20, height: 20 }} />
    </button>
  );
}
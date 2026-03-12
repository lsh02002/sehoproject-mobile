import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

type Option = { label: string; value: string; disabled?: boolean };

type SelectArrayProps = {
  name: string;
  title: string;
  values: string[];
  setValues: (v: string[]) => void;
  options: Option[];
  placeholder?: string;
  maxMenuHeight?: number;
};

const SelectArrayInput = ({
  name,
  title,
  values,
  setValues,
  options,
  placeholder,
  maxMenuHeight = 220,
}: SelectArrayProps) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLButtonElement | null>(null);

  const [menuPos, setMenuPos] = useState<{
    left: number;
    top: number;
    width: number;
    maxH: number;
  } | null>(null);

  const mapByValue = useMemo(
    () => new Map(options.map((o) => [o.value, o] as const)),
    [options]
  );

  const toggleValue = (v: string) => {
    setValues(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  };

  const computeMenuPosition = useCallback(() => {
  const el = boxRef.current;
  if (!el) return;

  const r = el.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const spaceBelow = viewportH - r.bottom - 12;
  const desiredH = Math.min(maxMenuHeight, Math.max(spaceBelow, 160));

  setMenuPos({
    left: r.left,
    top: r.bottom + 8,
    width: r.width,
    maxH: desiredH,
  });
}, [maxMenuHeight]);

  useEffect(() => {
    if (!open) return;
    computeMenuPosition();
    const onResize = () => computeMenuPosition();
    const onScroll = () => computeMenuPosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open, maxMenuHeight, computeMenuPosition]);

  const handleBoxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((prev) => !prev);
      if (!open) {
        setFocusedIndex(0);
        requestAnimationFrame(computeMenuPosition);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setFocusedIndex(0);
        requestAnimationFrame(computeMenuPosition);
      } else {
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (open) setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleItemKeyDown = (
    e: React.KeyboardEvent,
    idx: number,
    v: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleValue(v);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
      setFocusedIndex(-1);
      boxRef.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
      setFocusedIndex(-1);
    }
  };

  const isPlaceholder = values.length === 0;
  const selectedChips = values
    .map((v) => mapByValue.get(v)?.label || v)
    .filter(Boolean);

  return (
    <Container ref={wrapRef}>
      <label htmlFor={name}>{title}</label>

      <SelectBox
        id={name}
        ref={boxRef}
        type="button"
        $isPlaceholder={isPlaceholder}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) {
            setFocusedIndex(0);
            requestAnimationFrame(computeMenuPosition);
          }
        }}
        onKeyDown={handleBoxKeyDown}
      >
        {isPlaceholder ? (
          <span className="placeholder">
            {placeholder || `${title}을(를) 선택하세요`}
          </span>
        ) : (
          <ChipRow>
            {selectedChips.map((label, i) => (
              <Chip key={`${label}-${i}`}>{label}</Chip>
            ))}
          </ChipRow>
        )}
        <Caret aria-hidden>▾</Caret>
      </SelectBox>

      {open &&
        menuPos &&
        ReactDOM.createPortal(
          <PortalBackdrop
            onMouseDown={() => {
              setOpen(false);
              setFocusedIndex(-1);
            }}
          >
            <PortalMenu
              role="listbox"
              aria-multiselectable="true"
              $left={menuPos.left}
              $top={menuPos.top}
              $width={menuPos.width}
              $maxH={menuPos.maxH}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {options.length === 0 && <EmptyItem>해당 {title}이 없습니다.</EmptyItem>}

              {options.map((opt, idx) => {
                const checked = values.includes(opt.value);
                const disabled = !!opt.disabled;
                return (
                  <MenuItem
                    key={opt.value}
                    role="option"
                    aria-selected={checked}
                    tabIndex={0}
                    $focused={idx === focusedIndex}
                    $disabled={disabled}
                    onClick={() => !disabled && toggleValue(opt.value)}
                    onKeyDown={(e) => handleItemKeyDown(e, idx, opt.value)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                  >
                    <input
                      type="checkbox"
                      tabIndex={-1}
                      checked={checked}
                      readOnly
                      disabled={disabled}
                    />
                    <span>{opt.label}</span>
                  </MenuItem>
                );
              })}
            </PortalMenu>
          </PortalBackdrop>,
          document.body
        )}
    </Container>
  );
};

export default SelectArrayInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  position: relative;

  label {
    width: 100%;
    display: block;
    margin-bottom: 8px;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.92rem;
  }

  @media (max-width: 640px) {
    label {
      font-size: 0.88rem;
    }
  }
`;

const SelectBox = styled.button<{ $isPlaceholder: boolean }>`
  width: 100%;
  min-height: 46px;
  padding: 10px 42px 10px 14px;
  box-sizing: border-box;
  border: 1px solid #dbe2ea;
  border-radius: 14px;
  font-size: 0.95rem;
  outline: none;
  background: #ffffff;
  color: #0f172a;
  text-align: left;
  position: relative;
  transition: border-color 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: #94a3b8;
    cursor: pointer;
  }

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
  }

  .placeholder {
    color: #94a3b8;
  }
`;

const Caret = styled.span`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-52%);
  color: #64748b;
  pointer-events: none;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  padding: 5px 10px;
  border-radius: 999px;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  color: #3730a3;
  font-size: 0.87rem;
  font-weight: 600;
`;

const PortalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
`;

const PortalMenu = styled.ul<{
  $left: number;
  $top: number;
  $width: number;
  $maxH: number;
}>`
  position: fixed;
  left: ${({ $left }) => `${$left}px`};
  top: ${({ $top }) => `${$top}px`};
  width: ${({ $width }) => `${$width}px`};
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: white;
  max-height: ${({ $maxH }) => `${$maxH}px`};
  overflow: auto;
  list-style: none;
  z-index: 9999;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06);
`;

const EmptyItem = styled.li`
  padding: 12px 14px;
  color: #64748b;
  font-size: 0.9rem;
`;

const MenuItem = styled.li<{
  $focused?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 0.94rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  color: ${({ $disabled }) => ($disabled ? "#94a3b8" : "#0f172a")};
  background: ${({ $focused }) => ($focused ? "#f8fafc" : "transparent")};
  width: 100%;

  &:hover {
    background: ${({ $disabled }) => ($disabled ? "transparent" : "#f8fafc")};
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #4f46e5;
    pointer-events: none;
  }
`;

import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

type Option = { label: string; value: string; disabled?: boolean };

type SelectArrayProps = {
  name: string;
  title: string;
  values: string[]; // 선택된 value 배열
  setValues: (v: string[]) => void; // 선택 setter
  options: Option[];
  placeholder?: string;
  /** 드롭다운 최대 높이(px) */
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
  const listRef = useRef<HTMLUListElement | null>(null);

  const mapByValue = useMemo(
    () => new Map(options.map((o) => [o.value, o])),
    [options]
  );

  const toggleValue = (v: string) => {
    if (mapByValue.get(v)?.disabled) return;
    setValues(
      values.includes(v) ? values.filter((x) => x !== v) : [...values, v]
    );
  };

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // 키보드
  const handleBoxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
      if (!open) setFocusedIndex(0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setFocusedIndex(0);
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
          if (!open) setFocusedIndex(0);
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
      {open && (
        <Menu
          role="listbox"
          aria-multiselectable="true"
          ref={listRef}
          $maxH={maxMenuHeight}
        >
          {options.length === 0 && (
            <MenuItem>해당 {title}이 없습니다.</MenuItem>
          )}
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
                onClick={() => toggleValue(opt.value)}
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
        </Menu>
      )}
    </Container>
  );
};

export default SelectArrayInput;

/* ====== 스타일 ====== */

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 10px 0;
  position: relative;

  label {
    width: 100%;
    color: black;
    font-weight: 400;
    font-size: 0.9rem;
  }
`;

const SelectBox = styled.button<{ $isPlaceholder: boolean }>`
  width: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
  border: none;  
  border-bottom: 1px solid lightgray;  
  font-size: 0.8rem;
  outline: none;
  background: white;
  text-align: left;
  position: relative;

  &:hover {
    border-bottom: 1px solid #4680ff;
    cursor: pointer;
  }

  &:focus {
    border-bottom: 1px solid #4680ff;
  }

  .placeholder {
    color: gray;
    font-style: italic;
  }
`;

const Caret = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-52%);
  pointer-events: none;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  padding: 2px 6px;
  border-radius: 12px;
  background: #f2f4f7;
  border: 1px solid #e5e7eb;
  font-size: 0.68rem;
`;

const Menu = styled.ul<{ $maxH: number }>`
  width: 100%;
  margin: 4px 0 0 0;
  padding: 6px 0;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid lightgray;
  background: white;
  max-height: ${({ $maxH }) => `${$maxH}px`};
  overflow: auto;
  list-style: none;
  z-index: 20;
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
`;

const MenuItem = styled.li<{
  $focused?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  font-size: 0.75rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  color: ${({ $disabled }) => ($disabled ? "gray" : "inherit")};
  background: ${({ $focused }) => ($focused ? "#f5f9ff" : "transparent")};

  &:hover {
    background: ${({ $disabled }) => ($disabled ? "transparent" : "#f5f9ff")};
  }

  input[type="checkbox"] {
    pointer-events: none;
  }
`;

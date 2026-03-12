import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

type Option = { id: string; name: string };

export type CompleteArrayInputPropsType = {
  name?: string;
  title?: string;
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
  fetchOptions: (query: string) => Promise<Option[]>;
  createOption?: (name: string) => Promise<Option>;
  deleteOption?: (id: string) => Promise<void>;
  hydrateSelected?: (ids: string[]) => Promise<Option[]>;
  placeholder?: string;
  debounceMs?: number;
  maxMenuHeight?: number;
  noOptionsText?: string;
  loadingText?: string;
  onError?: (err: unknown) => void;
};

export const CompleteArrayInput: React.FC<CompleteArrayInputPropsType> = ({
  name,
  title,
  values,
  setValues,
  fetchOptions,
  createOption,
  deleteOption,
  hydrateSelected,
  placeholder = "추가...",
  debounceMs = 250,
  maxMenuHeight = 240,
  noOptionsText = "검색 결과가 없어요",
  loadingText = "불러오는 중…",
  onError,
}) => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [selectedMap, setSelectedMap] = useState<Map<string, Option>>(
    () => new Map()
  );
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const list = await fetchOptions(input.trim());
        setOptions(list);
        setFocusedIndex(list.length ? 0 : -1);
      } catch (err) {
        onError?.(err);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, fetchOptions, debounceMs, onError]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (hydrateSelected) {
          const hydrated = await hydrateSelected(values);
          if (cancelled) return;
          const m = new Map<string, Option>();
          hydrated.forEach((o) => m.set(o.id, o));
          setSelectedMap(m);
        }
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [values, hydrateSelected, onError]);

  const toggleId = useCallback(
    (id: string) => {
      setValues((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setValues]
  );

  const addId = useCallback(
    (id: string) => {
      setValues((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setValues]
  );

  const removeId = useCallback(
    (id: string) => {
      setValues((prev) => prev.filter((x) => x !== id));
    },
    [setValues]
  );

  const handleCreate = useCallback(async () => {
    if (!createOption) return;
    const name = input.trim();
    if (!name) return;
    try {
      setLoading(true);
      const created = await createOption(name);
      setOptions((prev) =>
        prev.some((o) => o.id === created.id) ? prev : [created, ...prev]
      );
      addId(created.id);
      setSelectedMap((prev) => {
        const m = new Map(prev);
        m.set(created.id, created);
        return m;
      });
      setInput("");
    } catch (err) {
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [createOption, input, addId, onError]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!options.length) {
      if (e.key === "Enter" && createOption && input.trim()) {
        e.preventDefault();
        void handleCreate();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < options.length) {
        toggleId(options[focusedIndex].id);
      } else if (createOption && input.trim()) {
        void handleCreate();
      }
    }
  };

  return (
    <Container>
      {title && <Label>{title}</Label>}

      {values.length > 0 && (
        <SelectedList>
          {values.map((id) => {
            const label = selectedMap.get(id)?.name ?? id;
            return (
              <SelectedItem key={id}>
                {label}
                <RemoveButton type="button" onClick={() => removeId(id)}>
                  ✕
                </RemoveButton>
              </SelectedItem>
            );
          })}
        </SelectedList>
      )}

      <InputWrap>
        <Input
          name={name}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      </InputWrap>

      <Menu $maxHeight={maxMenuHeight}>
        {loading && <InfoText>{loadingText}</InfoText>}
        {!loading && options.length === 0 && !input.trim() && (
          <InfoText>{noOptionsText}</InfoText>
        )}
        {!loading && options.length > 0 && (
          <OptionList>
            {options.map((opt, idx) => {
              const active = idx === focusedIndex;
              const selected = values.includes(opt.id);
              return (
                <OptionRow
                  key={opt.id}
                  type="button"
                  $active={active}
                  $selected={selected}
                  onClick={() => toggleId(opt.id)}
                >
                  <OptionCheck>{selected ? "✓" : ""}</OptionCheck>
                  <span>{opt.name}</span>
                </OptionRow>
              );
            })}
          </OptionList>
        )}
        {!loading && createOption && input.trim() && (
          <CreateBtn type="button" onClick={() => handleCreate()}>
            “{input.trim()}” 추가
          </CreateBtn>
        )}
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-family: system-ui, sans-serif;
  position: relative;
  margin: 12px 0;
`;

const Label = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 8px;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.92rem;
`;

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const SelectedItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #eef2ff;
  color: #3730a3;
  border: 1px solid #c7d2fe;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.88rem;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: #6366f1;
  cursor: pointer;
  font-size: 0.88rem;
  padding: 0;

  &:hover {
    color: #312e81;
  }
`;

const InputWrap = styled.div`
  border: 1px solid #dbe2ea;
  border-radius: 14px;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
  }
`;

const Input = styled.input`
  width: 100%;
  min-height: 46px;
  padding: 12px 14px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  box-sizing: border-box;
  color: #0f172a;
  background-color: transparent;

  &::placeholder {
    color: #94a3b8;
  }
`;

const Menu = styled.div<{ $maxHeight: number }>`
  margin-top: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #ffffff;
  overflow-y: auto;
  max-height: ${(p) => p.$maxHeight}px;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
`;

const InfoText = styled.div`
  padding: 12px 14px;
  font-size: 0.9rem;
  color: #64748b;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 6px;
`;

const OptionRow = styled.button<{ $active: boolean; $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ $selected }) => ($selected ? "#c7d2fe" : "transparent")};
  border-radius: 12px;
  background: ${({ $active, $selected }) =>
    $selected ? "#eef2ff" : $active ? "#f8fafc" : "transparent"};
  color: #0f172a;
  font-size: 0.94rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: ${({ $selected }) => ($selected ? "#eef2ff" : "#f8fafc")};
  }
`;

const OptionCheck = styled.span`
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #4f46e5;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const CreateBtn = styled.button`
  width: calc(100% - 16px);
  margin: 0 8px 8px;
  padding: 11px 12px;
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }
`;

import React, { useEffect, useState } from "react";
import { layout } from "../../theme/Theme";

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

const SelectInput = ({
  disabled,
  name,
  title,
  value,
  setValue,
  options,
  placeholder,
}: {
  disabled?: boolean;
  name: string;
  title: string;
  value: string;
  setValue: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    if (!isSelectOpen) return;

    const handlePopState = () => {
      setIsSelectOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isSelectOpen]);

  useEffect(() => {
    if (isSelectOpen) {
      window.history.pushState({ modal: true }, "");
    }
  }, [isSelectOpen]);

  return (
    <div className="w-100 mb-3">
      <label htmlFor={name} className="form-label fw-semibold">
        {title}
      </label>
      <input
        disabled={disabled}
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={(e) => {
          (e.target as HTMLInputElement).blur();
          setIsSelectOpen(true);
        }}
        className={`form-control ${value === "" ? "text-secondary" : ""}`}
      ></input>
      <div
        role="presentation"
        className="position-fixed start-0 w-100 h-100"
        onClick={() => setIsSelectOpen(false)}
        aria-hidden={!isSelectOpen}
        style={{          
          background: "rgba(0, 0, 0, 0.32)",
          opacity: isSelectOpen ? 1 : 0,
          pointerEvents: isSelectOpen ? "auto" : "none",
          transition: "opacity 160ms ease",
          zIndex: 10,
        }}
      />
      <aside
        aria-hidden={!isSelectOpen}
        className={`w-100 start-0 position-fixed bg-white shadow d-flex flex-column`}
        style={{
          bottom: 55,
          zIndex: 80,
          height: "80%",
          borderRadius: "20px 20px 0 0",
          transform: isSelectOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 220ms ease",
        }}
      >
        {/* header */}
        <div className="w-100 d-flex align-items-center justify-content-between border-bottom px-3">
          <h2 className="m-0 fs-6 fw-bold">{title}</h2>
          <button
            className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
            onClick={() => setIsSelectOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {/* body */}
        <div
          className="w-100 p-2 d-flex justify-content-center overflow-auto"
          style={{ height: "100%" }}
        >
          <nav
            role="navigation"
            style={{
              flex: 1,
              minHeight: 0,
              marginBottom: 80,
              width: "100%",
              scrollbarWidth: "thin",
              maxWidth: layout.maxWidth,
            }}
          >
            <div style={{ paddingBottom: 100 }}>
              <div>
                {options.map((opt) => {
                  const isSelected = opt.value === value;

                  return (
                    <button
                      key={opt.value}
                      disabled={opt.disabled}
                      onClick={() => {
                        if (!opt.disabled) {
                          setValue(opt.value);
                          setIsSelectOpen(false);
                        }
                      }}
                      className={`w-100 text-start px-3 py-3 border-0 bg-white ${
                        isSelected ? "fw-bold" : ""
                      } ${opt.disabled ? "text-secondary" : ""}`}
                      style={{
                        borderBottom: "1px solid #eee",
                        cursor: opt.disabled ? "not-allowed" : "pointer",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SelectInput;

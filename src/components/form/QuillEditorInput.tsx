import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { layout } from "../../theme/Theme";

const QuillEditorInput = ({
  disabled,
  name,
  title,
  data,
  setData,
  rows = 8,
}: {
  disabled?: boolean;
  name: string;
  title: string;
  data: string;
  setData: (v: string) => void;
  rows?: number;
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    if (!isEditorOpen) return;

    const handlePopState = () => {
      setIsEditorOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isEditorOpen]);

  useEffect(() => {
    if (isEditorOpen) {
      window.history.pushState({ modal: true }, "");
    }
  }, [isEditorOpen]);

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    const root = editor?.root;
    if (!root) return;

    const handleCompositionStart = () => {
      setIsEmpty(false);
    };

    const handleCompositionEnd = () => {
      const text = editor.getText().trim();
      setIsEmpty(text.length === 0);
    };

    root.addEventListener("compositionstart", handleCompositionStart);
    root.addEventListener("compositionend", handleCompositionEnd);

    return () => {
      root.removeEventListener("compositionstart", handleCompositionStart);
      root.removeEventListener("compositionend", handleCompositionEnd);
    };
  }, [isEditorOpen]);

  return (
    <div className="w-100 mb-3">
      <style>{quillStyles}</style>

      <label htmlFor={name} className="form-label fw-semibold">
        {title}
      </label>

      <div
        onClick={() => {
          if (!disabled) setIsEditorOpen(true);
        }}
        className={`form-control ${
          !data || data === "<p><br></p>" ? "text-secondary" : ""
        }`}
        style={{
          minHeight: 3 * 24 + 32,
          cursor: disabled ? "not-allowed" : "pointer",
          overflow: "hidden",
        }}
      >
        {data && data !== "<p><br></p>" && (
          <div
            dangerouslySetInnerHTML={{ __html: data }}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
        )}
        {isEmpty && `${title}을(를) 입력하세요`}
      </div>

      <div
        role="presentation"
        className="position-fixed start-0 w-100 h-100"
        onClick={() => setIsEditorOpen(false)}
        aria-hidden={!isEditorOpen}
        style={{
          top: 0,
          bottom: 55,
          background: "rgba(0, 0, 0, 0.32)",
          opacity: isEditorOpen ? 1 : 0,
          pointerEvents: isEditorOpen ? "auto" : "none",
          transition: "opacity 160ms ease",
          zIndex: 200,
        }}
      />

      <aside
        aria-hidden={!isEditorOpen}
        className="w-100 start-0 position-fixed bg-white shadow d-flex flex-column"
        style={{
          bottom: 55,
          zIndex: 200,
          height: "70%",
          borderRadius: "20px 20px 0 0",
          transform: isEditorOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 220ms ease",
        }}
      >
        <div className="w-100 d-flex align-items-center justify-content-between border-bottom px-3">
          <h2 className="m-0 fs-6 fw-bold">{title}</h2>
          <button
            className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
            onClick={() => setIsEditorOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div className="w-100 p-2 d-flex justify-content-center overflow-auto">
          <div
            className={`w-100 quill-editor-bootstrap ${
              disabled ? "is-disabled" : ""
            }`}
            style={
              {
                ["--quill-min-height" as any]: `${Math.max(rows, 1) * 24 + 24}px`,
                ["--quill-min-height-mobile" as any]: `${
                  Math.max(rows, 1) * 24 + 32
                }px`,
                position: "relative",
                maxWidth: layout.maxWidth,
                paddingBottom: 100,
              } as React.CSSProperties
            }
          >
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={data}
              onChange={(value, _delta, _source, editor) => {
                setData(value);
                setIsEmpty(editor.getText().trim().length === 0);
              }}
              readOnly={disabled}
              placeholder={isEmpty ? `${title}을(를) 입력하세요` : ""}
              modules={{
                toolbar: disabled
                  ? false
                  : [
                      ["bold", "italic", "underline", "strike"],
                      [{ color: [] }, { background: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["blockquote", "link"],
                      ["clean"],
                    ],
              }}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default QuillEditorInput;

/* ===================== CSS (Bootstrap 기반) ===================== */

const quillStyles = `
.quill-editor-bootstrap {
  width: 100%;
  min-width: 0;
}

.quill-editor-bootstrap .ql-toolbar {
  border: 1px solid var(--bs-border-color, #dee2e6);
  border-bottom: none;
  border-radius: 0.375rem 0.375rem 0 0;
  background: #ffffff;
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 4px;
  padding: 8px 10px;
  white-space: normal;
}

.quill-editor-bootstrap.is-disabled .ql-toolbar {
  background: var(--bs-tertiary-bg, #f8f9fa);
}

.quill-editor-bootstrap .ql-toolbar .ql-formats {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-right: 8px;
  margin-bottom: 0;
}

.quill-editor-bootstrap .ql-container {
  border: 1px solid var(--bs-border-color, #dee2e6);
  border-radius: 0 0 0.375rem 0.375rem;
  background: #ffffff;
  color: var(--bs-body-color, #212529);
  line-height: 1.5;
  font-size: 0.95rem;
}

.quill-editor-bootstrap.is-disabled .ql-container {
  border-radius: 0.375rem;
  background: var(--bs-tertiary-bg, #f8f9fa);
}

.quill-editor-bootstrap .ql-editor {
  min-height: var(--quill-min-height, 216px);
  padding: 12px 14px;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.quill-editor-bootstrap .ql-editor.ql-blank::before {
  color: var(--bs-secondary-color, #6c757d);
  font-style: normal;
}

.quill-editor-bootstrap .ql-container:focus-within,
.quill-editor-bootstrap .ql-toolbar:focus-within {
  border-color: #86b7fe;
}

.quill-editor-bootstrap .ql-container:focus-within {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.quill-editor-bootstrap .ql-disabled .ql-editor {
  color: var(--bs-secondary-color, #6c757d);
  cursor: not-allowed;
}

@media (max-width: ${layout.maxWidth}) {
  .quill-editor-bootstrap .ql-toolbar {
    padding: 6px 8px;
    row-gap: 6px;
  }

  .quill-editor-bootstrap .ql-toolbar button,
  .quill-editor-bootstrap .ql-toolbar .ql-picker {
    flex-shrink: 0;
  }

  .quill-editor-bootstrap .ql-editor {
    font-size: 16px;
    min-height: var(--quill-min-height-mobile, 224px);
  }
}
`;

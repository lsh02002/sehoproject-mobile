import { useEffect, useState } from "react";
import styled from "styled-components";

const ImageInput = ({
  disabled,
  name,
  title,
  data,
  setData,
  previewUrls,
  setPreviewUrls,
}: {
  disabled?: boolean;
  name: string;
  title: string;
  data: File[];
  setData: (files: File[]) => void;
  previewUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = data.map((file) => URL.createObjectURL(file));
    setFilePreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selected = Array.from(files).slice(0, 2);
    setData(selected);
    setPreviewUrls([]);
  };

  return (
    <Container>
      <label htmlFor={name}>{title}</label>

      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        multiple
        disabled={disabled}
        onChange={handleChange}
      />

      <PreviewGrid>
        {previewUrls.map((url, i) => (
          <PreviewImage key={`old-${i}`} src={url} alt={`old-${i}`} />
        ))}

        {filePreviewUrls.map((url, i) => (
          <PreviewImage key={`new-${i}`} src={url} alt={`new-${i}`} />
        ))}
      </PreviewGrid>
    </Container>
  );
};

export default ImageInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 12px 0;

  label {
    width: 100%;
    display: block;
    margin-bottom: 8px;
    color: #0f172a;
    font-weight: 600;
    font-size: 0.92rem;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border: 1px dashed #cbd5e1;
    border-radius: 14px;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    box-sizing: border-box;
    color: #334155;
    line-height: 1.5;
    transition: border-color 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: #6366f1;
      background: #fcfdff;
      cursor: pointer;
    }

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
    }

    &:disabled {
      background: #f8fafc;
      color: #94a3b8;
      cursor: not-allowed;
      border-style: solid;
    }
  }

  @media (max-width: 640px) {
    label {
      font-size: 0.88rem;
    }

    input {
      font-size: 16px;
      min-height: 44px;
    }
  }
`;

const PreviewGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const PreviewImage = styled.img`
  width: 124px;
  height: 124px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
`;

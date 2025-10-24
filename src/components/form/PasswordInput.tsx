import styled from "styled-components";

const PasswordInput = ({
  name,
  title,
  data,
  setData,
}: {
  name: string;
  title: string;
  data: string;
  setData: (v: string) => void;
}) => {
  return (
    <Container>
      <label htmlFor={name}>{title}</label>
      <input
        type="password"
        name={name}
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={`${title}을(를) 입력하세요`}
      />
    </Container>
  );
};

export default PasswordInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 10px 0;

  label {
    width: 100%;
    color: black;
    font-weight: 400;
    font-size: 0.9rem;
  }
  input {
    width: 100%;
    padding: 0.7rem;
    box-sizing: border-box;    
    border: none;
    border-bottom: 1px solid lightgray;    
    font-size: 0.8rem;
    //*****매우 중요 outline *****//
    outline: none;

    &:hover {
      border-bottom: 1px solid #4680ff;
    }

    &:focus {
      border-bottom: 1px solid #4680ff;
    }

    &::placeholder {
      color: gray;
      font-style: italic;
    }
  }
`;

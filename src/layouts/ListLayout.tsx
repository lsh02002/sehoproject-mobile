import { Link } from "react-router-dom";
import styled from "styled-components";

const ListLayout = ({
  title,
  url,
  children,
}: {
  title?: string;
  url?: string;
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Wrapper>
        <Title>
          <div>{title}</div>
          <Link
            style={{ color: "#4680ff", textDecoration: "none", fontSize: "0.8rem" }}
            to={url ?? ""}
          >
            {title} 생성
          </Link>
        </Title>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Wrapper>
    </Container>
  );
};

export default ListLayout;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h3`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChildrenWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

import styled from "styled-components";

const ListLayout = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
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
`;

const ChildrenWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;  
`;

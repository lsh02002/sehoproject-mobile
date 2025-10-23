import styled from "styled-components";
import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import {
  getOneSpaceByWorkspaceAndSpaceApi,
  putOneSpaceByWorkspaceAndSpaceApi,
} from "../../api/sehomanagerapi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { spaceRequestType } from "../../types/type";

const SpaceEditPage = () => {
  const { workspaceId, spaceId } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [workspaceIdState, setWorkspaceIdState] = useState<string>(
    workspaceId?.toString() ?? ""
  );

  useEffect(() => {
    getOneSpaceByWorkspaceAndSpaceApi(Number(workspaceId), Number(spaceId))
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setSlug(res.data.slug);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [workspaceId, spaceId]);

  const OnEditSubmit = () => {
    const data: spaceRequestType = {
      name,
      slug,
    };

    putOneSpaceByWorkspaceAndSpaceApi(
      Number(workspaceIdState),
      Number(spaceId),
      data
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h3>스페이스 수정</h3>
        </Title>
        <TextInput
          name="name"
          title="스페이스 이름"
          data={name}
          setData={setName}
        />
        <TextInput name="slug" title="슬러그" data={slug} setData={setSlug} />
        <TextInput
          name="workspaceId"
          title="워크스페이스"
          disabled
          data={workspaceIdState}
          setData={setWorkspaceIdState}
        />
        <ConfirmButton title="수정" onClick={OnEditSubmit} />
      </Wrapper>
    </Container>
  );
};

export default SpaceEditPage;

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

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 500;
  }

  a {
    font-size: 0.7rem;
  }
`;

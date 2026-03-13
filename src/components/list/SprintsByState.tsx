import { SprintResponseType } from "../../types/type";
import SprintCard from "../card/SprintCard";
import ListLayout from "../layouts/ListLayout";

const SprintsByState = ({
  title,
  sprintsByState,
  icon,
}: {
  title: string;
  sprintsByState: SprintResponseType[];
  icon?: React.ReactNode;
}) => {
  return (
    <ListLayout title={title} icon={icon} componentType="sprint">
      {sprintsByState?.length === 0 ? (
        <div>해당 스프린트가 존재하지 않습니다.</div>
      ) : (
        sprintsByState?.map((sprint) => (
          <SprintCard key={sprint.id} sprint={sprint} />
        ))
      )}
    </ListLayout>
  );
};

export default SprintsByState;

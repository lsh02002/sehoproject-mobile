// import { QueryClient } from "@tanstack/react-query";
// import {
//   MilestoneResponseType,
//   SprintResponseType,
//   TaskResponseType,
// } from "../../types/type";

// export function getReactQueryTask(
//   queryClient: QueryClient,
//   id: number,
//   projectId: number,
// ) {
//   const tasks = queryClient.getQueryData<TaskResponseType[]>([
//     "tasks",
//     projectId,
//   ]);
//   return tasks?.find((task) => task.id === id);
// }

// export function getReactQuerySprint(
//   queryClient: QueryClient,
//   id: number,
//   projectId: number,
// ) {
//   const sprints = queryClient.getQueryData<SprintResponseType[]>([
//     "sprints",
//     projectId,
//   ]);
//   return sprints?.find((sprint) => sprint.id === id);
// }

// export function getReactQueryMilestone(
//   queryClient: QueryClient,
//   id: number,
//   projectId: number,
// ) {
//   const milestones = queryClient.getQueryData<MilestoneResponseType[]>([
//     "milestones",
//     projectId,
//   ]);
//   return milestones?.find((milestone) => milestone.id === id);
// }

import { TeacherActionEnum } from "./action";
import { ITeacherStateContext } from "./context";

export function TeacherReducer(
  incomingState: ITeacherStateContext,
  action: ReduxActions.Action<ITeacherStateContext>
): ITeacherStateContext {
  const { type, payload } = action;

  switch (type) {
    case TeacherActionEnum.AddTeacherRequest:
      return {
        ...incomingState,
        View: [payload.Create, ...incomingState?.View],
      };

    case TeacherActionEnum.UpdateTeacherRequest:
      const { Update } = payload;
      const updatedTeacherIndex = incomingState?.View.findIndex(
        ({ id }) => id === Update?.id
      );
      if (updatedTeacherIndex !== -1) {
        const updatedTeacher = {
          ...incomingState.View[updatedTeacherIndex],
          ...Update,
        };
        const updatedTeacherList = [...incomingState.View];
        updatedTeacherList[updatedTeacherIndex] = updatedTeacher;
        return { ...incomingState, View: updatedTeacherList };
      }
      return incomingState;

    case TeacherActionEnum.DeleteTeacherRequest:
      const { deletedTeacherId } = payload;
      const filtered = [...incomingState?.View].filter(
        ({ id }) => id != deletedTeacherId
      );
      return { ...incomingState, View: [...filtered] };
    case TeacherActionEnum.ViewTeacherRequest:
      return { ...incomingState, ...payload };

    default:
      return incomingState;
  }
}

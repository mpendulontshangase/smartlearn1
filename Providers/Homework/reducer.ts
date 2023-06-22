import { HomeworkActionEnum } from "./action";
import { IHomeworkStateContext } from "./context";

export function HomeworkReducer(
  incomingState: IHomeworkStateContext,
  action: ReduxActions.Action<IHomeworkStateContext>
): IHomeworkStateContext {
  const { type, payload } = action;

  switch (type) {
    case HomeworkActionEnum.AddHomeworkRequest:
      return {
        ...incomingState,
        View: [payload.Create, ...incomingState?.View],
      };

    case HomeworkActionEnum.UpdateHomeworkRequest:
      const { Update } = payload;
      const updatedHomeworkIndex = incomingState?.View.findIndex(
        ({ id }) => id === Update?.id
      );
      if (updatedHomeworkIndex !== -1) {
        const updatedHomework = {
          ...incomingState.View[updatedHomeworkIndex],
          ...Update,
        };
        const updatedHomeworkList = [...incomingState.View];
        updatedHomeworkList[updatedHomeworkIndex] = updatedHomework;
        return { ...incomingState, View: updatedHomeworkList };
      }
      return incomingState;

    case HomeworkActionEnum.DeleteHomeworkRequest:
      const { deletedHomeworkId } = payload;
      const filtered = [...incomingState?.View].filter(
        ({ id }) => id != deletedHomeworkId
      );
      return { ...incomingState, View: [...filtered] };
    case HomeworkActionEnum.ViewHomeworkRequest:
      return { ...incomingState, ...payload };

    default:
      return incomingState;
  }
}

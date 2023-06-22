import { LearnerActionEnum } from "./action";
import { ILearnerStateContext } from "./context";

export function LearnerReducer(
  incomingState: ILearnerStateContext,
  action: ReduxActions.Action<ILearnerStateContext>
): ILearnerStateContext {
  const { type, payload } = action;

  switch (type) {
    case LearnerActionEnum.AddLearnerRequest:
      return {
        ...incomingState,
        View: [payload.Create, ...incomingState?.View],
      };

    case LearnerActionEnum.UpdateLearnerRequest:
      const { Update } = payload;
      const updatedLearnerIndex = incomingState?.View.findIndex(
        ({ id }) => id === Update?.id
      );
      if (updatedLearnerIndex !== -1) {
        const updatedLearner = {
          ...incomingState.View[updatedLearnerIndex],
          ...Update,
        };
        const updatedLearnerList = [...incomingState.View];
        updatedLearnerList[updatedLearnerIndex] = updatedLearner;
        return { ...incomingState, View: updatedLearnerList };
      }
      return incomingState;

    case LearnerActionEnum.DeleteLearnerRequest:
      const { deletedLearnerId } = payload;
      const filtered = [...incomingState?.View].filter(
        ({ id }) => id != deletedLearnerId
      );
      return { ...incomingState, View: [...filtered] };
    case LearnerActionEnum.ViewLearnerRequest:
      return { ...incomingState, ...payload };

    default:
      return incomingState;
  }
}

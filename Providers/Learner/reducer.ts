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
        ViewL: [payload.Create, ...incomingState?.ViewL],
      };

    case LearnerActionEnum.UpdateLearnerRequest:
      const { Update } = payload;
      const updatedLearnerIndex = incomingState?.ViewL.findIndex(
        ({ id }) => id === Update?.id
      );
      if (updatedLearnerIndex !== -1) {
        const updatedLearner = {
          ...incomingState.ViewL[updatedLearnerIndex],
          ...Update,
        };
        const updatedLearnerList = [...incomingState.ViewL];
        updatedLearnerList[updatedLearnerIndex] = updatedLearner;
        return { ...incomingState, ViewL: updatedLearnerList };
      }
      return incomingState;

    case LearnerActionEnum.DeleteLearnerRequest:
      const { deletedLearnerId } = payload;
      const filtered = [...incomingState?.ViewL].filter(
        ({ id }) => id != deletedLearnerId
      );
      return { ...incomingState, ViewL: [...filtered] };
    case LearnerActionEnum.ViewLearnerRequest:
      return { ...incomingState, ...payload };

    default:
      return incomingState;
  }
}

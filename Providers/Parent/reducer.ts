import { ParentActionEnum } from "./action";
import { IParentStateContext } from "./context";

export function ParentReducer(
  incomingState: IParentStateContext,
  action: ReduxActions.Action<IParentStateContext>
): IParentStateContext {
  const { type, payload } = action;

  switch (type) {
    case ParentActionEnum.AddParentRequest:
      return {
        ...incomingState,
        View: [payload.Create, ...incomingState?.View],
      };

    case ParentActionEnum.UpdateParentRequest:
      const { Update } = payload;
      const updatedParentIndex = incomingState?.View.findIndex(
        ({ id }) => id === Update?.id
      );
      if (updatedParentIndex !== -1) {
        const updatedParent = {
          ...incomingState.View[updatedParentIndex],
          ...Update,
        };
        const updatedParentList = [...incomingState.View];
        updatedParentList[updatedParentIndex] = updatedParent;
        return { ...incomingState, View: updatedParentList };
      }
      return incomingState;

    case ParentActionEnum.DeleteParentRequest:
      const { deletedParentId } = payload;
      const filtered = [...incomingState?.View].filter(
        ({ id }) => id != deletedParentId
      );
      return { ...incomingState, View: [...filtered] };
    case ParentActionEnum.ViewParentRequest:
      return { ...incomingState, ...payload };

    default:
      return incomingState;
  }
}

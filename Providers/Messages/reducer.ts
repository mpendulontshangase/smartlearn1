import { MessageActionEnum } from "./action";
import { IMessageStateContext } from "./context";

export function MessageReducer(
  incomingState: IMessageStateContext,
  action: ReduxActions.Action<IMessageStateContext>
): IMessageStateContext {
  const { type, payload } = action;

  switch (type) {
    case MessageActionEnum.AddMessageRequest:
      return {
        ...incomingState,
        View: [payload.Create, ...incomingState?.View],
      };

    case MessageActionEnum.UpdateMessageRequest:
      const { Update } = payload;
      const updatedMessageIndex = incomingState?.View.findIndex(
        ({ id }) => id === Update?.id
      );
      if (updatedMessageIndex !== -1) {
        const updatedMessage = {
          ...incomingState.View[updatedMessageIndex],
          ...Update,
        };
        const updatedMessageList = [...incomingState.View];
        updatedMessageList[updatedMessageIndex] = updatedMessage;
        return { ...incomingState, View: updatedMessageList };
      }
      return incomingState;

    case MessageActionEnum.DeleteMessageRequest:
      const { deletedMessageId } = payload;
      const filtered = [...incomingState?.View].filter(
        ({ id }) => id != deletedMessageId
      );
      return { ...incomingState, View: [...filtered] };
    case MessageActionEnum.ViewMessageRequest:
      return { ...incomingState, ...payload };

    default:
      return incomingState;
  }
}

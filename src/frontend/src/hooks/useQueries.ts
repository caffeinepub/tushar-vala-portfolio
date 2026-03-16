import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      content,
    }: {
      name: string;
      email: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.submitMessage(name, email, content);
    },
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useStoreInfo() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["storeInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStoreInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReviews() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      message,
    }: {
      name: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContact(name, phone, message);
    },
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      rating,
      comment,
    }: {
      name: string;
      rating: bigint;
      comment: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addReview(name, rating, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

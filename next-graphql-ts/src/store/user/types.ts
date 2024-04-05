import { User, Member, Store } from "@/graphql/generated/schema";

export interface UserState {
  isLogged: boolean;
  user: User | null | undefined;
  selectedMember: Member | null | undefined;
  selectedMemberStore: Store | null | undefined;
}

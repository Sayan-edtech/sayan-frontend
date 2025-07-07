import type { AcademyMembership, User } from "@/types/user";

export const getAcademyDetails = (user: User): AcademyMembership => {
  const academy = user.academy_memberships?.find(
    (academy) => academy.academy_details.email === user.email
  ) as AcademyMembership;

  return academy;
};

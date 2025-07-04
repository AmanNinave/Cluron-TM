import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated";
import { $Enums, AccessLevel, Prisma } from "@prisma/client";

export const getWorkspaceProjectsByWorkspaceId = async (
  workspaceId: string
) => {
  try {
    const { user } = await userRequired();
    if (!user) {
      return {
        success: false,
        error: true,
        message: "User not authenticated",
      };
    }
    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      throw new Error(`User is not a member of the workspace.`);
    }

    const query: Prisma.ProjectWhereInput =
      isUserMember.accessLevel === $Enums.AccessLevel.OWNER
        ? { workspaceId }
        : {
            projectAccess: {
              some: {
                hasAccess: true,
                workspaceMember: { userId: user.id, workspaceId },
              },
            },
          };

    const [projects, workspaceMembers] = await Promise.all([
      db.project.findMany({
        where: query,

        select: { name: true, id: true, workspaceId: true, description: true },
      }),
      db.workspaceMember.findMany({
        where: { workspaceId },
        include: {
          user: {
            select: { name: true, id: true, image: true },
          },
        },
      }),
    ]);

    return { projects, workspaceMembers };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
      message: "Internal server error",
    };
  }
};

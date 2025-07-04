import { ProjectProps } from "@/utils/types";
import { File, Task, User } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProjectAvatar } from "../project/project-avatar";
import { ProfileAvatar } from "../profile-avatar";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { EditTaskDialog } from "./edit-task-dialog";

interface TaskProps {
  task: Task & {
    assignedTo: User;
    project: ProjectProps;
    attachments: File[];
  };
}
export const TaskDetails = ({ task }: TaskProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between">
        <div>
          <CardTitle>{task?.title}</CardTitle>
          <div className="flex items-center gap-2">
            <ProjectAvatar name={task?.project.name} />
            <p className="text-base text-muted-foreground">
              {task?.project.name}
            </p>
          </div>
        </div>

        <div className="w-full  md:w-auto flex flex-col justify-end items-end gap-2">
          <EditTaskDialog
            key={new Date().getTime()}
            task={task}
            project={task.project}
          />

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Assigned To:</span>
            <ProfileAvatar
              url={task.assignedTo.image || undefined}
              name={task.assignedTo.name}
            />
            <span className="text-sm font-medium">{task.assignedTo.name}</span>
          </div>
        </div>
      </CardHeader>
      <Separator className="MY-3" />

      <CardContent className="space-y-6">
        <div>
          <h4>Description</h4>
          <p className="text-muted-foreground">
            {task.description || "No description"}
          </p>
        </div>

        <div>
          <h4>Additional Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={task.status}>{task.status}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">
                {format(task.dueDate, "MMM d, yyyy")}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Priority</p>
              <Badge variant={task.priority}>{task.priority}</Badge>
            </div>
          </div>
        </div>

        <div>
          <h4>Attachments</h4>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {task?.attachments?.map((file) => (
              <div key={file.id} className="relative group cursor-pointer">
                <Image
                  src={file.type === "PDF" ? "/pdf.png" : file.url}
                  alt={"attachment "}
                  width={80}
                  height={120}
                  className="w-full  h-48 object-contain rounded-lg"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    <span className="text-white text-sm">View</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {task.attachments.length === 0 && (
            <div className="text-sm text-muted-foreground flex items-center h-20">
              <p>No attachments found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

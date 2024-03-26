import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommand } from "./create-post.command";


@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostHandler> {

  execute(command: CreatePostHandler): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

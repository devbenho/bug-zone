export class CreatePostCommand {
  constructor(
    public title: string,
    public content: string,
    public authorId: string,
  ) {}
}
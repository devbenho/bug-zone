export class UpdatePostCommand {
  constructor(
    public postId: string,
    public title?: string,
    public content?: string,
  ) {}
}

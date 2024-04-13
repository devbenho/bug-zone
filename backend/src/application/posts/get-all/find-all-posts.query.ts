class GetAllPostsRequest {
  constructor(
    public userId?: string,
    public page: number = 1,
    public limit: number = 10,
  ) {}
}

export { GetAllPostsRequest };


class GetById() {
    constructor(private postRepository: IPostRepository) {}

    async execute(id: string): Promise<Post> {
        // return this.postRepository.getById(id);
        throw new Error('Not implemented');
    }
}
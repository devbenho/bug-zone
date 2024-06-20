import { PostDetailsResponseDto } from "@contracts/dtos/posts";
import { Property } from "@tsed/schema";

class CreatedPostApiResponse {
    @Property()
    id: string;

    @Property()
    title: string;

    @Property()
    content: string;

    @Property()
    authorId: string;

    static create(id: string, title: string, content: string, authorId: string): CreatedPostApiResponse {
        const response = new CreatedPostApiResponse();
        response.id = id;
        response.title = title;
        response.content = content;
        response.authorId = authorId;
        return response;
    }

    static fromCreatedPost(post: PostDetailsResponseDto): CreatedPostApiResponse {
        return CreatedPostApiResponse.create(post.id, post.title, post.content, post.authorId);
    }
}

export { CreatedPostApiResponse };
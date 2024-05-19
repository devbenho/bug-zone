import { UseCaseRequest } from "@application/shared";
import { TriggeredBy } from "@domain/shared/entities";

class CreatePostRequestDto extends UseCaseRequest {
    constructor(
        public triggeredBy: TriggeredBy,
        public title: string,
        public content: string,
        public tags: string[],

    ) {
        super(triggeredBy);
    }
    protected validatePayload(): void {
        if (!this.title) {
            throw new Error('Title is required');
        }
        if (!this.content) {
            throw new Error('Content is required');
        }
        if (!this.tags) {
            throw new Error('Tags are required');
        }
    }

    public validate(): void {
        if (!this.triggeredBy) {
            throw new Error('The usecase must be triggered by someone');
        }
        this.validatePayload();
    }

    static create(triggeredBy: TriggeredBy, title: string, content: string, tags: string[]): CreatePostRequestDto {
        {
            return new CreatePostRequestDto(triggeredBy, title, content, tags);
        }


    }
}
export { CreatePostRequestDto };

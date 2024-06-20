import { InvalidParameterException } from "@domain/shared/exceptions";
import { EnumValueObject } from "@domain/shared/value-object/enum-value-object";

enum POST_STATUS {
    DRAFT = 'draft',
    PUBLISHED = 'published',
}

class PostStatus extends EnumValueObject<POST_STATUS> {
    protected throwErrorForInvalidValue(value: POST_STATUS): void {
        throw new InvalidParameterException(`The status ${value} is invalid`);
    }
    constructor(value: POST_STATUS) {
        super(value, Object.values(POST_STATUS));
    }

    public static fromValue(value: string): PostStatus {
        switch (value) {
            case POST_STATUS.DRAFT: {
                return new PostStatus(POST_STATUS.DRAFT);
            }
            case POST_STATUS.PUBLISHED: {
                return new PostStatus(POST_STATUS.PUBLISHED);
            }
            default: {
                throw new Error(`The status ${value} is invalid`);
            }
        }
    }
}



export { PostStatus };
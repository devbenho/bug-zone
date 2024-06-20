import { PostResponseDto } from "@contracts/dtos/posts";
import { Nullable, Property } from "@tsed/schema";

class UserDetails {
    @Property()
    public id: string;

    @Property()
    public firstName: string;

    @Property()
    public lastName: string;

    @Property()
    public username: string;

    @Property()
    public email: string;

    @Property()
    public pictureProfile?: string;

    @Property()
    public roles?: string[];

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        pictureProfile?: string,
        roles?: string[],
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.pictureProfile = pictureProfile;
        this.roles = roles;
    }

}

class AllPostsApiResponse {
    @Property()
    readonly id: string;

    @Property()
    readonly title: string;

    @Property()
    readonly content: string;



    @Property()
    readonly authorId: string;


    @Property()
    @Nullable(UserDetails)
    readonly author: UserDetails;

    @Property()
    readonly status: string;

    static create(id: string, title: string, content: string, authorId: string, author: UserDetails, status: string): AllPostsApiResponse {
        return {
            id,
            title,
            content,
            authorId,
            author,
            status
        };
    }

    static fromPostResponse(postResponse: PostResponseDto): AllPostsApiResponse {
        return AllPostsApiResponse.create(
            postResponse.id as string, postResponse.title, postResponse.content,
            postResponse.authorId,
            postResponse.author, postResponse.status);
    }

}

export { AllPostsApiResponse };
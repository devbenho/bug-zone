import { CreatePostCommandFf } from '@application/posts/commands/create';
import { CommandBus } from '@nestjs/cqrs';
import { ExpressHandler } from '../infrastucture/express-handler';
import { CreatePostRequestDto } from '../dtos/requests';
import { CreatePostResponseDto } from '../dtos/responses';

export class PostController {
  constructor(private commandBus: CommandBus) {}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
  //   const userId = req.user.userId;
  //   return this.postService.createPost(createPostDto, userId);
  // }

  createPost: ExpressHandler<CreatePostRequestDto, CreatePostResponseDto> =
    async (req, res) => {
      const { title, authorId, content } = req.body;

      if (!title || !authorId || !content) {
        return res.json();
      }

      let result = this.commandBus.execute(
        new CreatePostCommandFf(title, content, authorId),
      );

      res.status(201).json({
        success : true,
        
      });
    };
}

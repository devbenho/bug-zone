import {
  GetAllPostsRequest,
} from '@application/posts/queries/get-all/find-all-posts.query';
import {
  RequiredValidationError
} from '@/contracts/exceptions/validation-error/required-validation.error';

// TODO: Validation messages from the json file should be used here
// TODO: Handle the Localizer
// TODO: Create A Custom Exception it's normally used

class FindAllPostsValidator implements IRequestValidator<GetAllPostsRequest> {
  validate(request: GetAllPostsRequest): void {
      throw new RequiredValidationError(request,"");
  }
}

export { FindAllPostsValidator };
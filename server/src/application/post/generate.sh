#! /bin/sh

tsca generate -fn post -un create -p "title:string content:string attachments:uploadedFiles[]" -rt PostDetailsResponseDto &&
	tsca generate -fn post -un edit -p "title:string content:string attachments:uploadedFiles[]" -rt PostDetailsResponseDto &&
	tsca generate -fn post -un delete -p "id:string" -rt bool &&
	tsca generate -fn post -un find-all -p "postId:string pageSize:number pageNumber:number" -rt PostResponseDto &&
	tsca generate -fn post -un find-by-id -p "id:string" -rt PostDetailsResponseDto

# []


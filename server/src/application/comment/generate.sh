#! /bin/sh

tsca generate -fn comment -un create -p "postId:string content:string"  -rt CommentDetailsResponseDto &&
tsca generate -fn comment -un edit -p "content:string"  -rt CommentDetailsResponseDto &&
tsca generate -fn comment -un delete -p "id:string"  -rt bool &&
tsca generate -fn comment -un get-by-post-id -p "postId:string pageSize:number pageNumber:number" -rt CommentResponseDto &&
tsca generate -fn comment -un get-detail -p "id:string" -rt CommentDetailsResponseDto 


# []
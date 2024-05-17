#! /bin/sh
tsca generate -fn comments -un create-comment -p "postId:string content:string"  -rt CommentDetailsResponseDto &&
tsca generate -fn comments -un edit-comment -p "content:string"  -rt CommentDetailsResponseDto &&
tsca generate -fn comments -un delete-comment -p "id:string"  -rt bool &&
tsca generate -fn comments -un get-comment-by-post-id -p "postId:string pageSize:number pageNumber:number" -rt CommentResponseDto &&
tsca generate -fn comments -un get-comment-detail -p "id:string" -rt CommentDetailsResponseDto 
class User
    has_many :posts

    has_many :likes
    has_many :post_likes, through: :likes, class_name: "Post"

    has_many :comments
    has_many :post_comments, through: :comments, class_name: "Post"
end 


class Post
    belongs_to :user

    has_many :likes
    has_many :user_likes, through: :likes, class_name: "User"

    has_many :comments  
    has_many :user_comments, through: :comments, class_name: "User"
 
end

class Like
    belongs_to :user
    belongs_to :post   
end  

class comment
    belongs_to :user
    belongs_to :post   
end


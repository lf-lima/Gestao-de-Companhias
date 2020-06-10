import Post from '../infra/models/post'

interface PostData {
  title: string
  description: string
}

class PostRepository {
  async store (data: PostData) {
    try {
      const postCreated = await Post.create(data)

      const post = await this.findById(postCreated.id)
      return post
    } catch (error) {
      throw new Error(error)
    }
  }

  async findById (postId: number) {
    try {
      const post = await Post.findByPk(postId) as Post
      return post
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new PostRepository()

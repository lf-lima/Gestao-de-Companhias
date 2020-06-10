import postRepository from '../repository/post'
import Post from '../infra/models/post'

interface PostData {
  title: string
  description: string
}

class PostService {
  public async store (userId: number, { title, description }: PostData) {
    try {
      const post = new Post()

      await post.validateTitle(title)
      await post.validateDescription(description)

      if (post.hasError) return post

      const data = {
        title,
        description,
        userId
      }

      const responseRepository = await postRepository.store(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new PostService()

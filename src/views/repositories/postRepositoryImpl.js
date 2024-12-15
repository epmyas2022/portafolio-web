import { PostRepository } from '../../shared/repostories/postRepository'

/**
 * @implements {PostRepository}
 * @classdesc Post repository implementation
 * @class
 */
export class PostRepositoryImpl extends PostRepository {
  constructor(postDataSource) {
    super()
    this.postDataSource = postDataSource
  }
  async getAllPost() {
    return await this.postDataSource.getAllPost()
  }
}

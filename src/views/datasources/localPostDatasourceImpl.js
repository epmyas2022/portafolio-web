import postData from '../../shared/data/posts.json';
/**
 * @implements {PostDataSource}
 * @classdesc Post datasource implementation
 * @class
 */
export class LocalPostDatasource {

  async getAllPost(){ return postData;}
  
}

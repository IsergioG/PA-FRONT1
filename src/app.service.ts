import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationException } from 'src/utils/ValidateExceptions';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ){}
  async create(createPostDto: CreatePostDto) {
    try {
      
      const post = this.postRepository.create(createPostDto)
      if (!post) {
        throw new ValidationException('NOT_SAVED');
      }
      const title= createPostDto.title.toLowerCase()
      const titleCase={
        ...post,
        title
      }
      
      const savePost = await this.postRepository.save(titleCase)
      if (!savePost) {
        throw new ValidationException('NOT_SAVED');
      }
      return { response: true, body: savePost}
    } catch (error) {
      throw new ValidationException(error);
    }
  }

  findAll() {
    return this.postRepository.find();
  }

  findOneById(id: string) {
    return this.postRepository.findOne({where:{postId:id}});
  }

  async update(userId:string,id: string, updatePostDto: UpdatePostDto) {
    try {

      const user = await this.userRepository.findOne({ where: { userId: userId } });
      if(user){
        const post = await this.postRepository.findOne({ where: { postId: id } });
        if (!post) throw new ValidationException('POST_NOT_FOUND')
  
        const editedPost= Object.assign(post, updatePostDto);
        if (!editedPost) throw new ValidationException('POST_NOT_MATCH')
          
        const data = await this.postRepository.save(editedPost)
        if (!data) throw new ValidationException('POST_NOT_FOUND')
  
        return { response: true, body: data };
      }else{
        throw new ValidationException('USER_DONT_HAVE_POST')
      }

    } catch (error) {
      throw new ValidationException(error)
    }
  }

  async softDelete(id: string){
    const del =await  this.postRepository.softDelete(id);
    return{response:true, body:del}
  }
}

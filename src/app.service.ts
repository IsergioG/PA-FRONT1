import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationException } from 'src/utils/ValidateExceptions';
import {CreateWomenDto} from 'src/dto/create-women.dto'
import { UpdateWomenDto } from './dto/update-women.dto';
import { WomenEntity } from './entities/womens.entity';
import { History } from './history/entities/history.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(WomenEntity) private womenRepository: Repository<WomenEntity>,
    @InjectRepository(History) private historyRepository: Repository<History>,
  ){}
  async create(createWomenDto: CreateWomenDto) {
    try {
      const womenRegister = this.womenRepository.create(createWomenDto)
      if (!womenRegister) {
        throw new ValidationException('NOT_SAVED');
      }
      
      const saveResgister= await this.womenRepository.save(womenRegister)
      if (!saveResgister) {
        throw new ValidationException('NOT_SAVED');
      }
      return { response: true, body: saveResgister}
    } catch (error) {
      throw new ValidationException(error);
    }
  }

  async findAll() {
    const findAll= await this.womenRepository.find();
    const state={
      active:findAll.filter((a)=>a.state=="activa"),
      disappeared:findAll.filter((a)=>a.state=="desaparecida"),
      rescued:findAll.filter((a)=>a.state=="rescatada")
    }
    return {all:findAll,state:state}
  }

  findOneById(id: number) {
    return this.womenRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateWomenDto: UpdateWomenDto) {
    try {
        const post = await this.womenRepository.findOne({ where: { id: id } });
        if (!post) throw new ValidationException('POST_NOT_FOUND')
  
        const editedPost= Object.assign(post, updateWomenDto);
        if (!editedPost) throw new ValidationException('POST_NOT_MATCH')

        const womenHistory = this.womenRepository.create(post)
        if (!womenHistory) {
          throw new ValidationException('NOT_SAVED');
        }
        await this.historyRepository.save(womenHistory)

        const data = await this.womenRepository.save(editedPost)
        if (!data) throw new ValidationException('POST_NOT_FOUND')
  
        return { response: true, body: data };

    } catch (error) {
      throw new ValidationException(error)
    }
  }

  async delete(id: number){
    const del =await  this.womenRepository.softDelete(id);
    return{response:true, body:del}
  }
}

import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationException } from 'src/utils/ValidateExceptions';
import { History} from './entities/history.entity';
@Injectable()
export class HistoryService {
    constructor(
      @InjectRepository(History) private historyRepository: Repository<History>,
    ){}
async create(createHistoryDto: CreateHistoryDto) {
    try {
      const his = this.historyRepository.create(createHistoryDto)
      if (!his) {
        throw new ValidationException('NOT_SAVED');
      }
      const saveHis = await this.historyRepository.save(his)
      if (!saveHis) {
        throw new ValidationException('NOT_SAVED');
      }
      return { response: true, body: saveHis}
    } catch (error) {
      throw new ValidationException(error);
    }
  }
  
  findAll() {
    return this.historyRepository.find();
  }

  
}

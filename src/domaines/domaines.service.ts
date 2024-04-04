import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {Prisma} from '@prisma/client'
import { AppService } from 'src/app.service';

@Injectable()
export class DomainesService {
constructor(private readonly databaseService: DatabaseService, private appService : AppService){}



  async create(createDomaineDto: Prisma.DomainesCreateInput) {
    return this.databaseService.domaines.create({data:createDomaineDto});
  }

  findAll() {
    return this.databaseService.domaines.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.domaines.findUnique({
      where : {
        id,
      }
    });
  }

  async update(id: number, updateDomaineDto: Prisma.DomainesUpdateInput) {
    return this.databaseService.domaines.update({
      where : {
        id,
      },
      data : updateDomaineDto
    });
  }

  remove(id: number) {
    return this.databaseService.domaines.delete({
      where : {
        id,
      }
    });
  }
}

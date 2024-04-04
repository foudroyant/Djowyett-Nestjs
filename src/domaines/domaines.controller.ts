import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomainesService } from './domaines.service';
import {Prisma} from '@prisma/client'
import { AppService } from 'src/app.service';

@Controller('domaines')
export class DomainesController {
  constructor(private readonly domainesService: DomainesService, private appService : AppService) {}

  @Post()
  create(@Body() createDomaineDto: Prisma.DomainesCreateInput) {
    return this.domainesService.create(createDomaineDto);
  }

  @Get("/all")
  findAll() {
    return this.domainesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const response = this.domainesService.findOne(+id)
    response.then(res=>{
      this.appService.visiteDomaine(id, res.name, new Date(Date.now()).toISOString())
      console.log("VISITE DU SITE "+res.name+" avec ID : "+id+". CELA S'EST PRODUIT A "+new Date(Date.now()).toISOString())
      console.log(res)
    })
    return this.domainesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomaineDto: Prisma.DomainesUpdateInput) {
    return this.domainesService.update(+id, updateDomaineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainesService.remove(+id);
  }
}

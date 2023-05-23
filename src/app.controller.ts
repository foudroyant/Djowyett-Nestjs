import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getAll().then(res=>{
      return res[res.length - 1]
    });
  }

  @Get(":otp")
  setOTP(@Param('otp') otp: string){
    this.appService.addOTP(otp).then(res=>{
      return res
    })
    return "OTP ajouté"
  }
}

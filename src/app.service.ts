import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private otp=""
  getHello(): string {
    return 'Hello World!';
  }

  getOtp(){
    return this.otp;
  }

  setOpt(otp:string){
    otp=otp;
  }
}

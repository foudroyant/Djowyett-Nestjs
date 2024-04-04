import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PrefAlerteService } from './pref-alerte.service';
import { error } from 'console';

@Controller('pref-alerte')
export class PrefAlerteController {

    constructor(private readonly prefService : PrefAlerteService){}

    @Post("create-checkout-session")
  async create(@Body() requestBody: any) {
    // Vous pouvez traiter les données reçues dans requestBody et effectuer les actions nécessaires ici
    console.log(requestBody);
    const reponse = await this.prefService.init_payement(requestBody["plan"], requestBody["user"])
    return {
        url : reponse.session.url,
    };
  }

  @Post("success")
  async success(@Body() requestBody: any) {
    console.log(requestBody)
    const reponse = await this.prefService.success(requestBody["session"], requestBody["user"], requestBody["plan"])
   
    if(reponse.session){
        console.log(reponse.session)
        return {
            type : "SUCCESS",
            credits : reponse.credits
        }
    }
    else {
        console.log(reponse)
        return {
            type : "ERREUR",
        }
    }
  }

  @Get("cancel")
  cancel() {
  }
}

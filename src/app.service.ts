import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
//import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA8lgGtRSa88KEc1X_0BhHm0Xfeh4eOfg",
  authDomain: "djowyett.firebaseapp.com",
  projectId: "djowyett",
  storageBucket: "djowyett.appspot.com",
  messagingSenderId: "478289729883",
  appId: "1:478289729883:web:5ddcc13846b3074db2627e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


@Injectable()
export class AppService {
   otp="OTP"

  getHello(): string {
    return this.otp;
  }

  async getAll(){
    const data=[]
    const querySnapshot = await getDocs(collection(db, "otp"));
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      data.push({
        id:doc.id, data:doc.data()
      })
    });
    return data;
  }

  async addOTP(otp:string){
      try {
        await setDoc(doc(db, "otp", "otp-1"), {
          otp:otp
        });
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }
}

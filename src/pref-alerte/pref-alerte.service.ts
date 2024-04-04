import { Injectable } from '@nestjs/common';

import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {Stripe} from 'stripe'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA8lgGtRSa88KEc1X_0BhHm0Xfeh4eOfg",
  authDomain: "djowyett.firebaseapp.com",
  projectId: "djowyett",
  storageBucket: "djowyett.appspot.com",
  messagingSenderId: "478289729883",
  appId: "1:478289729883:web:5ddcc13846b3074db2627e",
  databaseURL: "https://djowyett-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const STRIPE_KEY_SECRET = process.env.STRIPE_KEY_SECRET

const stripe = new Stripe(STRIPE_KEY_SECRET);

@Injectable()
export class PrefAlerteService {
    
    async init_payement(plan : number, userID : string){
        try {
            let solde = 0
            let nom_produit = ""
            let description = ""
            if(plan === 1){
                solde =10*100
                nom_produit = "Plan STARTER"
                description = "Recevez des notifications en temps réel sur la disponibilité des créneaux des prefectures pour 25 crédits."
            }
            else if(plan === 2){
                solde = 20*100
                nom_produit = "Plan PRO"
                description = "Recevez des notifications & SMS sur votre telephone en temps réel sur la disponibilité des créneaux des prefectures pour 50 crédits."
            }
            else {
                solde = 45*100
                nom_produit = "Plan PREMIUM"
                description = "Recevez des notifications & SMS sur votre telephone en temps réel sur la disponibilité des créneaux des prefectures pour 100 crédits."
            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types : ["card"],
                line_items : [
                    {
                        price_data : {
                            currency : "eur",
                            product_data : {
                                name : nom_produit,
                                description : description
                            },
                            unit_amount : solde
                        },
                        quantity : 1
                    }
                ],
                mode : "payment",
                success_url : `http://localhost:4200/paid?session={CHECKOUT_SESSION_ID}&user=${userID}&plan=${plan}`,
                cancel_url : "http://localhost:4200/cancel"
            })
            
            return {
                type : "SESSION",
                session
            }
        } catch (error) {
            return {
                type : "ERREUR",
                error
            }
        }
    }

    async success(session_id : string, user : string, plan : string){
        try {
            const session = await stripe.checkout.sessions.retrieve(session_id)

            if(session.payment_status === "paid"){

                let credits = 0
                let _plan = ""
    
                if(plan=== "1"){
                    credits = 25
                    _plan = "STARTER"
                }else if(plan === "2"){
                    credits = 50
                    _plan = "PRO"
                }
                else {
                    credits = 100
                    _plan = "PREMIUM"
                }

                const userRef = doc(db, "users", user)
                const _user = await getDoc(userRef)
                const _credits = _user.data()["credits"]
                
                const _update = await updateDoc(doc(db, "users", user), {
                    credits : Number.parseInt(_credits) + credits,
                    plan : _plan
                })
                console.log(_update)
                return {
                    type : "SESSION",
                    session,
                    credits : Number.parseInt(_credits) + credits
                }
            }else {
                return {
                    type : "NON_TERMINEE"
                }
            }
        } catch (error) {
            return {
                type : "ERREUR",
                error
            }
        }
    }
}

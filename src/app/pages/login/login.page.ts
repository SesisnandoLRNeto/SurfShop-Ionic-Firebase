import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  public wavesPosition: number = 0;
  public wavesDifferent: number = 80;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
    ) { }

  ngOnInit() {  }

  segmentChanged(event: any){
    console.log(event);
    if(event.detail.value === 'login'){
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifferent;
    }else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifferent;
    }
  }

  async login(){
    await this.presentLoading();
    try{
      await this.authService.login(this.userLogin);
    }catch(error){
      console.error(error);
      this.presentToast(error.message);
    }finally{
      this.loading.dismiss();
    }
  }

  async register(){ 
    await this.presentLoading();
    try{
    await this.authService.register(this.userRegister);
    }catch(error){
      let message;
      switch(error.code){
        case 'auth/email-already-in-use':
          message = 'Email ja em uso';
          break;
        case 'auth/invalid-email':
          message = 'Email invalido ';
          break;
      }
      console.error(error);
      this.presentToast(message);
    }finally{
      this.loading.dismiss();
    }
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}

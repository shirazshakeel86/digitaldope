import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
import Moralis from 'moralis';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  user: any;
  constructor(private activatedRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    const serverUrl = 'https://giwvxockoygv.usemoralis.com:2053/server';
    const appId = 'fikxyv0hBpFqjNKJMVDNOU8uqUi2m8jxSuN8aypE';
    // const masterKey = '9TY6MjUokXm9pAiLO8vcvu3W4X5P5mXNO0gNvjAD';

    Moralis.start({ serverUrl, appId });
    console.log('it has been started');
  }

  // metamaskxx() {
  //-->BELOW METHOD IS TO CONNECT MEATAMASK DIRECTLY WITH THE APPLICATION
  //--> AND THIS ONLY WORKS WITH THE WEB PANEL AND DETECTION FOR ANDROID
  // if (window.ethereum) {
  //   console.log('if statement workking');

  //   this.handleEthereum();
  // } else {
  //   window.addEventListener('ethereum#initialized', this.handleEthereum, {
  //     once: true,
  //   });

  //   // If the event is not dispatched by the end of the timeout,
  //   // the user probably doesn't have MetaMask installed.
  //   setTimeout(this.handleEthereum, 3000); // 3 seconds
  // }
  // }
  // handleEthereum() {
  //   const { ethereum } = window;
  //   if (ethereum && ethereum.isMetaMask) {
  //     console.log('Ethereum successfully detected!');
  //     ethereum.request({ method: 'eth_requestAccounts' });
  //     // Access the decentralized web!
  //   } else {
  //     console.log('Please install MetaMask!');
  //   }
  // }

  async login() {
    console.log('loginworking');

    this.user = Moralis.User.current();
    // if (this.user == 'walletconnect') {
    //   this.user = await Moralis.authenticate({ provider: this.user });
    // } else {
    //   this.user = await Moralis.authenticate();
    // }

    if (!this.user) {
      
      Moralis.authenticate({
        provider: 'walletconnect',
        mobileLinks: [
          'rainbow',
          'metamask',
          'argent',
          'trust',
          'imtoken',
          'pillar',
        ],
      })
        .then(function (user) {
          console.log('logged in user:', user);
          console.log(user.get('ethAddress'));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  async logout() {
    await Moralis.User.logOut();
    console.log('logged out');
  }
}

import {contacts} from './users.js';

const { DateTime } = luxon;

const { createApp } = Vue;

createApp({

  data(){
    return{
      contacts,
      activeChat: {},
      userMessage: '',
      chatSearch: '',
      replies: [
        'Wow!',
        'Fantastico!',
        'Che spettacolo!',
        'Meraviglioso!',
        'Incredibile!',
        'Che sorpresa!',
        'Eccezionale!',
        'Straordinario!',
        'Stupendo!',
        'Bellissimo!',
      ],
    }
  },

  methods: {

    getLastMessage(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage ? lastMessage.message : '';
    },

    getLastDate(contact){
      const lastDate = contact.messages[contact.messages.length - 1];
      return lastDate ? lastDate.date : '';
    },


    sendMessage(userMessage){
      const newMsg = {
        date: DateTime.now()
        .setLocale('it')
        .toFormat('F') ,
        message: userMessage,
        status: 'sent'
      };

      this.activeChat.messages.push(newMsg);
      this.autoScroll();
      this.userMessage = '';
      

      setTimeout(this.replyMessage, 1000);
    
      },

    replyMessage(){
      const newResponse = {
        date: DateTime.now()
        .setLocale('it')
        .toFormat('F') ,
        message: `${this.randomReply()}`,
        status: 'received'
      };

      this.activeChat.messages.push(newResponse);
      this.autoScroll();
    },

    eraseMsg(index) {
      this.activeChat.messages.splice(index, 1)
    },

    optMenu(index){
      const opt = document.querySelectorAll('.opt-chat');

      opt[index].classList.toggle('hide')
    },

    randomReply() {
      const randomNumber = Math.floor(Math.random() * this.replies.length);
      return this.replies[randomNumber];
    },

    autoScroll() {
      const msgBox = document.querySelector('.message-box')
      msgBox.scrollTop = msgBox.scrollHeight;
    },


  },

  computed: {

    visibleContacts() {
      this.contacts.forEach(contact => {
        if (contact.name.toLowerCase().includes(this.chatSearch.toLowerCase())) {
          contact.visible = true
        } else {
          contact.visible = false
        }
      });
      return this.contacts
    }

  },



  created(){
  this.activeChat = this.contacts[0];
  },



}).mount('#app')


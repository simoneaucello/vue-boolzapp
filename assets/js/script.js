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
      this.userMessage = '';

      setTimeout(this.respMessage, 1000);
    
      },

    respMessage(){
      const newResponse = {
        date: DateTime.now()
        .setLocale('it')
        .toFormat('F') ,
        message: 'Va bene!',
        status: 'received'
      };

      this.activeChat.messages.push(newResponse);
    }


  },

  computed: {

    // per sistema di ricerca
    visibleContacts(){
      return this.contacts.filter(contact => contact.visible)
    },

    searchContact(){
      return this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(this.chatSearch.toLowerCase()));
    }
  },



  created(){
  this.activeChat = this.contacts[0];
  },



}).mount('#app')
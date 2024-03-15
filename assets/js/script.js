import {contacts} from './users.js'

const { createApp } = Vue;

createApp({

  data(){
    return{
      contacts,
      activeChat: {},
      userMessage: ''
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
        date: 'todo',
        message: userMessage,
        status: 'sent'
      };

      this.activeChat.messages.push(newMsg);
      this.userMessage = '';

      setTimeout(this.respMessage, 1000);
    
      },

    respMessage(){
      const newResponse = {
        date: 'todo',
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
    }
  },



  created(){
  this.activeChat = this.contacts[0];
  }

}).mount('#app')
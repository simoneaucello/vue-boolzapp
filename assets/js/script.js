import {contacts} from './users.js'

const { createApp } = Vue;

createApp({

  data(){
    return{
      contacts,
      activeChat: 0
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
    }

  },



  mounted(){

  }

}).mount('#app')
<template>
    <div class='col-lg-12 space-outside-up-sm'>
        <div>
            <h2>Verstuur nieuwsbrief</h2>
            <p class="space-inside-sm text-color-accent">
                Vul hieronder de velden in, en klik op: verstuur.
            </p>

            <div class="col-lg-12 space-inside-xs ">
				<div class="row ">
					<div class="col-lg-12 reset-padding">
                        <!-- The input -->
                        <input 
                            @click="openOverlay()"
                            placeholder="Versturen naar.."
                            v-model="recipients"
                            type="text"
                            class="
                                border border-secondary border-curved outline-none
                                space-inside-sides-md space-inside-sm 
                                inline-block 
                                full-width
                                bg-secondary
                                pointer
                                " 
                        required>
                    </div>
                </div>
            </div>

            <div class="col-lg-12 space-inside-xs ">
				<div class="row ">
					<div class="col-lg-12 reset-padding">
                        <!-- The input -->
                        <input 
                            placeholder="Onderwerp"
                            v-model="subject"
                            type="text"
                            class="
                                border border-secondary border-curved outline-none
                                space-inside-sides-md space-inside-sm 
                                inline-block 
                                full-width
                                bg-secondary
                                " 
                        required>
                    </div>
                </div>
            </div>

            <div class="col-lg-12 space-inside-xs ">
				<div class="row ">
					<div class="col-lg-12 reset-padding">
                        <!-- The input -->
                        <textarea 
                            placeholder="Inhoud"
                            v-model="content"
                            type="text"
                            class="
                                border border-secondary border-curved outline-none
                                space-inside-sides-md space-inside-sm 
                                inline-block 
                                full-width
                                bg-secondary
                                " 
                            style="height: 150px; width: 100%; resize: none;"
                        required></textarea>
                    </div>
                </div>
            </div>

            <!-- Button for sending the email -->
			<div class="row space-inside-sides-xs">
				<div class="col-lg-12 space-inside-sides-sm space-inside-up-sm">
					<button  @click="send()" class="border-none outline-none bg-main shadow-xs text-color-light space-inside-sm space-inside-sides-md">Versturen</button>
				</div>
			</div>

            <overlay>
                <div class="col-lg-12 reset-padding">
						
                    <h1 class="text-color-dark text-left text-uppercase letter-spacing-sm text-bold">Selecteer personen</h1>
                    

                    <!-- Select users to send mail to. -->
                    <div class="row space-inside-md ">	
                        <h2>Selecteer users</h2>
                        <div class="col-lg-2 space-inside-sides-xs space-inside-sm pointer" v-for="user in users">
                            <div class="bg-secondary border-curved" @click="toggleUser(user)">
                                <p class="space-inside-down-sm space-inside-left-sm">
                                    <i style="position: relative; top: 7px;" class="material-icons space-inside-sides-xs">person_add</i> {{ user.name }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Selected users to send mail to. -->
                    <div class="row space-inside-md ">	
                        <h2>Geselecteerde users</h2>
                        <div class="col-lg-2 space-inside-sides-xs space-inside-sm pointer" v-for="user in recipients">
                            <div class="bg-secondary border-curved" @click="toggleUser(user)">
                                <p class="space-inside-down-sm space-inside-left-sm">
                                    <i style="position: relative; top: 7px;" class="material-icons space-inside-sides-xs">person</i> {{ user.name }}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </overlay>
        </div>
    </div>
</template>
<script>
    import Mail from '../models/Mail';

   export default {
       props: {

       },

       data() {
           return {
               recipients: [],
               subject: null,
               content: null,
               referenceUsers: null,
               users: [],
           }
       },

       mounted() {
           Factory.getStaticInstance('user').all().then((data) => {
               this.users = data;
               this.referenceUsers = data;
           });
       },

       methods: {
          toggleUser(user) {

            //  Find index of user in recipients
            let index = _.findIndex(this.recipients, {
                'id': user.id
            });

            //  Find index of user in users 
            let indexUser = _.findIndex(this.users, {
                'id': user.id
            });

            // If user not in recipients, splice from user array and push on recipients array
            if(index === -1) {
                this.users.splice(indexUser, 1);
                this.recipients.push(user);
            }

            // if user not in user array, splice from recipients and push on user array
            if(indexUser === -1) {
                this.recipients.splice(index, 1);
                this.users.push(user);
            }
          },

          openOverlay() {
              Event.fire('overlay:open');
          }
       }
   }   
</script>